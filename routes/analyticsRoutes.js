const express = require('express');
const router = express.Router();

const { getAnalytics } = require('../controllers/analyticsController'); // Only import once
const { getTopicAnalytics } = require('../controllers/analyticsController'); // Import for the topic analytics

router.get('/analytics/:alias', getAnalytics);
router.get('/analytics/topic/:topic', getTopicAnalytics);

module.exports = router;
