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
      User.findOne({ googleId: profile.id })
        .then((existingUser) => {
          if (existingUser) {
            // done expects and error thing as 1st, then an object for response
            done(null, existingUser);
          } else {
            new User({ googleId: profile.id })
              .save()
              .then(newUser => done(null, newUser));
          }
        })
    }
  )
);
