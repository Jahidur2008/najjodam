const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name_bn: {
      type: String,
      required: [true, 'Product Bengali name is required'],
      trim: true
    },
    name_en: {
      type: String,
      required: [true, 'Product English name is required'],
      trim: true
    },
    category_bn: {
      type: String,
      required: [true, 'Category Bengali name is required'],
      trim: true
    },
    category_en: {
      type: String,
      required: [true, 'Category English name is required'],
      trim: true
    },
    subCategory_bn: {
      type: String,
      trim: true,
      default: ''
    },
    unit_bn: {
      type: String,
      required: [true, 'Unit in Bengali is required'],
      enum: {
        values: ['কেজি', 'হালি', 'ডজন', 'লিটার', 'পিস', 'আঁটি'],
        message: '{VALUE} is not a supported Bengali unit'
      }
    },
    maundMultiplier: {
      type: Number,
      default: 0,
      description: 'Multiplier for maund (১ মন = ৪০ কেজি). Typically 40 for kg items, 0 for non-kg items'
    },
    image_url: {
      type: String,
      default: ''
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

productSchema.index({ category_en: 1, isActive: 1 });
productSchema.index({ name_bn: 'text', name_en: 'text' });

module.exports = mongoose.model('Product', productSchema);
