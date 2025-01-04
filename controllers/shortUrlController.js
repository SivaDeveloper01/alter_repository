const ShortUrl = require('../models/ShortUrl');
const redisClient = require('../config/redis');
const analyticsService = require('../services/analyticsService');
const  { nanoid }  = require('nanoid');

const createShortUrl = async (req, res) => {
  const { longUrl, customAlias, topic } = req.body;
  const alias = customAlias || nanoid(7);

  let shortUrl = await ShortUrl.findOne({ alias });
  if (shortUrl) return res.status(400).json({ error: 'Alias already exists' });

  shortUrl = new ShortUrl({ alias, longUrl, userId: req.user._id, topic });
  await shortUrl.save();

  redisClient.set(alias, longUrl);
  res.json({ shortUrl: `http://localhost:3000/api/shorten/${alias}`, createdAt: shortUrl.createdAt });
};

const redirectShortUrl = async (req, res) => {
  const alias = req.params.alias;
  const longUrl = await redisClient.get(alias) || await ShortUrl.findOne({ alias }).exec();

  if (!longUrl) return res.status(404).json({ error: 'Short URL not found' });

  await analyticsService.logAnalytics(req, alias);
  res.redirect(longUrl);
};

module.exports = { createShortUrl, redirectShortUrl };
