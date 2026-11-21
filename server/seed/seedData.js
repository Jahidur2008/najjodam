/**
 * Database Seed Script for "ন্যায্য দাম" (Najjo Dam)
 * Populates:
 * 1. Default Administrator (admin@najjodam.com / Admin@1234)
 * 2. Complete Master Agricultural Products (168 products across 9 categories)
 * 3. Default Dhaka District Baseline Market Prices for ALL products
 * 4. Sample Regional & Upazila Prices (Kushtia, Bogura, Dinajpur, Chattogram, etc.)
 * 5. External API Configuration Template
 * 6. Urgent Farmer Notice Ticker items
 */

require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const mongoose = require('mongoose');
const Admin = require('../models/Admin');
const Product = require('../models/Product');
const MarketPrice = require('../models/MarketPrice');
const ApiConfig = require('../models/ApiConfig');
const Notice = require('../models/Notice');
const SiteSetting = require('../models/SiteSetting');
const masterProducts = require('./masterProducts');
const { bdLocations, findLocation } = require('../data/bdLocations');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/najjodam';

async function seedDatabase() {
  console.log('====================================================');
  console.log('   ন্যায্য দাম (Najjo Dam) - Database Seeding Script');
  console.log('====================================================');
  console.log(`Connecting to MongoDB at: ${MONGODB_URI}`);

  try {
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000
    });
    console.log(' MongoDB connected successfully.\n');

    // 1. Clear existing collections for a clean idempotent seed
    console.log('Clearing existing data...');
    await Promise.all([
      Admin.deleteMany({}),
      SiteSetting.deleteMany({}),
      Product.deleteMany({}),
      MarketPrice.deleteMany({}),
      ApiConfig.deleteMany({}),
      Notice.deleteMany({})
    ]);
    console.log(' Collections cleared.\n');

    // 2. Admin Collection is initialized to 0 (First registrant becomes MASTER_ADMIN)
    console.log('1. Admin collection reset to 0. (The first registrant on /admin/register will become MASTER_ADMIN)');
    await SiteSetting.create({ isAdminRegistrationOpen: false });
    console.log(' SiteSetting initialized: isAdminRegistrationOpen = false\n');

    // 3. Seed Master Agricultural Products
    console.log('2. Seeding Master Agricultural Products (9 Categories)...');
    const productDocs = await Product.insertMany(
      masterProducts.map(p => ({
        name_bn: p.name_bn,
        name_en: p.name_en,
        category_bn: p.category_bn,
        category_en: p.category_en,
        subCategory_bn: p.subCategory_bn,
        unit_bn: p.unit_bn,
        maundMultiplier: p.maundMultiplier,
        image_url: p.image_url,
        isActive: true
      }))
    );
    console.log(` Seeded ${productDocs.length} Master Products successfully.\n`);

    // Map inserted products by English name for easy price reference
    const productMap = new Map();
    productDocs.forEach(doc => {
      productMap.set(doc.name_en, doc);
    });

    // 4. Seed Market Prices
    console.log('3. Seeding Market Prices...');
    const marketPriceRecords = [];

    // 4a. Seed Dhaka District Baseline for ALL 168 Products
    for (const rawProd of masterProducts) {
      const prodDoc = productMap.get(rawProd.name_en);
      if (!prodDoc) continue;

      const base = rawProd.defaultPrices;
      marketPriceRecords.push({
        product: prodDoc._id,
        division_bn: 'ঢাকা',
        division_en: 'Dhaka',
        district_bn: 'ঢাকা',
        district_en: 'Dhaka',
        upazila_bn: '',
        upazila_en: '',
        wholesale_price_min: base.wholesale_min,
        wholesale_price_max: base.wholesale_max,
        retail_price_min: base.retail_min,
        retail_price_max: base.retail_max,
        previous_wholesale_avg: base.prev_avg,
        source: 'MANUAL_ADMIN',
        isManualOverride: false,
        updatedAt: new Date()
      });
    }
    console.log(` -> Added ${masterProducts.length} default Dhaka District baseline prices.`);

    // 4b. Seed Sample Prices for Dhaka Upazilas (Savar, Keraniganj, Dhamrai)
    const dhakaUpazilas = [
      { upazila_bn: 'সাভার', upazila_en: 'Savar', factor: 0.96 },
      { upazila_bn: 'কেরানীগঞ্জ', upazila_en: 'Keraniganj', factor: 0.98 },
      { upazila_bn: 'ধামরাই', upazila_en: 'Dhamrai', factor: 0.94 }
    ];

    for (const upz of dhakaUpazilas) {
      for (const rawProd of masterProducts.slice(0, 35)) { // Top 35 products
        const prodDoc = productMap.get(rawProd.name_en);
        const base = rawProd.defaultPrices;
        const wMin = Math.round(base.wholesale_min * upz.factor);
        const wMax = Math.round(base.wholesale_max * upz.factor);
        const rMin = Math.round(base.retail_min * upz.factor);
        const rMax = Math.round(base.retail_max * upz.factor);
        const prevAvg = Math.round(base.prev_avg * upz.factor * 0.98);

        marketPriceRecords.push({
          product: prodDoc._id,
          division_bn: 'ঢাকা',
          division_en: 'Dhaka',
          district_bn: 'ঢাকা',
          district_en: 'Dhaka',
          upazila_bn: upz.upazila_bn,
          upazila_en: upz.upazila_en,
          wholesale_price_min: wMin,
          wholesale_price_max: wMax,
          retail_price_min: rMin,
          retail_price_max: rMax,
          previous_wholesale_avg: prevAvg,
          source: 'MANUAL_ADMIN',
          isManualOverride: false,
          updatedAt: new Date()
        });
      }
    }

    // 4c. Seed Sample Prices for Khulna -> Kushtia -> Kushtia Sadar & Mirpur
    const kushtiaLocations = [
      { upazila_bn: '', upazila_en: '', factor: 0.92 }, // District baseline
      { upazila_bn: 'কুষ্টিয়া সদর', upazila_en: 'Kushtia Sadar', factor: 0.93 },
      { upazila_bn: 'মিরপুর', upazila_en: 'Mirpur', factor: 0.89 }
    ];

    for (const loc of kushtiaLocations) {
      for (const rawProd of masterProducts.slice(0, 50)) {
        const prodDoc = productMap.get(rawProd.name_en);
        const base = rawProd.defaultPrices;
        const wMin = Math.round(base.wholesale_min * loc.factor);
        const wMax = Math.round(base.wholesale_max * loc.factor);
        const rMin = Math.round(base.retail_min * loc.factor);
        const rMax = Math.round(base.retail_max * loc.factor);
        const prevAvg = Math.round(base.prev_avg * loc.factor * (Math.random() > 0.5 ? 1.03 : 0.97));

        marketPriceRecords.push({
          product: prodDoc._id,
          division_bn: 'খুলনা',
          division_en: 'Khulna',
          district_bn: 'কুষ্টিয়া',
          district_en: 'Kushtia',
          upazila_bn: loc.upazila_bn,
          upazila_en: loc.upazila_en,
          wholesale_price_min: wMin,
          wholesale_price_max: wMax,
          retail_price_min: rMin,
          retail_price_max: rMax,
          previous_wholesale_avg: prevAvg,
          source: 'MANUAL_ADMIN',
          isManualOverride: false,
          updatedAt: new Date()
        });
      }
    }

    // 4d. Seed Sample Prices for Rajshahi -> Bogura (Vegetable Hub)
    const boguraLocations = [
      { upazila_bn: '', upazila_en: '', factor: 0.88 },
      { upazila_bn: 'বগুড়া সদর', upazila_en: 'Bogura Sadar', factor: 0.90 },
      { upazila_bn: 'শিবগঞ্জ', upazila_en: 'Shibganj', factor: 0.86 }
    ];

    for (const loc of boguraLocations) {
      for (const rawProd of masterProducts.slice(15, 65)) {
        const prodDoc = productMap.get(rawProd.name_en);
        const base = rawProd.defaultPrices;
        const wMin = Math.round(base.wholesale_min * loc.factor);
        const wMax = Math.round(base.wholesale_max * loc.factor);
        const rMin = Math.round(base.retail_min * loc.factor);
        const rMax = Math.round(base.retail_max * loc.factor);
        const prevAvg = Math.round(base.prev_avg * loc.factor * 0.99);

        marketPriceRecords.push({
          product: prodDoc._id,
          division_bn: 'রাজশাহী',
          division_en: 'Rajshahi',
          district_bn: 'বগুড়া',
          district_en: 'Bogura',
          upazila_bn: loc.upazila_bn,
          upazila_en: loc.upazila_en,
          wholesale_price_min: wMin,
          wholesale_price_max: wMax,
          retail_price_min: rMin,
          retail_price_max: rMax,
          previous_wholesale_avg: prevAvg,
          source: 'MANUAL_ADMIN',
          isManualOverride: false,
          updatedAt: new Date()
        });
      }
    }

    // 4e. Seed Sample Prices for Rangpur -> Dinajpur (Grain & Litchi Hub)
    for (const rawProd of masterProducts.slice(0, 40)) {
      const prodDoc = productMap.get(rawProd.name_en);
      const base = rawProd.defaultPrices;
      const factor = 0.87;
      marketPriceRecords.push({
        product: prodDoc._id,
        division_bn: 'রংপুর',
        division_en: 'Rangpur',
        district_bn: 'দিনাজপুর',
        district_en: 'Dinajpur',
        upazila_bn: '',
        upazila_en: '',
        wholesale_price_min: Math.round(base.wholesale_min * factor),
        wholesale_price_max: Math.round(base.wholesale_max * factor),
        retail_price_min: Math.round(base.retail_min * factor),
        retail_price_max: Math.round(base.retail_max * factor),
        previous_wholesale_avg: Math.round(base.prev_avg * factor * 1.02),
        source: 'MANUAL_ADMIN',
        isManualOverride: false,
        updatedAt: new Date()
      });
    }

    // 4f. Seed Sample Prices for Chattogram -> Chattogram
    for (const rawProd of masterProducts.slice(0, 40)) {
      const prodDoc = productMap.get(rawProd.name_en);
      const base = rawProd.defaultPrices;
      const factor = 1.05; // Slightly higher due to transport/port
      marketPriceRecords.push({
        product: prodDoc._id,
        division_bn: 'চট্টগ্রাম',
        division_en: 'Chattogram',
        district_bn: 'চট্টগ্রাম',
        district_en: 'Chattogram',
        upazila_bn: '',
        upazila_en: '',
        wholesale_price_min: Math.round(base.wholesale_min * factor),
        wholesale_price_max: Math.round(base.wholesale_max * factor),
        retail_price_min: Math.round(base.retail_min * factor),
        retail_price_max: Math.round(base.retail_max * factor),
        previous_wholesale_avg: Math.round(base.prev_avg * factor * 0.97),
        source: 'MANUAL_ADMIN',
        isManualOverride: false,
        updatedAt: new Date()
      });
    }

    await MarketPrice.insertMany(marketPriceRecords);
    console.log(` Seeded ${marketPriceRecords.length} Market Price records across multiple divisions & upazilas.\n`);

    // 5. Seed External API Configuration Template
    console.log('4. Seeding API Configuration...');
    const defaultApiConfig = new ApiConfig({
      providerName: 'Department of Agricultural Marketing (DAM) Gov BD',
      apiUrl: 'https://dam.gov.bd/api/v1/market-prices',
      apiKey: '',
      headers: {
        'User-Agent': 'NajjoDam-PriceAggregator/1.0',
        'Accept': 'application/json'
      },
      fieldMapping: {
        productNameKey: 'commodity_name',
        divisionKey: 'division',
        districtKey: 'market_district',
        upazilaKey: 'market_upazila',
        wholesaleMinKey: 'price_wholesale_min',
        wholesaleMaxKey: 'price_wholesale_max',
        retailMinKey: 'price_retail_min',
        retailMaxKey: 'price_retail_max'
      },
      syncIntervalMinutes: 60,
      isActive: false, // inactive until actual external credentials provided
      lastSyncAt: null,
      lastSyncStatus: 'IDLE'
    });
    await defaultApiConfig.save();
    console.log(' External API config template seeded.\n');

    // 6. Seed Urgent Notices for Farmer Ticker
    console.log('5. Seeding Notices...');
    const notices = [
      {
        text_bn: 'কৃষক ভাইদের দৃষ্টি আকর্ষণ: মধ্যস্বত্বভোগীদের কাছে ফসল বিক্রির আগে "ন্যায্য দাম" অ্যাপে স্থানীয় পাইকারি দর যাচাই করে নিন।',
        isActive: true,
        priority: 1
      },
      {
        text_bn: 'বোরো মৌসুমের ধান সংগ্রহের সরকারি মূল্য: প্রতি কেজি ধান ৩২ টাকা এবং প্রতি কেজি চাল ৪৫ টাকা নির্ধারণ করা হয়েছে।',
        isActive: true,
        priority: 2
      },
      {
        text_bn: 'সারা দেশের ৬৪ জেলার সকল উপজেলার নিত্যপ্রয়োজনীয় কৃষিপণ্যের পাইকারি ও খুচরা মূল্য প্রতিদিন সকাল ৮টায় হালনাগাদ করা হয়।',
        isActive: true,
        priority: 3
      }
    ];
    await Notice.insertMany(notices);
    console.log(` Seeded ${notices.length} active notices for top scrolling ticker.\n`);

    console.log('====================================================');
    console.log('   All Master & Sample Data Seeded Successfully!   ');
    console.log('====================================================');

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error(' Seeding error:', error);
    process.exit(1);
  }
}

// Execute if called directly from CLI
if (require.main === module) {
  seedDatabase();
}

module.exports = seedDatabase;
