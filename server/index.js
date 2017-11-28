const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./config/keys');

const app = express();

/**
  * Handle Actual Profile & Email Data with callback route.
  *
  * At this point (the callback), we've redirected our user to Google,
    user has granted us permission, we got sent back to localhost:5000/auth/google/callback, and the passport strategy saw the 'code' inside the url and automatically did a follow-up request over to google to exchange that code with the user's actual profile & email address.
  * After that follow up request is made, the callback function (the
    arrow function below), was executed. So now, instead of console log-ing the access token, we need to handle the actual information we received.
  */

// allow passport to handle callback (with the special code) and grab the user's profile info and email; we need to edit the callback to actually do something with the successful response, not just console.log-ing the accessToken like we did before
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      /* the accessToken is something we can re-use whenever we want to get information from google on that info again; it's saying, 'hey google, this person gave us access already, we don't have to do that again.*/
      console.log('\naccessToken:');
      console.log(accessToken);
      /* the refresh token allows us to refresh the access token, since the access token automatically expires after a certain amount of time. the refresh  token will automatically update the access token WITHOUT making them authenticate again...
      */
      console.log('\nrefreshToken:');
      console.log(refreshToken);

      /* all the info we want! yay. what we care about */
      console.log('\nprofile:');
      console.log(profile);
/**
  * looks like:

accessToken:
ya29.GlsSBVfmXp_NjXMDqNDfNEmFDCqUN5hxFa7QBelHUQ6XgAMOVgcRwXm4OE3RXdG45wNtykkbcEipqJG6E0c7TV5QHqczLYFaIRkhth_r9a_BmphIrSS7MmywqCBa

refreshToken:
undefined

// IF I'D LOGGED profile._json this is the body of that (it's just easier to read)
profile:
{ kind: 'plus#person',
  etag: '"ucaTEV-ZanNH5M3SCxYRM0QRw2Y/mRDdrASMVltjX8qaHcnWC3sriKI"',
  emails: [ { value: 'cristin@cristin.io', type: 'account' } ],
  objectType: 'person',
  id: '103791319084552937310',
  displayName: 'Cristin O\'Connor',
  name: { familyName: 'O\'Connor', givenName: 'Cristin' },
  url: 'https://plus.google.com/103791319084552937310',
  image:
   { url: 'https://lh3.googleusercontent.com/-GWZfArEguT8/AAAAAAAAAAI/AAAAAAAABA4/CHQe0LROoDM/photo.jpg?sz=50',
     isDefault: false },
  isPlusUser: true,
  language: 'en',
  circledByCount: 0,
  verified: false,
  cover:
   { layout: 'banner',
     coverPhoto:
      { url: 'https://lh3.googleusercontent.com/y8-vazKSTJo5kNpO4ipiU4ekGpNeSs2Pxms38uCX_yO_T7Jwar7MPAPWOJtGqzbdrYHTtrE2j_5T=s630-fcrop64=1,00000000ffffffff',
        height: 528,
        width: 940 },
     coverInfo: { topImageOffset: 0, leftImageOffset: 0 } },
  domain: 'cristin.io' }
*/
    }
  )
);

app.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
);


app.get('/auth/google/callback', passport.authenticate('google'));

const PORT = process.env.PORT || 5000;

app.listen(PORT);


