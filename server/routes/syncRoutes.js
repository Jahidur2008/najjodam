const express = require('express');
const router = express.Router();
const ApiConfig = require('../models/ApiConfig');
const { syncAllActiveConfigs } = require('../services/apiSyncService');
const { protect } = require('../middleware/authMiddleware');

// @desc    Get API synchronization configurations & status
// @route   GET /api/sync/config
// @access  Public (Read-only status)
router.get('/config', async (req, res, next) => {
  try {
    const configs = await ApiConfig.find().select('-apiKey');
    res.json({
      success: true,
      count: configs.length,
      data: configs
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Trigger sync operation across all active providers
// @route   POST /api/sync/trigger
// @access  Protected (Admin JWT)
router.post('/trigger', protect, async (req, res, next) => {
  try {
    const result = await syncAllActiveConfigs();
    res.json({
      success: true,
      message: `স্বয়ংক্রিয় বাজারদর সিঙ্ক সম্পন্ন হয়েছে। মোট ${result.totalConfigs} টি সক্রিয় প্রোভাইডার প্রসেস করা হয়েছে।`,
      data: result
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
