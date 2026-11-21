const Product = require('../models/Product');

// @desc    Get all agricultural products with optional filters
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res, next) => {
  try {
    const { category, search, activeOnly = 'true' } = req.query;
    const filter = {};

    if (activeOnly === 'true') {
      filter.isActive = true;
    }

    if (category) {
      filter.$or = [
        { category_en: new RegExp(`^${category}$`, 'i') },
        { category_bn: category }
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

    const products = await Product.find(filter).sort({ category_en: 1, name_en: 1 });

    res.json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get list of unique agricultural categories
// @route   GET /api/products/categories
// @access  Public
const getCategories = async (req, res, next) => {
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

// @desc    Get single product by ID
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProducts,
  getCategories,
  getProductById
};
