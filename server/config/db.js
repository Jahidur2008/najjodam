const mongoose = require('mongoose');

const connectDB = async (retryCount = 5, delay = 3000) => {
  const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/najjodam';

  for (let attempt = 1; attempt <= retryCount; attempt++) {
    try {
      console.log(`[Database] Connecting to MongoDB (Attempt ${attempt}/${retryCount})...`);

      const conn = await mongoose.connect(mongoUri, {
        serverSelectionTimeoutMS: 30000, // 30 seconds for Cloud MongoDB Atlas
        connectTimeoutMS: 30000,
        socketTimeoutMS: 45000,
        autoIndex: process.env.NODE_ENV !== 'production'
      });

      console.log(`✅ MongoDB Connected successfully: ${conn.connection.host} (Database: ${conn.connection.name})`);
      return conn;
    } catch (error) {
      console.error(`❌ MongoDB Connection Error (Attempt ${attempt}/${retryCount}): ${error.message}`);
      if (attempt < retryCount) {
        console.log(`⏳ Retrying in ${delay / 1000} seconds...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
      } else {
        console.error('❌ All MongoDB connection attempts exhausted.');
        console.warn('Tip: Ensure MongoDB Atlas IP Access List allows connections from your current IP (or 0.0.0.0/0).');
        if (process.env.NODE_ENV === 'production') {
          process.exit(1);
        }
      }
    }
  }
};

mongoose.connection.on('connected', () => {
  console.log(`🌿 MongoDB connection active: ${mongoose.connection.name}`);
});

mongoose.connection.on('error', (err) => {
  console.error(`⚠️ MongoDB runtime error: ${err.message}`);
});

mongoose.connection.on('disconnected', () => {
  console.warn('⚠️ MongoDB disconnected.');
});

module.exports = connectDB;
