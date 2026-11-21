const express = require('express');
const router = express.Router();
const {
  getPrices,
  getBaselinePrices,
  getProductPrices
} = require('../controllers/priceController');

router.get('/', getPrices);
router.get('/baseline', getBaselinePrices);
router.get('/product/:productId', getProductPrices);

module.exports = router;
