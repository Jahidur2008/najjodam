const MarketPrice = require('../models/MarketPrice');
const Product = require('../models/Product');

// @desc    Get market prices with geospatial and product filtering
// @route   GET /api/prices
// @access  Public
const getPrices = async (req, res, next) => {
  try {
    const {
      division = 'Dhaka',
      district = 'Dhaka',
      upazila = '',
      category,
      search,
      page = 1,
      limit = 100
    } = req.query;

    // 1. Build product filter if category or search specified
    const productFilter = { isActive: true };
    if (category) {
      productFilter.$or = [
        { category_en: new RegExp(`^${category}$`, 'i') },
        { category_bn: category }
      ];
    }
    if (search) {
      const searchRegex = new RegExp(search.trim(), 'i');
      productFilter.$or = [
        { name_bn: searchRegex },
        { name_en: searchRegex },
        { subCategory_bn: searchRegex }
      ];
    }

    const matchingProducts = await Product.find(productFilter).select('_id');
    const productIds = matchingProducts.map(p => p._id);

    // 2. Query market prices
    // If upazila requested, first check upazila prices, then fallback to district baseline
    let queryConditions = {
      product: { $in: productIds },
      district_en: new RegExp(`^${district}$`, 'i')
    };

    if (upazila && upazila.trim() !== '') {
      // Find upazila specific prices OR district baseline prices
      queryConditions.$or = [
        { upazila_en: new RegExp(`^${upazila.trim()}$`, 'i') },
        { upazila_en: '' }
      ];
    } else {
      // District baseline
      queryConditions.upazila_en = '';
    }

    const rawPrices = await MarketPrice.find(queryConditions)
      .populate('product')
      .sort({ updatedAt: -1 });

    // Deduplicate in case an item has both upazila and district baseline price:
    // prefer upazila-specific price over district baseline
    const priceMap = new Map();
    for (const record of rawPrices) {
      if (!record.product) continue;
      const prodIdStr = record.product._id.toString();
      const isUpazilaMatch = upazila && record.upazila_en && record.upazila_en.toLowerCase() === upazila.trim().toLowerCase();

      if (!priceMap.has(prodIdStr) || isUpazilaMatch) {
        priceMap.set(prodIdStr, record);
      }
    }

    const finalPrices = Array.from(priceMap.values()).map(p => {
      const obj = p.toObject({ virtuals: true });
      // Calculate per maund price if applicable (maund = 40 kg)
      const multiplier = obj.product?.maundMultiplier || 0;
      if (multiplier > 0) {
        obj.wholesale_maund_min = obj.wholesale_price_min * multiplier;
        obj.wholesale_maund_max = obj.wholesale_price_max * multiplier;
        obj.wholesale_maund_avg = ((obj.wholesale_price_min + obj.wholesale_price_max) / 2) * multiplier;
      }
      return obj;
    });

    res.json({
      success: true,
      location: {
        division,
        district,
        upazila: upazila || 'District Baseline (জেলা সদর দর)'
      },
      count: finalPrices.length,
      data: finalPrices
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get Dhaka baseline prices
// @route   GET /api/prices/baseline
// @access  Public
const getBaselinePrices = async (req, res, next) => {
  try {
    const baselinePrices = await MarketPrice.find({
      district_en: 'Dhaka',
      upazila_en: ''
    })
      .populate('product')
      .sort({ 'product.category_en': 1 });

    res.json({
      success: true,
      count: baselinePrices.length,
      data: baselinePrices
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get prices for a specific product across regions
// @route   GET /api/prices/product/:productId
// @access  Public
const getProductPrices = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const prices = await MarketPrice.find({ product: productId })
      .populate('product')
      .sort({ division_en: 1, district_en: 1 });

    res.json({
      success: true,
      count: prices.length,
      data: prices
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPrices,
  getBaselinePrices,
  getProductPrices
};
