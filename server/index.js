const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables from .env
dotenv.config({ path: path.resolve(__dirname, '.env') });

const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');
const checkDbConnection = require('./middleware/dbCheckMiddleware');
const { startScheduler } = require('./jobs/syncScheduler');

// Route Imports
const publicRoutes = require('./routes/publicRoutes');
const adminRoutes = require('./routes/adminRoutes');
const locationRoutes = require('./routes/locationRoutes');
const productRoutes = require('./routes/productRoutes');
const priceRoutes = require('./routes/priceRoutes');
const noticeRoutes = require('./routes/noticeRoutes');
const syncRoutes = require('./routes/syncRoutes');

// Initialize Express App
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Security Headers (allow cross-origin resource sharing for static upload images)
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' }
  })
);

// CORS Configuration
const getParsedOrigins = () => {
  const defaults = ['http://localhost:3000', 'http://127.0.0.1:3000'];
  if (!process.env.CLIENT_URL) return defaults;
  const envOrigins = process.env.CLIENT_URL.split(',').map((u) => u.trim().replace(/\/$/, ''));
  return [...new Set([...defaults, ...envOrigins])];
};

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      const cleanOrigin = origin.replace(/\/$/, '');
      const allowed = getParsedOrigins();

      // Allow matching origins or any vercel.app preview domain
      if (
        allowed.includes(cleanOrigin) ||
        cleanOrigin.endsWith('.vercel.app') ||
        process.env.NODE_ENV !== 'production'
      ) {
        return callback(null, true);
      }
      return callback(new Error(`CORS policy: Origin ${origin} not allowed by Access-Control-Allow-Origin`));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);

// Request Parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve static uploaded product images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// HTTP Request Logging
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
}

// Root Route
app.get('/', (req, res) => {
  res.json({
    project: 'ন্যায্য দাম (Najjo Dam - কৃষকের বাজারদর)',
    description: 'Real-time Agricultural Market Price Platform for Bangladeshi Farmers',
    version: '1.0.0',
    documentation: '/api/health',
    status: 'ACTIVE'
  });
});

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  const mongoose = require('mongoose');
  const dbStatusMap = {
    0: 'DISCONNECTED',
    1: 'CONNECTED',
    2: 'CONNECTING',
    3: 'DISCONNECTING'
  };

  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: Math.floor(process.uptime()),
    database: {
      status: dbStatusMap[mongoose.connection.readyState] || 'UNKNOWN',
      name: mongoose.connection.name || null
    },
    coverage: {
      divisions: 8,
      districts: 64,
      upazilas: 495
    }
  });
});

// ==========================================
// API Route Registrations
// ==========================================
// 1. Primary Public Routes (No Auth Required)
app.use('/api/public', publicRoutes);

// 2. Primary Admin Routes (JWT Protected & DB Connectivity Guard)
app.use('/api/admin', checkDbConnection, adminRoutes);

// 3. Modular Direct Routes
app.use('/api/locations', locationRoutes);
app.use('/api/products', productRoutes);
app.use('/api/prices', priceRoutes);
app.use('/api/notices', noticeRoutes);
app.use('/api/sync', syncRoutes);

// 404 Route Handler
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `API endpoint not found: ${req.method} ${req.originalUrl}`
  });
});

// Global Error Handler Middleware
app.use(errorHandler);

// Start Server & Background Cron Scheduler
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log('========================================================');
    console.log(`🌾 "ন্যায্য দাম" (Najjo Dam) Server is running on port: ${PORT}`);
    console.log(`📡 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🔗 Health Check:    http://localhost:${PORT}/api/health`);
    console.log(`📍 Public APIs:     http://localhost:${PORT}/api/public/prices`);
    console.log(`⚙️ Admin Dashboard: http://localhost:${PORT}/api/admin/dashboard-stats`);
    console.log(`🖼️ Static Uploads:  http://localhost:${PORT}/uploads`);
    console.log('========================================================');

    // Start background sync scheduler (default every 60 minutes)
    startScheduler(process.env.CRON_SYNC_SCHEDULE || '0 */1 * * *');
  });
}

module.exports = app;
