const express = require('express');
const router = express.Router();
const Notice = require('../models/Notice');

// @desc    Get active farmer notices for scrolling ticker
// @route   GET /api/notices
// @access  Public
router.get('/', async (req, res, next) => {
  try {
    const notices = await Notice.find({ isActive: true }).sort({ priority: 1, updatedAt: -1 });
    res.json({
      success: true,
      count: notices.length,
      data: notices
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
