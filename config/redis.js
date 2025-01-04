const redis = require('redis');
const dotenv = require('dotenv');
dotenv.config();

const redisClient = redis.createClient({ url: process.env.REDIS_URI });

redisClient.on('connect', function() {
  console.log('Redis client connected');
});

redisClient.connect();

module.exports = redisClient;
