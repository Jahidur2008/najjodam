const mongoose = require('mongoose');

const siteSettingSchema = new mongoose.Schema(
  {
    logoUrl: {
      type: String,
      default: '/images/najjo-dam-logo.svg'
    },
    faviconUrl: {
      type: String,
      default: '/images/najjo-dam-favicon.svg'
    },
    isAdminRegistrationOpen: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

// Static helper to get or create the singleton settings document
siteSettingSchema.statics.getSettings = async function () {
  let settings = await this.findOne();
  if (!settings) {
    settings = await this.create({
      logoUrl: '/images/najjo-dam-logo.svg',
      faviconUrl: '/images/najjo-dam-favicon.svg',
      isAdminRegistrationOpen: false
    });
  } else {
    // Backwards compatibility if fields were missing in existing DB record
    let modified = false;
    if (!settings.logoUrl) {
      settings.logoUrl = '/images/najjo-dam-logo.svg';
      modified = true;
    }
    if (!settings.faviconUrl) {
      settings.faviconUrl = '/images/najjo-dam-favicon.svg';
      modified = true;
    }
    if (modified) {
      await settings.save();
    }
  }
  return settings;
};

module.exports = mongoose.model('SiteSetting', siteSettingSchema);
