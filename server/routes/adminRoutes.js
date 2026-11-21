const express = require('express');
const router = express.Router();
const { protect, requireMasterAdmin } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

const {
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
} = require('../controllers/adminController');

// ----------------------------------------------------
// Public Admin Routes (Registration Status, Register & Login)
// ----------------------------------------------------
router.get('/registration-status', getRegistrationStatus);
router.post('/register', registerAdmin);
router.post('/login', loginAdmin);

// ----------------------------------------------------
// Protected Admin Routes (JWT Token Required)
// ----------------------------------------------------
router.use(protect);

// Dashboard Statistics
router.get('/dashboard-stats', getDashboardStats);

// Branding, Website Logo & Favicon Management
router.get('/site-settings', getAdminSiteSettings);
router.post('/site-settings/logo', upload.single('logo'), uploadSiteLogo);
router.delete('/site-settings/logo', resetSiteLogo);
router.post('/site-settings/favicon', upload.single('favicon'), uploadSiteFavicon);
router.delete('/site-settings/favicon', resetSiteFavicon);

// Master Admin Access Control Routes
router.get('/manage/admins', requireMasterAdmin, getManagedAdmins);
router.patch('/manage/toggle-registration', requireMasterAdmin, toggleAdminRegistration);
router.delete('/manage/admins/:id', requireMasterAdmin, deleteSubAdmin);

// Product Management
router.get('/products', getProductsAdmin);
router.post('/products', upload.single('image'), createProductAdmin);
router.put('/products/:id', upload.single('image'), updateProductAdmin);
router.delete('/products/:id', deleteProductAdmin);

// Market Price Management
router.get('/prices', getPricesAdmin);
router.post('/prices', createPriceAdmin);
router.put('/prices/:id', updatePriceAdmin);
router.delete('/prices/:id', deletePriceAdmin);

// External API Config & Sync Operations
router.get('/api-configs', getApiConfigsAdmin);
router.post('/api-configs', createApiConfigAdmin);
router.put('/api-configs/:id', updateApiConfigAdmin);
router.delete('/api-configs/:id', deleteApiConfigAdmin);
router.post('/api-configs/:id/sync-now', triggerSyncNowAdmin);

// Urgent Farmer Notice Ticker Management
router.get('/notices', getNoticesAdmin);
router.post('/notices', createNoticeAdmin);
router.put('/notices/:id', updateNoticeAdmin);
router.delete('/notices/:id', deleteNoticeAdmin);

module.exports = router;
