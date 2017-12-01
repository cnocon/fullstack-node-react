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
      // first check if user exists already by querying Mongoose
      User.findOne({ googleId: profile.id }) // this returns a promise, not an object
        .then((existingUser) => { // handle promise
          if (existingUser) {
            // we already have a record w/given google profile id
            console.log('already have this guy');
          } else {
            // if not, create new record
            new User({ googleId: profile.id }).save();
          }
        })
    }
  )
);
