For video & lectures, see https://www.udemy.com/node-with-react-fullstack-web-development/learn/v4/t/lecture/7593702?start=0.

Entirely server side feature.

Everything we do in this step is 100% transferrable to any project you work on yourself.           

## OAuth Flow for Google OAuth (we'll be using PassportJS to make this easier)
![OAuth Flow](https://www.dropbox.com/s/flipipjx0w0njni/Screenshot%202017-11-28%2004.03.04.png?raw=1)

_Passport JS will help us a lot:_
![What Passport handles](https://www.dropbox.com/s/jkuij0tffi6048m/Screenshot%202017-11-28%2004.20.04.png?raw=1)

*1) User clicks "Login"*
1. [CLIENT] Direct to localhost:5000/auth/google 
2. [SERVER][PASSPORT] Forward user's request to Google google.com/auth?appid=<APPID>
3. [GOOGLE][PASSPORT] Ask user if they grant permission
4. [GOOGLE][PASSPORT] User grants permission, direct to localhost:5000/auth/google/callback?code=450
5. [SERVER][PASSPORT] Put user on hold, take the 'code' from the URL
6. [SERVER][PASSPORT] Send REQUEST to google with 'code' included (THE CODE IS SUPER IMPORTANT)
  I.[GOOGLE][PASSPORT] Google sees 'code' in URL, replies with RESPONSE containing details about user
7. [SERVER] Get user details from response in 6I and create new record in the database.
8. [SERVER] Set user ID in cookie for this user
9. [SERVER] Kick user back to localhost:5000
10. [CLIENT] LOGGED IN!

POINTS OF CONFUSION W/PASSPORT:
1. Passport helps automate OAuth flow, but it requires us to reach in to very specific points in the flow, and add some code to make steps work nicely. So it can't automate everything, which is problematic because the big picture isn't really easy to understand.
2. Inherent confusion in how the library is strucured. In reality, when we make use of passport, we're actually installing at least two different libraries: Passport & Passport Strategy.
** _Passport_ is for general helpers for handling auth in Express apps.
** _Passport Strategy_ is for helpers for authenticating with one very specific method (email/password, Google, Facebook, Twitter, etc.)

```js
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
  etag: '"<SOME_ETAG>"',
  emails: [ { value: 'cristin@cristin.io', type: 'account' } ],
  objectType: 'person',
  id: '<SOME_PROFILE_ID>',
  displayName: 'Cristin O\'Connor',
  name: { familyName: 'O\'Connor', givenName: 'Cristin' },
  url: 'https://plus.google.com/<SOME_PROFILE_ID>',
  image:
   { url: '<SOME_IMAGE_URL>',
     isDefault: false },
  isPlusUser: true,
  language: 'en',
  circledByCount: 0,
  verified: false,
  cover:
   { layout: 'banner',
     coverPhoto:
      { url: '<SOME_PHOTO_URL>',
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
```
