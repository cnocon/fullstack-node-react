const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
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

app.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
);

// now we need to add a route handler that takes the code from the response from Google when a user grants permission to our app. The user details don't get returned from google UNTIL AFTER WE MAKE A NEW REQUEST WITH THIS SPECIAL CODE.
// the google passport strategy can handle all that for us
/* all this really does is grab the user profile info; we aren't doing anything other than hanging on that step*/
app.get('/auth/google/callback', passport.authenticate('google'));

const PORT = process.env.PORT || 5000;

app.listen(PORT);
