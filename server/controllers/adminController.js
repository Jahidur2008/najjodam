const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const SiteSetting = require('../models/SiteSetting');
const Product = require('../models/Product');
const MarketPrice = require('../models/MarketPrice');
const ApiConfig = require('../models/ApiConfig');
const Notice = require('../models/Notice');
const { findLocation } = require('../data/bdLocations');
const { triggerManualSync } = require('../jobs/syncScheduler');

// ==========================================
// 1. Admin Authentication & Registration
// ==========================================

// @desc    Get dynamic admin registration status
// @route   GET /api/admin/registration-status
// @access  Public
const getRegistrationStatus = async (req, res, next) => {
  try {
    const adminCount = await Admin.countDocuments();
    if (adminCount === 0) {
      return res.json({
        success: true,
        canRegister: true,
        isFirstSetup: true,
        count: 0
      });
    }

    const setting = await SiteSetting.getSettings();
    return res.json({
      success: true,
      canRegister: Boolean(setting.isAdminRegistrationOpen),
      isFirstSetup: false,
      count: adminCount
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Register new admin (1st user becomes MASTER_ADMIN; subsequent require open registration)
// @route   POST /api/admin/register
// @access  Public (guarded by registration status)
const registerAdmin = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'নাম, ইমেইল এবং পাসওয়ার্ড সবগুলো ফিল্ডই পূরণ করা আবশ্যক।'
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'পাসওয়ার্ড ন্যূনতম ৬ অক্ষরের হতে হবে।'
      });
    }

    const cleanEmail = email.toLowerCase().trim();
    const existingAdmin = await Admin.findOne({ email: cleanEmail });
    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: 'এই ইমেইল দিয়ে ইতিমধ্যে একটি অ্যাকাউন্ট তৈরি করা হয়েছে।'
      });
    }

    const adminCount = await Admin.countDocuments();

    let assignedRole = 'ADMIN';

    if (adminCount === 0) {
      // The very first registrant becomes MASTER_ADMIN
      assignedRole = 'MASTER_ADMIN';
    } else {
      // Check if registration toggle is open
      const setting = await SiteSetting.getSettings();
      if (!setting.isAdminRegistrationOpen) {
        return res.status(403).json({
          success: false,
          message: 'অ্যাডমিন রেজিস্ট্রেশন বর্তমানে বন্ধ আছে।'
        });
      }
    }

    const admin = new Admin({
      name: name.trim(),
      username: cleanEmail.split('@')[0],
      email: cleanEmail,
      password, // Pre-save hook hashes with bcryptjs
      role: assignedRole
    });

    await admin.save();

    // If first master admin was registered, ensure public registration is locked by default
    if (assignedRole === 'MASTER_ADMIN') {
      const setting = await SiteSetting.getSettings();
      setting.isAdminRegistrationOpen = false;
      await setting.save();
    }

    const token = jwt.sign(
      { id: admin._id, role: admin.role, email: admin.email, name: admin.name },
      process.env.JWT_SECRET || 'supersecretjwtkeyfornajjodamadminauth2026',
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    res.status(201).json({
      success: true,
      message: assignedRole === 'MASTER_ADMIN'
        ? 'মাস্টার অ্যাডমিন অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে।'
        : 'নতুন অ্যাডমিন অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে।',
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        username: admin.username,
        email: admin.email,
        role: admin.role
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Admin Login & Token Generation
// @route   POST /api/admin/login
// @access  Public
const loginAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'দয়া করে ইমেইল এবং পাসওয়ার্ড দুটিই প্রদান করুন।'
      });
    }

    const admin = await Admin.findOne({ email: email.toLowerCase().trim() });
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'ভুল ইমেইল অথবা পাসওয়ার্ড।'
      });
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'ভুল ইমেইল অথবা পাসওয়ার্ড।'
      });
    }

    const token = jwt.sign(
      { id: admin._id, role: admin.role, email: admin.email, name: admin.name || admin.username },
      process.env.JWT_SECRET || 'supersecretjwtkeyfornajjodamadminauth2026',
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    res.json({
      success: true,
      message: 'লগইন সফল হয়েছে।',
      token,
      admin: {
        id: admin._id,
        name: admin.name || admin.username,
        username: admin.username,
        email: admin.email,
        role: admin.role
      }
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// 2. Admin Dashboard Statistics
// ==========================================

// @desc    Get dashboard metrics & telemetry
// @route   GET /api/admin/dashboard-stats
// @access  Private (Admin)
const getDashboardStats = async (req, res, next) => {
  try {
    const [
      totalProducts,
      totalPrices,
      manualOverridesCount,
      externalApiPricesCount,
      activeApiConfigs,
      lastSyncConfig,
      recentOverrides,
      coveredDistricts
    ] = await Promise.all([
      Product.countDocuments({ isActive: true }),
      MarketPrice.countDocuments({}),
      MarketPrice.countDocuments({ isManualOverride: true }),
      MarketPrice.countDocuments({ source: 'EXTERNAL_API' }),
      ApiConfig.countDocuments({ isActive: true }),
      ApiConfig.findOne().sort({ lastSyncAt: -1 }),
      MarketPrice.find({ isManualOverride: true })
        .populate('product', 'name_bn name_en')
        .sort({ updatedAt: -1 })
        .limit(5)
        .lean(),
      MarketPrice.distinct('district_en')
    ]);

    res.json({
      success: true,
      data: {
        totalProducts,
        totalPrices,
        manualOverridesCount,
        externalApiPricesCount,
        activeApiConfigs,
        lastSyncTimestamp: lastSyncConfig ? lastSyncConfig.lastSyncAt : null,
        lastSyncStatus: lastSyncConfig ? lastSyncConfig.lastSyncStatus : 'IDLE',
        coveredDistrictsCount: coveredDistricts.length,
        recentOverrides
      }
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// 3. Product Management (CRUD)
// ==========================================

// @desc    Get all products for admin
// @route   GET /api/admin/products
// @access  Private (Admin)
const getProductsAdmin = async (req, res, next) => {
  try {
    const { category, search, page = 1, limit = 200 } = req.query;
    const filter = {};

    if (category) {
      filter.$or = [
        { category_en: new RegExp(`^${category.trim()}$`, 'i') },
        { category_bn: category.trim() }
      ];
    }

    if (search) {
      const searchRegex = new RegExp(search.trim(), 'i');
      filter.$or = [
        { name_bn: searchRegex },
        { name_en: searchRegex },
        { subCategory_bn: searchRegex }
      ];
    }

    const products = await Product.find(filter)
      .sort({ category_en: 1, name_en: 1 })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

    const total = await Product.countDocuments(filter);

    res.json({
      success: true,
      count: products.length,
      total,
      data: products
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new product (with optional file upload or image_url)
// @route   POST /api/admin/products
// @access  Private (Admin)
const createProductAdmin = async (req, res, next) => {
  try {
    const {
      name_bn,
      name_en,
      category_bn,
      category_en,
      subCategory_bn,
      unit_bn,
      maundMultiplier,
      image_url,
      isActive
    } = req.body;

    let finalImageUrl = image_url || '';
    if (req.file) {
      finalImageUrl = `/uploads/${req.file.filename}`;
    }

    const product = new Product({
      name_bn,
      name_en,
      category_bn,
      category_en,
      subCategory_bn: subCategory_bn || '',
      unit_bn,
      maundMultiplier: Number(maundMultiplier) || 0,
      image_url: finalImageUrl,
      isActive: isActive !== undefined ? isActive : true
    });

    await product.save();

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: product
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update existing product
// @route   PUT /api/admin/products/:id
// @access  Private (Admin)
const updateProductAdmin = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    const {
      name_bn,
      name_en,
      category_bn,
      category_en,
      subCategory_bn,
      unit_bn,
      maundMultiplier,
      image_url,
      isActive
    } = req.body;

    if (name_bn !== undefined) product.name_bn = name_bn;
    if (name_en !== undefined) product.name_en = name_en;
    if (category_bn !== undefined) product.category_bn = category_bn;
    if (category_en !== undefined) product.category_en = category_en;
    if (subCategory_bn !== undefined) product.subCategory_bn = subCategory_bn;
    if (unit_bn !== undefined) product.unit_bn = unit_bn;
    if (maundMultiplier !== undefined) product.maundMultiplier = Number(maundMultiplier);
    if (isActive !== undefined) product.isActive = isActive;

    if (req.file) {
      product.image_url = `/uploads/${req.file.filename}`;
    } else if (image_url !== undefined) {
      product.image_url = image_url;
    }

    await product.save();

    res.json({
      success: true,
      message: 'Product updated successfully',
      data: product
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete product
// @route   DELETE /api/admin/products/:id
// @access  Private (Admin)
const deleteProductAdmin = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    // Also remove associated market prices to maintain integrity
    await MarketPrice.deleteMany({ product: product._id });
    await product.deleteOne();

    res.json({
      success: true,
      message: 'Product and associated market prices removed successfully'
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// 4. Market Price Management (CRUD)
// ==========================================

// @desc    Get all market prices for admin
// @route   GET /api/admin/prices
// @access  Private (Admin)
const getPricesAdmin = async (req, res, next) => {
  try {
    const {
      division,
      district,
      upazila,
      source,
      isManualOverride,
      search,
      page = 1,
      limit = 100
    } = req.query;

    const filter = {};

    if (division) filter.division_en = new RegExp(`^${division.trim()}$`, 'i');
    if (district) filter.district_en = new RegExp(`^${district.trim()}$`, 'i');
    if (upazila !== undefined && upazila !== '') {
      filter.upazila_en = new RegExp(`^${upazila.trim()}$`, 'i');
    }
    if (source) filter.source = source;
    if (isManualOverride !== undefined) {
      filter.isManualOverride = isManualOverride === 'true';
    }

    // Filter by product name search if provided
    if (search) {
      const searchRegex = new RegExp(search.trim(), 'i');
      const matchingProducts = await Product.find({
        $or: [{ name_bn: searchRegex }, { name_en: searchRegex }]
      }).select('_id');
      filter.product = { $in: matchingProducts.map(p => p._id) };
    }

    const prices = await MarketPrice.find(filter)
      .populate('product')
      .sort({ updatedAt: -1 })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

    const total = await MarketPrice.countDocuments(filter);

    res.json({
      success: true,
      count: prices.length,
      total,
      data: prices
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create or upsert market price (sets isManualOverride = true)
// @route   POST /api/admin/prices
// @access  Private (Admin)
const createPriceAdmin = async (req, res, next) => {
  try {
    const {
      product,
      division_en,
      district_en,
      upazila_en = '',
      wholesale_price_min,
      wholesale_price_max,
      retail_price_min,
      retail_price_max,
      isManualOverride = true
    } = req.body;

    if (!product || !division_en || !district_en) {
      return res.status(400).json({
        success: false,
        message: 'Product, division_en, and district_en are required'
      });
    }

    const locMeta = findLocation(division_en, district_en, upazila_en);
    const division_bn = locMeta ? locMeta.division_bn : division_en;
    const district_bn = locMeta ? locMeta.district_bn : district_en;
    const upazila_bn = locMeta ? locMeta.upazila_bn : (upazila_en || '');

    const query = {
      product,
      division_en,
      district_en,
      upazila_en: upazila_en || ''
    };

    let priceEntry = await MarketPrice.findOne(query);

    if (priceEntry) {
      // Store current average before overriding
      priceEntry.previous_wholesale_avg =
        (priceEntry.wholesale_price_min + priceEntry.wholesale_price_max) / 2;

      priceEntry.wholesale_price_min = Number(wholesale_price_min);
      priceEntry.wholesale_price_max = Number(wholesale_price_max);
      priceEntry.retail_price_min = Number(retail_price_min);
      priceEntry.retail_price_max = Number(retail_price_max);
      priceEntry.source = 'MANUAL_ADMIN';
      priceEntry.isManualOverride = Boolean(isManualOverride);
      priceEntry.updatedAt = new Date();

      await priceEntry.save();
    } else {
      const wAvg = (Number(wholesale_price_min) + Number(wholesale_price_max)) / 2;
      priceEntry = new MarketPrice({
        product,
        division_bn,
        division_en,
        district_bn,
        district_en,
        upazila_bn,
        upazila_en: upazila_en || '',
        wholesale_price_min: Number(wholesale_price_min),
        wholesale_price_max: Number(wholesale_price_max),
        retail_price_min: Number(retail_price_min),
        retail_price_max: Number(retail_price_max),
        previous_wholesale_avg: wAvg,
        source: 'MANUAL_ADMIN',
        isManualOverride: Boolean(isManualOverride),
        updatedAt: new Date()
      });

      await priceEntry.save();
    }

    const populated = await MarketPrice.findById(priceEntry._id).populate('product');

    res.status(201).json({
      success: true,
      message: 'Market price updated with manual override flag',
      data: populated
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update existing market price
// @route   PUT /api/admin/prices/:id
// @access  Private (Admin)
const updatePriceAdmin = async (req, res, next) => {
  try {
    const price = await MarketPrice.findById(req.params.id);
    if (!price) {
      return res.status(404).json({ success: false, message: 'Market price entry not found' });
    }

    const {
      wholesale_price_min,
      wholesale_price_max,
      retail_price_min,
      retail_price_max,
      isManualOverride
    } = req.body;

    // Preserve previous average for trend arrow calculation
    price.previous_wholesale_avg =
      (price.wholesale_price_min + price.wholesale_price_max) / 2;

    if (wholesale_price_min !== undefined) price.wholesale_price_min = Number(wholesale_price_min);
    if (wholesale_price_max !== undefined) price.wholesale_price_max = Number(wholesale_price_max);
    if (retail_price_min !== undefined) price.retail_price_min = Number(retail_price_min);
    if (retail_price_max !== undefined) price.retail_price_max = Number(retail_price_max);

    // Set to manual admin override
    price.source = 'MANUAL_ADMIN';
    price.isManualOverride = isManualOverride !== undefined ? Boolean(isManualOverride) : true;
    price.updatedAt = new Date();

    await price.save();

    const populated = await MarketPrice.findById(price._id).populate('product');

    res.json({
      success: true,
      message: 'Price updated successfully',
      data: populated
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete market price entry
// @route   DELETE /api/admin/prices/:id
// @access  Private (Admin)
const deletePriceAdmin = async (req, res, next) => {
  try {
    const price = await MarketPrice.findById(req.params.id);
    if (!price) {
      return res.status(404).json({ success: false, message: 'Market price not found' });
    }

    await price.deleteOne();

    res.json({
      success: true,
      message: 'Market price entry deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// 5. External API Configuration & Sync Trigger
// ==========================================

// @desc    Get all external API configs
// @route   GET /api/admin/api-configs
// @access  Private (Admin)
const getApiConfigsAdmin = async (req, res, next) => {
  try {
    const configs = await ApiConfig.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      count: configs.length,
      data: configs
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new API config
// @route   POST /api/admin/api-configs
// @access  Private (Admin)
const createApiConfigAdmin = async (req, res, next) => {
  try {
    const {
      providerName,
      apiUrl,
      apiKey,
      headers,
      fieldMapping,
      syncIntervalMinutes,
      isActive
    } = req.body;

    const config = new ApiConfig({
      providerName,
      apiUrl,
      apiKey: apiKey || '',
      headers: headers || {},
      fieldMapping: fieldMapping || {},
      syncIntervalMinutes: Number(syncIntervalMinutes) || 60,
      isActive: isActive !== undefined ? isActive : true
    });

    await config.save();

    res.status(201).json({
      success: true,
      message: 'API Configuration created successfully',
      data: config
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update API config
// @route   PUT /api/admin/api-configs/:id
// @access  Private (Admin)
const updateApiConfigAdmin = async (req, res, next) => {
  try {
    const config = await ApiConfig.findById(req.params.id);
    if (!config) {
      return res.status(404).json({ success: false, message: 'API config not found' });
    }

    const {
      providerName,
      apiUrl,
      apiKey,
      headers,
      fieldMapping,
      syncIntervalMinutes,
      isActive
    } = req.body;

    if (providerName !== undefined) config.providerName = providerName;
    if (apiUrl !== undefined) config.apiUrl = apiUrl;
    if (apiKey !== undefined) config.apiKey = apiKey;
    if (headers !== undefined) config.headers = headers;
    if (fieldMapping !== undefined) config.fieldMapping = fieldMapping;
    if (syncIntervalMinutes !== undefined) config.syncIntervalMinutes = Number(syncIntervalMinutes);
    if (isActive !== undefined) config.isActive = isActive;

    await config.save();

    res.json({
      success: true,
      message: 'API Configuration updated successfully',
      data: config
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete API config
// @route   DELETE /api/admin/api-configs/:id
// @access  Private (Admin)
const deleteApiConfigAdmin = async (req, res, next) => {
  try {
    const config = await ApiConfig.findById(req.params.id);
    if (!config) {
      return res.status(404).json({ success: false, message: 'API config not found' });
    }

    await config.deleteOne();

    res.json({
      success: true,
      message: 'API Configuration removed successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Trigger immediate sync for a specific API config
// @route   POST /api/admin/api-configs/:id/sync-now
// @access  Private (Admin)
const triggerSyncNowAdmin = async (req, res, next) => {
  try {
    const { id } = req.params;
    const config = await ApiConfig.findById(id);
    if (!config) {
      return res.status(404).json({ success: false, message: 'API configuration not found' });
    }

    const syncResult = await triggerManualSync(id);

    res.json({
      success: true,
      message: `Sync execution completed for ${config.providerName}`,
      result: syncResult
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// 6. Notice Ticker Management (CRUD)
// ==========================================

// @desc    Get all notices
// @route   GET /api/admin/notices
// @access  Private (Admin)
const getNoticesAdmin = async (req, res, next) => {
  try {
    const notices = await Notice.find().sort({ priority: 1, updatedAt: -1 });
    res.json({
      success: true,
      count: notices.length,
      data: notices
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new notice
// @route   POST /api/admin/notices
// @access  Private (Admin)
const createNoticeAdmin = async (req, res, next) => {
  try {
    const { text_bn, isActive, priority } = req.body;
    if (!text_bn) {
      return res.status(400).json({ success: false, message: 'Notice text in Bengali is required' });
    }

    const notice = new Notice({
      text_bn,
      isActive: isActive !== undefined ? isActive : true,
      priority: Number(priority) || 1
    });

    await notice.save();

    res.status(201).json({
      success: true,
      message: 'Notice created successfully',
      data: notice
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update notice
// @route   PUT /api/admin/notices/:id
// @access  Private (Admin)
const updateNoticeAdmin = async (req, res, next) => {
  try {
    const notice = await Notice.findById(req.params.id);
    if (!notice) {
      return res.status(404).json({ success: false, message: 'Notice not found' });
    }

    const { text_bn, isActive, priority } = req.body;
    if (text_bn !== undefined) notice.text_bn = text_bn;
    if (isActive !== undefined) notice.isActive = isActive;
    if (priority !== undefined) notice.priority = Number(priority);
    notice.updatedAt = new Date();

    await notice.save();

    res.json({
      success: true,
      message: 'Notice updated successfully',
      data: notice
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete notice
// @route   DELETE /api/admin/notices/:id
// @access  Private (Admin)
const deleteNoticeAdmin = async (req, res, next) => {
  try {
    const notice = await Notice.findById(req.params.id);
    if (!notice) {
      return res.status(404).json({ success: false, message: 'Notice not found' });
    }

    await notice.deleteOne();

    res.json({
      success: true,
      message: 'Notice deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// 7. Master Admin: Admin & Access Management
// ==========================================

// @desc    List all admins and registration status (Master Admin only)
// @route   GET /api/admin/manage/admins
// @access  Private (MASTER_ADMIN)
const getManagedAdmins = async (req, res, next) => {
  try {
    const admins = await Admin.find().select('-password').sort({ createdAt: 1 });
    const setting = await SiteSetting.getSettings();
    res.json({
      success: true,
      count: admins.length,
      isAdminRegistrationOpen: setting.isAdminRegistrationOpen,
      admins
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Toggle dynamic registration ON / OFF (Master Admin only)
// @route   PATCH /api/admin/manage/toggle-registration
// @access  Private (MASTER_ADMIN)
const toggleAdminRegistration = async (req, res, next) => {
  try {
    const setting = await SiteSetting.getSettings();
    setting.isAdminRegistrationOpen = !setting.isAdminRegistrationOpen;
    await setting.save();

    res.json({
      success: true,
      message: `পাবলিক অ্যাডমিন রেজিস্ট্রেশন সফলভাবে ${setting.isAdminRegistrationOpen ? 'চালু' : 'বন্ধ'} করা হয়েছে।`,
      isAdminRegistrationOpen: setting.isAdminRegistrationOpen
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete sub-admin (Master Admin only; cannot delete MASTER_ADMIN)
// @route   DELETE /api/admin/manage/admins/:id
// @access  Private (MASTER_ADMIN)
const deleteSubAdmin = async (req, res, next) => {
  try {
    const targetAdmin = await Admin.findById(req.params.id);
    if (!targetAdmin) {
      return res.status(404).json({ success: false, message: 'অ্যাডমিন অ্যাকাউন্ট পাওয়া যায়নি।' });
    }

    if (targetAdmin.role === 'MASTER_ADMIN') {
      return res.status(403).json({
        success: false,
        message: 'মাস্টার অ্যাডমিন (MASTER_ADMIN) অ্যাকাউন্ট মুছে ফেলা যাবে না।'
      });
    }

    await Admin.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: `অ্যাডমিন "${targetAdmin.name || targetAdmin.email}" সফলভাবে মুছে ফেলা হয়েছে।`
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// 8. Branding & Dynamic Logo/Favicon Settings
// ==========================================

// @desc    Get current site branding & settings
// @route   GET /api/admin/site-settings
// @access  Private (Admin)
const getAdminSiteSettings = async (req, res, next) => {
  try {
    const settings = await SiteSetting.getSettings();
    res.json({
      success: true,
      data: settings
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Upload new Website Logo (JPG, PNG, WEBP, SVG)
// @route   POST /api/admin/site-settings/logo
// @access  Private (Admin)
const uploadSiteLogo = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'দয়া করে একটি লোগো ইমেজ ফাইল সিলেক্ট করুন।'
      });
    }

    const settings = await SiteSetting.getSettings();

    // Safely delete previous custom uploaded logo file if present
    if (settings.logoUrl && settings.logoUrl.startsWith('/uploads/')) {
      const oldFilePath = path.join(__dirname, '..', settings.logoUrl);
      if (fs.existsSync(oldFilePath)) {
        try {
          fs.unlinkSync(oldFilePath);
        } catch (unlinkErr) {
          console.error('[Branding] Error removing old logo file:', unlinkErr.message);
        }
      }
    }

    settings.logoUrl = `/uploads/${req.file.filename}`;
    await settings.save();

    res.json({
      success: true,
      message: 'ওয়েবসাইট লোগো সফলভাবে আপলোড ও আপডেট করা হয়েছে।',
      data: settings
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Reset Website Logo back to default SVG
// @route   DELETE /api/admin/site-settings/logo
// @access  Private (Admin)
const resetSiteLogo = async (req, res, next) => {
  try {
    const settings = await SiteSetting.getSettings();

    // Safely delete custom file from disk if present
    if (settings.logoUrl && settings.logoUrl.startsWith('/uploads/')) {
      const oldFilePath = path.join(__dirname, '..', settings.logoUrl);
      if (fs.existsSync(oldFilePath)) {
        try {
          fs.unlinkSync(oldFilePath);
        } catch (unlinkErr) {
          console.error('[Branding] Error deleting logo file:', unlinkErr.message);
        }
      }
    }

    settings.logoUrl = '/images/najjo-dam-logo.svg';
    await settings.save();

    res.json({
      success: true,
      message: 'লোগো ডিফল্ট অবস্থায় ফিরিয়ে আনা হয়েছে।',
      data: settings
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Upload new Website Favicon (JPG, PNG, WEBP, SVG, ICO)
// @route   POST /api/admin/site-settings/favicon
// @access  Private (Admin)
const uploadSiteFavicon = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'দয়া করে একটি ফ্যাভিকন ইমেজ ফাইল সিলেক্ট করুন।'
      });
    }

    const settings = await SiteSetting.getSettings();

    // Safely delete previous custom uploaded favicon file if present
    if (settings.faviconUrl && settings.faviconUrl.startsWith('/uploads/')) {
      const oldFilePath = path.join(__dirname, '..', settings.faviconUrl);
      if (fs.existsSync(oldFilePath)) {
        try {
          fs.unlinkSync(oldFilePath);
        } catch (unlinkErr) {
          console.error('[Branding] Error removing old favicon file:', unlinkErr.message);
        }
      }
    }

    settings.faviconUrl = `/uploads/${req.file.filename}`;
    await settings.save();

    res.json({
      success: true,
      message: 'ওয়েবসাইট ফ্যাভিকন সফলভাবে আপলোড ও আপডেট করা হয়েছে।',
      data: settings
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Reset Website Favicon back to default SVG
// @route   DELETE /api/admin/site-settings/favicon
// @access  Private (Admin)
const resetSiteFavicon = async (req, res, next) => {
  try {
    const settings = await SiteSetting.getSettings();

    // Safely delete custom file from disk if present
    if (settings.faviconUrl && settings.faviconUrl.startsWith('/uploads/')) {
      const oldFilePath = path.join(__dirname, '..', settings.faviconUrl);
      if (fs.existsSync(oldFilePath)) {
        try {
          fs.unlinkSync(oldFilePath);
        } catch (unlinkErr) {
          console.error('[Branding] Error deleting favicon file:', unlinkErr.message);
        }
      }
    }

    settings.faviconUrl = '/images/najjo-dam-favicon.svg';
    await settings.save();

    res.json({
      success: true,
      message: 'ফ্যাভিকন ডিফল্ট অবস্থায় ফিরিয়ে আনা হয়েছে।',
      data: settings
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  // Auth, Registration & Stats
  getRegistrationStatus,
  registerAdmin,
  loginAdmin,
  getDashboardStats,
  // Master Admin Management
  getManagedAdmins,
  toggleAdminRegistration,
  deleteSubAdmin,
  // Branding & Logo/Favicon
  getAdminSiteSettings,
  uploadSiteLogo,
  resetSiteLogo,
  uploadSiteFavicon,
  resetSiteFavicon,
  // Products
  getProductsAdmin,
  createProductAdmin,
  updateProductAdmin,
  deleteProductAdmin,
  // Prices
  getPricesAdmin,
  createPriceAdmin,
  updatePriceAdmin,
  deletePriceAdmin,
  // API Config & Sync
  getApiConfigsAdmin,
  createApiConfigAdmin,
  updateApiConfigAdmin,
  deleteApiConfigAdmin,
  triggerSyncNowAdmin,
  // Notices
  getNoticesAdmin,
  createNoticeAdmin,
  updateNoticeAdmin,
  deleteNoticeAdmin
};
