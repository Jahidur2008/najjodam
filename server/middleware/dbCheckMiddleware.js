const mongoose = require('mongoose');

/**
 * Middleware to verify active database connection before handling requests.
 * Prevents Mongoose 10,000ms buffering timeouts when database is not yet ready.
 */
const checkDbConnection = (req, res, next) => {
  // readyState: 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({
      success: false,
      message: 'ডাটাবেস সংযোগ স্থাপন করা হচ্ছে, অনুগ্রহ করে কয়েক সেকেন্ড পর পুনরায় চেষ্টা করুন।',
      error: 'Database is connecting or temporarily unavailable (readyState: ' + mongoose.connection.readyState + ')'
    });
  }
  next();
};

module.exports = checkDbConnection;
