const express = require('express');
const passport = require('passport');
const { googleAuthCallback } = require('../controllers/authController');
const router = express.Router();

router.post('/signup', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/callback', passport.authenticate('google', { failureRedirect: '/' }), googleAuthCallback);

module.exports = router;
