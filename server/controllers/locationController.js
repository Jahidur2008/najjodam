const {
  bdLocations,
  DEFAULT_LOCATION,
  getAllDivisions,
  getDistrictsByDivision,
  getUpazilasByDistrict,
  findLocation
} = require('../data/bdLocations');

// @desc    Get complete administrative location tree
// @route   GET /api/locations
// @access  Public
const getAllLocations = (req, res) => {
  res.json({
    success: true,
    data: {
      defaultLocation: DEFAULT_LOCATION,
      totalDivisions: bdLocations.length,
      divisions: bdLocations
    }
  });
};

// @desc    Get all divisions
// @route   GET /api/locations/divisions
// @access  Public
const getDivisions = (req, res) => {
  const divisions = getAllDivisions();
  res.json({
    success: true,
    data: divisions
  });
};

// @desc    Get districts by division
// @route   GET /api/locations/districts
// @access  Public
const getDistricts = (req, res) => {
  const { division } = req.query;
  if (!division) {
    return res.status(400).json({
      success: false,
      message: 'Division query parameter (e.g. ?division=Dhaka) is required'
    });
  }
  const districts = getDistrictsByDivision(division);
  res.json({
    success: true,
    division,
    data: districts
  });
};

// @desc    Get upazilas by district
// @route   GET /api/locations/upazilas
// @access  Public
const getUpazilas = (req, res) => {
  const { district } = req.query;
  if (!district) {
    return res.status(400).json({
      success: false,
      message: 'District query parameter (e.g. ?district=Kushtia) is required'
    });
  }
  const upazilas = getUpazilasByDistrict(district);
  res.json({
    success: true,
    district,
    data: upazilas
  });
};

// @desc    Get default baseline location (Dhaka)
// @route   GET /api/locations/default
// @access  Public
const getDefaultLocation = (req, res) => {
  res.json({
    success: true,
    data: DEFAULT_LOCATION
  });
};

module.exports = {
  getAllLocations,
  getDivisions,
  getDistricts,
  getUpazilas,
  getDefaultLocation
};
