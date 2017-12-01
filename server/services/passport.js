// for passportjs configuration stuff
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users'); // DON'T USE REQUIRE STATEMENTS W/MONGOOSE

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      // profile is obj with `id` we will use
      // this creates a record but doesn't persist it to the db; to actually save it, we have to call `.save`
      new User({ googleId: profile.id }).save();
    }
  )
);
