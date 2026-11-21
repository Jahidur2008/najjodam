const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

/**
 * JWT Authentication Middleware
 * Protects all /api/admin/* endpoints
 */
const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || 'supersecretjwtkeyfornajjodamadminauth2026'
      );

      const admin = await Admin.findById(decoded.id).select('-password');
      if (!admin) {
        return res.status(401).json({
          success: false,
          message: 'Not authorized: Admin account no longer exists'
        });
      }

      req.admin = admin;
      next();
    } catch (error) {
      console.error('[Auth Error]', error.message);
      return res.status(401).json({
        success: false,
        message: 'Not authorized: Invalid or expired token'
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized: No token provided in Authorization header'
    });
  }
};

/**
 * Role-Based Access Control Middleware (optional granularity)
 */
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.admin || !roles.includes(req.admin.role)) {
      return res.status(403).json({
        success: false,
        message: `Forbidden: Admin role '${req.admin ? req.admin.role : 'none'}' does not have sufficient permission`
      });
    }
    next();
  };
};

/**
 * Strict Master Admin Middleware
 * Enforces req.admin.role === 'MASTER_ADMIN'
 */
const requireMasterAdmin = (req, res, next) => {
  if (!req.admin || req.admin.role !== 'MASTER_ADMIN') {
    return res.status(403).json({
      success: false,
      message: 'শুধুমাত্র মাস্টার অ্যাডমিন (MASTER_ADMIN) এই অ্যাকশনটি সম্পন্ন করতে পারবেন।'
    });
  }
  next();
};

module.exports = {
  protect,
  authorize,
  requireMasterAdmin
};
