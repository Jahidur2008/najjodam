const Product = require('../models/Product');
const MarketPrice = require('../models/MarketPrice');
const Notice = require('../models/Notice');
const SiteSetting = require('../models/SiteSetting');
const {
  bdLocations,
  DEFAULT_LOCATION,
  getAllDivisions,
  getDistrictsByDivision,
  getUpazilasByDistrict,
  findLocation
} = require('../data/bdLocations');

// @desc    Get all administrative locations (8 Divisions, 64 Districts, 495 Upazilas)
// @route   GET /api/public/locations
// @access  Public
const getPublicLocations = (req, res) => {
  res.json({
    success: true,
    data: {
      defaultLocation: DEFAULT_LOCATION,
      totalDivisions: bdLocations.length,
      divisions: bdLocations
    }
  });
};

// @desc    Get all 9 agricultural categories with product counts
// @route   GET /api/public/categories
// @access  Public
const getPublicCategories = async (req, res, next) => {
  try {
    const categories = await Product.aggregate([
      { $match: { isActive: true } },
      {
        $group: {
          _id: {
            category_bn: '$category_bn',
            category_en: '$category_en'
          },
          productCount: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          category_bn: '$_id.category_bn',
          category_en: '$_id.category_en',
          productCount: 1
        }
      },
      { $sort: { category_en: 1 } }
    ]);

    res.json({
      success: true,
      count: categories.length,
      data: categories
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get active farmer notice ticker messages
// @route   GET /api/public/notices
// @access  Public
const getPublicNotices = async (req, res, next) => {
  try {
    const notices = await Notice.find({ isActive: true })
      .sort({ priority: 1, updatedAt: -1 })
      .select('text_bn priority updatedAt');

    res.json({
      success: true,
      count: notices.length,
      data: notices
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get real-time market prices with Smart Upazila -> District Fallback
// @route   GET /api/public/prices
// @access  Public
const getPublicPrices = async (req, res, next) => {
  try {
    const {
      division = 'Dhaka',
      district = 'Dhaka',
      upazila = '',
      category,
      search
    } = req.query;

    const requestedDivision = division.trim();
    const requestedDistrict = district.trim();
    const requestedUpazila = upazila.trim();

    // 1. Build product search filter
    const productFilter = { isActive: true };

    if (category && category.trim()) {
      productFilter.$or = [
        { category_en: new RegExp(`^${category.trim()}$`, 'i') },
        { category_bn: category.trim() }
      ];
    }

    if (search && search.trim()) {
      const searchRegex = new RegExp(search.trim(), 'i');
      productFilter.$or = [
        { name_bn: searchRegex },
        { name_en: searchRegex },
        { subCategory_bn: searchRegex }
      ];
    }

    const matchingProducts = await Product.find(productFilter);
    const productIds = matchingProducts.map(p => p._id);

    if (productIds.length === 0) {
      return res.json({
        success: true,
        location: {
          division: requestedDivision,
          district: requestedDistrict,
          upazila: requestedUpazila
        },
        count: 0,
        data: []
      });
    }

    // 2. Query market prices for requested district
    const query = {
      product: { $in: productIds },
      district_en: new RegExp(`^${requestedDistrict}$`, 'i')
    };

    const districtPrices = await MarketPrice.find(query)
      .populate('product')
      .lean();

    // Also fetch Dhaka baseline as the ultimate safety net if district has zero records
    let dhakaBaselinePrices = [];
    if (requestedDistrict.toLowerCase() !== 'dhaka') {
      dhakaBaselinePrices = await MarketPrice.find({
        product: { $in: productIds },
        district_en: new RegExp('^Dhaka$', 'i'),
        upazila_en: ''
      })
        .populate('product')
        .lean();
    }

    const dhakaPriceMap = new Map();
    for (const p of dhakaBaselinePrices) {
      if (p.product?._id) {
        dhakaPriceMap.set(p.product._id.toString(), p);
      }
    }

    // Separate upazila-exact prices and district baseline prices
    const upazilaExactMap = new Map();
    const districtBaselineMap = new Map();

    for (const item of districtPrices) {
      if (!item.product) continue;
      const pId = item.product._id.toString();

      if (
        requestedUpazila &&
        item.upazila_en &&
        item.upazila_en.toLowerCase() === requestedUpazila.toLowerCase()
      ) {
        upazilaExactMap.set(pId, item);
      } else if (!item.upazila_en || item.upazila_en.trim() === '') {
        districtBaselineMap.set(pId, item);
      }
    }

    // 3. Assemble results using Smart Fallback Logic
    const results = [];

    for (const prod of matchingProducts) {
      const pId = prod._id.toString();
      let chosenPrice = null;
      let priceLevel = 'DISTRICT_BASELINE';

      if (requestedUpazila) {
        if (upazilaExactMap.has(pId)) {
          chosenPrice = upazilaExactMap.get(pId);
          priceLevel = 'UPAZILA_EXACT';
        } else if (districtBaselineMap.has(pId)) {
          chosenPrice = districtBaselineMap.get(pId);
          priceLevel = 'DISTRICT_FALLBACK';
        } else if (dhakaPriceMap.has(pId)) {
          chosenPrice = dhakaPriceMap.get(pId);
          priceLevel = 'DHAKA_BASELINE_FALLBACK';
        }
      } else {
        if (districtBaselineMap.has(pId)) {
          chosenPrice = districtBaselineMap.get(pId);
          priceLevel = 'DISTRICT_BASELINE';
        } else if (dhakaPriceMap.has(pId)) {
          chosenPrice = dhakaPriceMap.get(pId);
          priceLevel = 'DHAKA_BASELINE_FALLBACK';
        }
      }

      if (chosenPrice) {
        // Calculate averages & per-maund prices
        const wholesale_min = chosenPrice.wholesale_price_min;
        const wholesale_max = chosenPrice.wholesale_price_max;
        const retail_min = chosenPrice.retail_price_min;
        const retail_max = chosenPrice.retail_price_max;
        const wholesale_avg = (wholesale_min + wholesale_max) / 2;
        const retail_avg = (retail_min + retail_max) / 2;

        // Calculate price trend
        let price_trend = 'STABLE';
        const prevAvg = chosenPrice.previous_wholesale_avg;
        if (prevAvg && prevAvg > 0) {
          const diff = wholesale_avg - prevAvg;
          const pct = (diff / prevAvg) * 100;
          if (pct > 1.0) price_trend = 'UP';
          else if (pct < -1.0) price_trend = 'DOWN';
        }

        const maundMult = prod.maundMultiplier || 0;
        const per_maund =
          maundMult > 0
            ? {
                wholesale_maund_min: wholesale_min * maundMult,
                wholesale_maund_max: wholesale_max * maundMult,
                wholesale_maund_avg: wholesale_avg * maundMult
              }
            : null;

        results.push({
          _id: chosenPrice._id,
          product: {
            _id: prod._id,
            name_bn: prod.name_bn,
            name_en: prod.name_en,
            category_bn: prod.category_bn,
            category_en: prod.category_en,
            subCategory_bn: prod.subCategory_bn,
            unit_bn: prod.unit_bn,
            maundMultiplier: prod.maundMultiplier,
            image_url: prod.image_url
          },
          division_bn: chosenPrice.division_bn,
          division_en: chosenPrice.division_en,
          district_bn: chosenPrice.district_bn,
          district_en: chosenPrice.district_en,
          upazila_bn: chosenPrice.upazila_bn || '',
          upazila_en: chosenPrice.upazila_en || '',
          priceLevel,
          wholesale_price_min: wholesale_min,
          wholesale_price_max: wholesale_max,
          wholesale_avg,
          retail_price_min: retail_min,
          retail_price_max: retail_max,
          retail_avg,
          previous_wholesale_avg: prevAvg,
          price_trend,
          per_maund,
          source: chosenPrice.source,
          isManualOverride: chosenPrice.isManualOverride,
          updatedAt: chosenPrice.updatedAt
        });
      }
    }

    // Resolve location labels in Bengali & English
    const locMeta = findLocation(requestedDivision, requestedDistrict, requestedUpazila);

    res.json({
      success: true,
      location: {
        division_bn: locMeta ? locMeta.division_bn : 'ঢাকা',
        division_en: requestedDivision,
        district_bn: locMeta ? locMeta.district_bn : 'ঢাকা',
        district_en: requestedDistrict,
        upazila_bn: locMeta ? locMeta.upazila_bn : '',
        upazila_en: requestedUpazila,
        isUpazilaFiltered: Boolean(requestedUpazila)
      },
      count: results.length,
      data: results
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get prices of a specific product across Bangladesh for comparison modal & chart
// @route   GET /api/public/prices/compare/:productId
// @access  Public
const compareProductPrices = async (req, res, next) => {
  try {
    const { productId } = req.params;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    const priceRecords = await MarketPrice.find({ product: productId })
      .sort({ division_en: 1, district_en: 1, upazila_en: 1 })
      .lean();

    if (priceRecords.length === 0) {
      return res.json({
        success: true,
        product,
        count: 0,
        summary: null,
        data: []
      });
    }

    let lowestWholesale = Infinity;
    let highestWholesale = -Infinity;
    let lowestDistrict = '';
    let highestDistrict = '';
    let totalWholesale = 0;
    let totalRetail = 0;

    const formattedList = priceRecords.map(p => {
      const wholesale_avg = (p.wholesale_price_min + p.wholesale_price_max) / 2;
      const retail_avg = (p.retail_price_min + p.retail_price_max) / 2;

      totalWholesale += wholesale_avg;
      totalRetail += retail_avg;

      if (wholesale_avg < lowestWholesale) {
        lowestWholesale = wholesale_avg;
        lowestDistrict = `${p.district_bn} (${p.district_en})`;
      }
      if (wholesale_avg > highestWholesale) {
        highestWholesale = wholesale_avg;
        highestDistrict = `${p.district_bn} (${p.district_en})`;
      }

      const maundMult = product.maundMultiplier || 0;

      return {
        _id: p._id,
        division_bn: p.division_bn,
        division_en: p.division_en,
        district_bn: p.district_bn,
        district_en: p.district_en,
        upazila_bn: p.upazila_bn || 'জেলা সদর',
        upazila_en: p.upazila_en || 'District Sadar',
        wholesale_price_min: p.wholesale_price_min,
        wholesale_price_max: p.wholesale_price_max,
        wholesale_avg,
        retail_price_min: p.retail_price_min,
        retail_price_max: p.retail_price_max,
        retail_avg,
        per_maund_wholesale_avg: maundMult > 0 ? wholesale_avg * maundMult : null,
        source: p.source,
        isManualOverride: p.isManualOverride,
        updatedAt: p.updatedAt
      };
    });

    const summary = {
      totalLocations: priceRecords.length,
      nationalAverageWholesale: Math.round((totalWholesale / priceRecords.length) * 10) / 10,
      nationalAverageRetail: Math.round((totalRetail / priceRecords.length) * 10) / 10,
      cheapestDistrict: lowestDistrict,
      cheapestWholesalePrice: lowestWholesale === Infinity ? 0 : lowestWholesale,
      highestDistrict: highestDistrict,
      highestWholesalePrice: highestWholesale === -Infinity ? 0 : highestWholesale
    };

    res.json({
      success: true,
      product: {
        _id: product._id,
        name_bn: product.name_bn,
        name_en: product.name_en,
        category_bn: product.category_bn,
        unit_bn: product.unit_bn,
        maundMultiplier: product.maundMultiplier,
        image_url: product.image_url
      },
      count: formattedList.length,
      summary,
      data: formattedList
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get website branding & public settings (Logo, Favicon, Registration state)
// @route   GET /api/public/site-settings
// @access  Public
const getPublicSiteSettings = async (req, res, next) => {
  try {
    const settings = await SiteSetting.getSettings();
    res.json({
      success: true,
      data: {
        logoUrl: settings.logoUrl || '/images/najjo-dam-logo.svg',
        faviconUrl: settings.faviconUrl || '/images/najjo-dam-favicon.svg',
        isAdminRegistrationOpen: Boolean(settings.isAdminRegistrationOpen),
        updatedAt: settings.updatedAt
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPublicLocations,
  getPublicCategories,
  getPublicNotices,
  getPublicPrices,
  compareProductPrices,
  getPublicSiteSettings
};
