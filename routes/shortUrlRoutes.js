const express = require('express');
const { createShortUrl, redirectShortUrl } = require('../controllers/shortUrlController');
const rateLimiter = require('../middlewares/rateLimitMiddleware');
const router = express.Router();

router.post('/shorten', rateLimiter, createShortUrl);
router.get('/shorten/:alias', redirectShortUrl);

module.exports = router;
