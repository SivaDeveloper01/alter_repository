const Analytics = require('../models/Analytics');
const geoip = require('geoip-lite');

const logAnalytics = async (req, alias) => {
  const ip = req.ip;
  const geo = geoip.lookup(ip);
  const device = req.get('user-agent');
  const os = device.includes('Windows') ? 'Windows' : 'Other'; // Simplified

  const analytics = new Analytics({ urlAlias: alias, userId: req.user._id, ip, geolocation: geo, os, device });
  await analytics.save();
};

module.exports = { logAnalytics };
