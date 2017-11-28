const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
// you don't have to add .js extension if it's a js file
const keys = require('./config/keys');

const app = express();

passport.use(
  new GoogleStrategy(
  {
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
  },
  accessToken => {
    console.log(accessToken);
  }
));

// route to initialize oauth process
// as second arg, tell flow to use passport to kick of authentication flow
// the 'google' string is something built in to passport strategy, which is a little confusing bc it isn't intuitive where it came from
// scope is what info/access we want for that user's profile
app.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
