const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User'); // Assuming you have a User model to store user data

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID, // Google OAuth client ID from your environment variables
  clientSecret: process.env.GOOGLE_CLIENT_SECRET, // Google OAuth client secret
  callbackURL: process.env.GOOGLE_CALLBACK_URL || "http://localhost:3000/auth/google/callback" // Callback URL
},
async (accessToken, refreshToken, profile, done) => {
  try {
    // Find or create the user in your database
    let user = await User.findOne({ googleId: profile.id });

    if (!user) {
      // If user doesn't exist, create a new user
      user = new User({
        googleId: profile.id,
        displayName: profile.displayName,
        email: profile.emails[0].value
      });
      await user.save();
    }

    return done(null, user);
  } catch (error) {
    return done(error);
  }
}));

// Serialize user information into the session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user information from the session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});
