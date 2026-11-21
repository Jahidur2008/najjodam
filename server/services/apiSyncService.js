const axios = require('axios');
const ApiConfig = require('../models/ApiConfig');
const Product = require('../models/Product');
const MarketPrice = require('../models/MarketPrice');
const { bdLocations, findLocation } = require('../data/bdLocations');

/**
 * Normalizes text for lenient matching (removes parentheses, accents, whitespace)
 */
function normalizeStr(str) {
  if (!str) return '';
  return str
    .toString()
    .toLowerCase()
    .replace(/[()_.\-–—]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Resolves a dot-notated property from an object (e.g. "prices.wholesale.min")
 */
function getByPath(obj, pathStr) {
  if (!obj || !pathStr) return undefined;
  if (obj[pathStr] !== undefined) return obj[pathStr];
  return pathStr.split('.').reduce((acc, part) => (acc ? acc[part] : undefined), obj);
}

/**
 * Synchronize market prices from a single ApiConfig instance
 * @param {string|ObjectId} configId
 */
async function syncSingleConfig(configId) {
  const config = await ApiConfig.findById(configId);
  if (!config) {
    throw new Error(`ApiConfig not found for ID: ${configId}`);
  }

  console.log(`[Sync Engine] Starting sync for provider: "${config.providerName}" (${config.apiUrl})`);
  config.lastSyncStatus = 'RUNNING';
  await config.save();

  const stats = {
    provider: config.providerName,
    totalFetched: 0,
    insertedCount: 0,
    updatedCount: 0,
    skippedManualOverrides: 0,
    unmatchedProducts: 0,
    errors: []
  };

  try {
    // 1. Prepare Request Headers & Authentication
    const headers = {
      'User-Agent': 'NajjoDam-PriceAggregator/1.0',
      'Accept': 'application/json',
      ...(config.headers || {})
    };

    if (config.apiKey) {
      headers['Authorization'] = `Bearer ${config.apiKey}`;
      headers['x-api-key'] = config.apiKey;
    }

    // 2. Fetch external API payload
    const response = await axios.get(config.apiUrl, {
      headers,
      timeout: 25000 // 25s timeout
    });

    let rawItems = [];
    if (Array.isArray(response.data)) {
      rawItems = response.data;
    } else if (response.data && Array.isArray(response.data.data)) {
      rawItems = response.data.data;
    } else if (response.data && Array.isArray(response.data.items)) {
      rawItems = response.data.items;
    } else if (response.data && Array.isArray(response.data.results)) {
      rawItems = response.data.results;
    } else {
      throw new Error('Unrecognized external API response format. Expected JSON array or object with data/items/results list.');
    }

    stats.totalFetched = rawItems.length;
    console.log(`[Sync Engine] Fetched ${rawItems.length} items from ${config.providerName}`);

    // 3. Preload all active products in memory for rapid O(1) matching
    const allProducts = await Product.find({ isActive: true });
    const productLookup = [];
    for (const p of allProducts) {
      productLookup.push({
        doc: p,
        normEn: normalizeStr(p.name_en),
        normBn: normalizeStr(p.name_bn),
        subBn: normalizeStr(p.subCategory_bn)
      });
    }

    // 4. Extract field mapping definitions
    const mapping = config.fieldMapping || {};
    const pNameKey = mapping.productNameKey || 'productName';
    const divKey = mapping.divisionKey || 'division';
    const distKey = mapping.districtKey || 'district';
    const upzKey = mapping.upazilaKey || 'upazila';
    const wMinKey = mapping.wholesaleMinKey || 'wholesaleMin';
    const wMaxKey = mapping.wholesaleMaxKey || 'wholesaleMax';
    const rMinKey = mapping.retailMinKey || 'retailMin';
    const rMaxKey = mapping.retailMaxKey || 'retailMax';

    // 5. Process and Upsert each item
    for (const item of rawItems) {
      const rawProdName = getByPath(item, pNameKey);
      if (!rawProdName) continue;

      const normSearch = normalizeStr(rawProdName);

      // Match product
      const matched = productLookup.find(
        p =>
          p.normEn === normSearch ||
          p.normBn === normSearch ||
          normSearch.includes(p.normEn) ||
          p.normEn.includes(normSearch) ||
          (p.normBn && normSearch.includes(p.normBn))
      );

      if (!matched) {
        stats.unmatchedProducts++;
        continue;
      }

      // Match Location
      const rawDiv = getByPath(item, divKey) || 'Dhaka';
      const rawDist = getByPath(item, distKey) || 'Dhaka';
      const rawUpz = getByPath(item, upzKey) || '';

      const locationDetails = findLocation(rawDiv, rawDist, rawUpz) || {
        division_bn: 'ঢাকা',
        division_en: 'Dhaka',
        district_bn: 'ঢাকা',
        district_en: 'Dhaka',
        upazila_bn: '',
        upazila_en: ''
      };

      // Extract Prices
      const wholesaleMin = Number(getByPath(item, wMinKey)) || 0;
      const wholesaleMax = Number(getByPath(item, wMaxKey)) || wholesaleMin;
      const retailMin = Number(getByPath(item, rMinKey)) || wholesaleMin;
      const retailMax = Number(getByPath(item, rMaxKey)) || Math.max(retailMin, wholesaleMax);

      if (wholesaleMin <= 0 && retailMin <= 0) continue;

      // Check existing record
      const query = {
        product: matched.doc._id,
        division_en: locationDetails.division_en,
        district_en: locationDetails.district_en,
        upazila_en: locationDetails.upazila_en || ''
      };

      const existingRecord = await MarketPrice.findOne(query);

      if (existingRecord) {
        // ========================================================
        // CRITICAL RULE: If isManualOverride is true, DO NOT OVERWRITE
        // ========================================================
        if (existingRecord.isManualOverride === true) {
          stats.skippedManualOverrides++;
          continue;
        }

        // Store old wholesale average for dynamic trend calculation
        const oldAvg =
          (existingRecord.wholesale_price_min + existingRecord.wholesale_price_max) / 2;
        existingRecord.previous_wholesale_avg = oldAvg;

        existingRecord.wholesale_price_min = wholesaleMin;
        existingRecord.wholesale_price_max = wholesaleMax;
        existingRecord.retail_price_min = retailMin;
        existingRecord.retail_price_max = retailMax;
        existingRecord.source = 'EXTERNAL_API';
        existingRecord.updatedAt = new Date();

        await existingRecord.save();
        stats.updatedCount++;
      } else {
        // New record insert
        const newRecord = new MarketPrice({
          product: matched.doc._id,
          division_bn: locationDetails.division_bn,
          division_en: locationDetails.division_en,
          district_bn: locationDetails.district_bn,
          district_en: locationDetails.district_en,
          upazila_bn: locationDetails.upazila_bn || '',
          upazila_en: locationDetails.upazila_en || '',
          wholesale_price_min: wholesaleMin,
          wholesale_price_max: wholesaleMax,
          retail_price_min: retailMin,
          retail_price_max: retailMax,
          previous_wholesale_avg: (wholesaleMin + wholesaleMax) / 2,
          source: 'EXTERNAL_API',
          isManualOverride: false,
          updatedAt: new Date()
        });

        await newRecord.save();
        stats.insertedCount++;
      }
    }

    config.lastSyncAt = new Date();
    config.lastSyncStatus = 'SUCCESS';
    await config.save();

    console.log(
      `[Sync Engine] Finished for ${config.providerName}: Inserted=${stats.insertedCount}, Updated=${stats.updatedCount}, SkippedOverrides=${stats.skippedManualOverrides}`
    );

    return {
      success: true,
      data: stats
    };
  } catch (error) {
    console.error(`[Sync Engine Error for ${config.providerName}]:`, error.message);
    config.lastSyncAt = new Date();
    config.lastSyncStatus = 'FAILED';
    await config.save();

    return {
      success: false,
      error: error.message,
      data: stats
    };
  }
}

/**
 * Synchronize all active ApiConfig records
 */
async function syncAllActiveConfigs() {
  const activeConfigs = await ApiConfig.find({ isActive: true });
  console.log(`[Sync Engine] Running sync for ${activeConfigs.length} active provider(s)...`);

  const results = [];
  for (const config of activeConfigs) {
    const res = await syncSingleConfig(config._id);
    results.push(res);
  }

  return {
    success: true,
    totalConfigs: activeConfigs.length,
    results
  };
}

module.exports = {
  syncSingleConfig,
  syncAllActiveConfigs
};
