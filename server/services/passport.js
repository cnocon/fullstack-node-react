// for passportjs configuration stuff
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      console.log('\naccessToken:');
      console.log(accessToken);
      console.log('\nrefreshToken:');
      console.log(refreshToken);
      console.log('\nprofile:');
      console.log(profile);
    }
  )
);
