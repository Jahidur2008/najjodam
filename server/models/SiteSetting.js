const mongoose = require('mongoose');

const siteSettingSchema = new mongoose.Schema(
  {
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
    settings = await this.create({ isAdminRegistrationOpen: false });
  }
  return settings;
};

module.exports = mongoose.model('SiteSetting', siteSettingSchema);
