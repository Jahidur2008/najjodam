const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema(
  {
    text_bn: {
      type: String,
      required: [true, 'Notice Bengali text is required'],
      trim: true
    },
    isActive: {
      type: Boolean,
      default: true
    },
    priority: {
      type: Number,
      default: 1
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: { createdAt: true, updatedAt: false }
  }
);

noticeSchema.index({ isActive: 1, priority: -1 });

module.exports = mongoose.model('Notice', noticeSchema);
