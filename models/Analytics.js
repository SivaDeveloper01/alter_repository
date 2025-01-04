const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
  urlAlias: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  timestamp: { type: Date, default: Date.now },
  os: String,
  device: String,
  ip: String,
  geolocation: Object,
});

module.exports = mongoose.model('Analytics', analyticsSchema);
