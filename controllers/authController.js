const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const googleAuthCallback = async (req, res) => {
  const { googleId, email } = req.user;
  let user = await User.findOne({ googleId });
  if (!user) {
    user = new User({ googleId, email });
    await user.save();
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
};

module.exports = { googleAuthCallback };
