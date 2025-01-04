const mongoose = require('mongoose');

const shortUrlSchema = new mongoose.Schema({
  alias: { type: String, required: true, unique: true },
  longUrl: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  topic: { type: String, enum: ['acquisition', 'activation', 'retention'] },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('ShortUrl', shortUrlSchema);
