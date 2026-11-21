const express = require('express');
const router = express.Router();
const {
  getPublicLocations,
  getPublicCategories,
  getPublicNotices,
  getPublicPrices,
  compareProductPrices
} = require('../controllers/publicController');

router.get('/locations', getPublicLocations);
router.get('/categories', getPublicCategories);
router.get('/notices', getPublicNotices);
router.get('/prices', getPublicPrices);
router.get('/prices/compare/:productId', compareProductPrices);

module.exports = router;
