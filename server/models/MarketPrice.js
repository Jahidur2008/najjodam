const mongoose = require('mongoose');

const marketPriceSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: [true, 'Product reference is required']
    },
    division_bn: {
      type: String,
      required: [true, 'Division Bengali name is required'],
      trim: true
    },
    division_en: {
      type: String,
      required: [true, 'Division English name is required'],
      trim: true
    },
    district_bn: {
      type: String,
      required: [true, 'District Bengali name is required'],
      trim: true
    },
    district_en: {
      type: String,
      required: [true, 'District English name is required'],
      trim: true
    },
    upazila_bn: {
      type: String,
      default: '',
      trim: true
    },
    upazila_en: {
      type: String,
      default: '',
      trim: true
    },
    wholesale_price_min: {
      type: Number,
      required: [true, 'Wholesale min price is required'],
      min: 0
    },
    wholesale_price_max: {
      type: Number,
      required: [true, 'Wholesale max price is required'],
      min: 0
    },
    retail_price_min: {
      type: Number,
      required: [true, 'Retail min price is required'],
      min: 0
    },
    retail_price_max: {
      type: Number,
      required: [true, 'Retail max price is required'],
      min: 0
    },
    previous_wholesale_avg: {
      type: Number,
      default: 0,
      min: 0
    },
    source: {
      type: String,
      enum: ['EXTERNAL_API', 'MANUAL_ADMIN'],
      default: 'MANUAL_ADMIN'
    },
    isManualOverride: {
      type: Boolean,
      default: false
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

// Compound indexes for rapid geospatial filtering and lookup
marketPriceSchema.index(
  { division_en: 1, district_en: 1, upazila_en: 1, product: 1 },
  { unique: true }
);

marketPriceSchema.index({ district_en: 1, product: 1 });
marketPriceSchema.index({ product: 1 });

// Virtuals for derived fields
marketPriceSchema.virtual('wholesale_avg').get(function () {
  return (this.wholesale_price_min + this.wholesale_price_max) / 2;
});

marketPriceSchema.virtual('retail_avg').get(function () {
  return (this.retail_price_min + this.retail_price_max) / 2;
});

marketPriceSchema.virtual('price_trend').get(function () {
  if (!this.previous_wholesale_avg || this.previous_wholesale_avg === 0) return 'STABLE';
  const currentAvg = (this.wholesale_price_min + this.wholesale_price_max) / 2;
  const diff = currentAvg - this.previous_wholesale_avg;
  const percentChange = (diff / this.previous_wholesale_avg) * 100;
  if (percentChange > 1.0) return 'UP';
  if (percentChange < -1.0) return 'DOWN';
  return 'STABLE';
});

marketPriceSchema.set('toJSON', { virtuals: true });
marketPriceSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('MarketPrice', marketPriceSchema);
