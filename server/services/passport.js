// for passportjs configuration stuff
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

// serializeUser is for cookies in Passport; we send it our user object, and done callback for after we've turned the user instance into an id
passport.serializeUser((user, done) => {
  // we tell passport what to use as the identifying info
  // user.id references the Mongo auto-generated unique id.
  done(null, user.id);
});

// first arg is token stuffed into cookie (the unique identifier we gave it), and 2nd arg is done function for calling after we've turned id back into user instance.
passport.deserializeUser((userId, done) => {
  // find user & return done w/that user
  User.findById(userId)
    // these queries are always asynchronous so you have to use .then to work with the promise
    .then(user => {
      //done always takes error obj, then object
      done(null, user);
    });
});

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
