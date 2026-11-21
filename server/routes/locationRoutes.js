const express = require('express');
const router = express.Router();
const {
  getAllLocations,
  getDivisions,
  getDistricts,
  getUpazilas,
  getDefaultLocation
} = require('../controllers/locationController');

router.get('/', getAllLocations);
router.get('/divisions', getDivisions);
router.get('/districts', getDistricts);
router.get('/upazilas', getUpazilas);
router.get('/default', getDefaultLocation);

module.exports = router;
