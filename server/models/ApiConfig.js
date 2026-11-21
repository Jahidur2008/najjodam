const mongoose = require('mongoose');

const apiConfigSchema = new mongoose.Schema(
  {
    providerName: {
      type: String,
      required: [true, 'Provider name is required'],
      trim: true
    },
    apiUrl: {
      type: String,
      required: [true, 'API URL is required'],
      trim: true
    },
    apiKey: {
      type: String,
      default: '',
      trim: true
    },
    headers: {
      type: mongoose.Schema.Types.Mixed,
      default: {}
    },
    fieldMapping: {
      type: mongoose.Schema.Types.Mixed,
      default: {}
    },
    syncIntervalMinutes: {
      type: Number,
      default: 60,
      min: 1
    },
    isActive: {
      type: Boolean,
      default: true
    },
    lastSyncAt: {
      type: Date,
      default: null
    },
    lastSyncStatus: {
      type: String,
      enum: ['IDLE', 'RUNNING', 'SUCCESS', 'FAILED'],
      default: 'IDLE'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('ApiConfig', apiConfigSchema);
