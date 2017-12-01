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

# ********

# BASIC CONCEPTS/THEORY _of_ AUTHENTICATION

<small>from https://www.udemy.com/node-with-react-fullstack-web-development/learn/v4/t/lecture/7603020?start=0</small>

## Why do we care about authentication at all? 

Because we can use it to help solve the following problem:

HTTP is *_stateless_* - Between any two requests me make, HTTP inherently has no way to identify or share information between two separate requests. 

> _If we make one request from the browser to the server and say here's an email and password, later if we were to make a request to get a list of the posts from that same user, the server would have NO IDEA what user to get posts for._

*This is why we use/store tokens in the browser...*

## TOKENS

![Flow with tokens](https://www.dropbox.com/s/fjzhvictsw8qtfj/Screenshot%202017-11-28%2007.04.50.png?raw=1)

**Once you've authenticated, the server can send some uniqure identifying information for that single person (e.g. an access token). The server can take that and send it back  to the browser in the form of a token (better term than cookie).**

A token is your proof that 1 min ago or 5 days ago that I logged into this application, and this token is totally unique to me, the person that made this initial login request. 
* Therefore, in any follow up request that the browser makes to the server, we are going to include that little token that PROVES we are the same person. 
* Server can look up person based on that token and then g et all the information already stored/retrievable for that user.

**Tokens are how we identify ourselves between requests, since HTTP is stateleless.**

In our application we're going to use cookie-based authentication. This means that when we get some initial request to our server, like our Express API, we're gonna say, "hey, please log me in," This could be an email/password, etc., but for us, it's going to be Google OAuth. 

After a user goes through the OAuth process, you aand I are going to generate some identifying piece of information. In the response that we send back to the user for that INITIAL OAuth request, we're going to include what is called a **HEADER** inside of the response that gets sent back to the browser.

The HEADER has a property called `set-cookie` that will be set to some random token.

This token is the user's unique identifier.

When the browsers sees the Header in the response, and sees this `set-cookie` property, the browser _automatically strips off this token and stores it into the browser's memory, and the browser will automatically append that cookie to any follow up request being sent to the server_ 

On a follow up request, server will see that provided cookie, and will be able to say, "hey you're the same as this person."

SUMMARY: The entire idea behind authentication is that we have an identifying piece of information into the user's cookie. _Browsers automatically manage the cookie._ Folow up requests to server, the browser just automatically includes cookie in requests to server, so the server always has that identifying piece of info.

It's pretty sweet all we have to do is use the `set-cookie` property in the header and then we always have it in server requests from that browser, which handles it automatically for us.


-----------------------------------
# 2
# Actual Implementation/Overview of Signing in Users with OAuth

You have to use the Google+ profile ID - email isn't good enough because a user can have multiple email addresses associated with their account. The profile id, however, is unique for a account.

![OAuth Flow](https://www.dropbox.com/s/sq0o21t7qmveb3o/Screenshot%202017-11-28%2010.59.37.png?raw=1)

# With MongoDB
![OAuth, Token, and MongoDB Flow](https://www.dropbox.com/s/n8vkr4udbjtpo85/Screenshot%202017-11-28%2011.01.49.png?raw=1)

![Mongoose.js helps with Express and MongoDB communication](https://www.dropbox.com/s/inazpxjkdlxf2qe/Screenshot%202017-12-01%2011.22.19.png?raw=1)

Mongoose is an optional library whose sole purpose is to make our lives easier when working with MongoDB. It's totally optional in life, it's just easier to use Mongo with this.

### How Mongo stores records
![](https://www.dropbox.com/s/jlquh4df25ccbsx/Screenshot%202017-12-01%2011.23.51.png?raw=1)

* Collections (like a table/model); contains multiple records/documents
* Documents (like a row/record)

Records are all in JSON (e.g. documents)

*MONGODB IS SCHEMA-LESS* THIS MEANS THAT EACH RECORD IN A COLLECTION CAN HAVE IT'S OWN UNIQUE SET OF PROPERTIES. E.G. ONE USER RECORD MIGHT HAVE THE HEIGHT PROPERTY, WHEREAS NO OTHER RECORD HAS THAT. And that's all valid. It's beautiful. 

![example of schema-lessness](https://www.dropbox.com/s/6zjyvyny1t60yhu/Screenshot%202017-12-01%2011.26.30.png?raw=1)

---

## What Mongoose does for us

* Gives us access to Model class and then model instances.
Model Class: Represents a MongoDB Collection.
Model Instance: Represents a MongoDB record (or document)

![JS and Mongo](https://www.dropbox.com/s/fec4edbm07isv9q/Screenshot%202017-12-01%2011.27.54.png?raw=1)
<sup>In the above screenshot, the "JS World" portion is from Mongoose.</sup>

## Set up MongoDB Database + Wire it up w/our Express Application
Our setup:
![Our setup will look like this](https://www.dropbox.com/s/of38iggc58uz1sv/Screenshot%202017-12-01%2011.32.32.png?raw=1)

![](https://www.dropbox.com/s/1avcycdxe7r6xb1/Screenshot%202017-12-01%2011.53.44.png?raw=1)
<sup>The thing we want to accomplish w/our mongo db instance is to store user ids and all their associated data (surveys, posts, etc)</sup>

### Next step: Create model class for user somewhere in our application.
![](https://www.dropbox.com/s/6osxsdsu77y3whw/Screenshot%202017-12-01%2011.57.00.png?raw=1)

1. Create a file for our User class
In our file for our user model class (server/models/User.js), note that we use `const { Schema } = mongoose;`. That is using destructuring, and is prettier, although 100% equivalent to `const Schema = mongoose.Schema;`
**es2015 restructuring** definition: 
- Curly braces mean that hey, this object, mongoose, has a property named `Schema` that we want to reference just as `Schema` (not mongoose.Schema every time) 

Mongoose kind of RE-ADDS schema to mongodb. It requires schema.
// Mongoose DOES require schema to know properties of class ahead of time

From User.js
```js
const userSchema = new Schema({
  googleId: String
});
// Tell mongoose we want to create a new model class called Users, using userSchema
mongoose.model('users', userSchema);
```
2. *REMEMBER THAT JUST CREATING A JS FILE isn't enough to get it executed; you have to require it somehwere to make sure it gets run -- *
In index.js, add `require ('./models/User');`

---
## Next step: Create a new user in the application
The best place will be in that callback that gets called when authentication via google response is successful; (see services/passport.js) - that response contains the data we need (the unique google id/profiel id) to create our new record.

**When you need to use Mongoose classes in your application, you do NOT use require and export statements (like you'd usually do) bc multiple times can confuse Mongoose in testing environments:
### To get a model from mongoose in a file:
`const mongoose = require('mongoose');`
`const User = mongoose.model('users');`
---

ANYTIME YOU QUERY YOUR DB, REMEMBER YOU'RE INITIATING AN ASYNCHRONOUS ACTION. 
E.G. User.findOne({ googleId: profile.id })
YOU CAN'T put
const User = User.findOne({ googleId: profile.id }) because an obj isn't returned, but RATHER A PROMISE!!!

```js
// first check if user exists already by querying Mongoose
passport.use(
  new GoogleStrategy(
    {clientID: keys.googleClientID, clientSecret: keys.googleClientSecret, callbackURL: '/auth/google/callback'},
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id }) // this returns a promise, not an object
        .then((existingUser) => { // handle promise
          if (existingUser) {
            // we already have a record w/given google profile id
          } else {
            // if not, create new record
            new User({ googleId: profile.id }).save();
          }
        })
    }
  )
);
```

### Next step: Tell passport we're done w/our junk and it can resume the authentication process.

**Call `done` with user that was created or found.**
![We need to do one last step in this function- done](https://www.dropbox.com/s/i3gn49mzsu1hkre/Screenshot%202017-12-01%2012.46.24.png?raw=1)

2 arguments must be provided with done: error message & object (response?):
Now our code looks like:
```js
passport.use(
  new GoogleStrategy(
    {clientID: keys.googleClientID, clientSecret: keys.googleClientSecret, callbackURL: '/auth/google/callback'},
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id })
        .then((existingUser) => {
          if (existingUser) {
            // done expects 2 arguments: error and object/response i think
            done(null, existingUser);
          } else {
            // if not, create new record
            new User({ googleId: profile.id })
              .save()
              .then(newUser => done(null, newUser));
          }
        })
    }
  )
);
```

# Next step: Get the cookie working
Lecture: https://www.udemy.com/node-with-react-fullstack-web-development/learn/v4/t/lecture/7603042?start=0

What our code needs to do: 
![More detailed flow](https://www.dropbox.com/s/tk298yhdiiry8xb/Screenshot%202017-12-01%2013.14.49.png?raw=1)

Looking at our one user record in mongodb:
```
{
    "_id": {
        "$oid": "5a21a70a5f8f8b55162ca1df"
    },
    "googleId": "110893641563779658181",
    "__v": 0
}
```
The `_id` is a unique id auto-generated by mongo. Anytie you call `.id` on a record, you're getting this _id value.

Lecture: https://www.udemy.com/node-with-react-fullstack-web-development/learn/v4/t/lecture/7603046?start=0

```js
// take a user instance and return piece of identifying information
passport.serializeUser((user, done) => {
  // use the record's auto generated id (not the profile id)
  done(null, user.id);
});

// take a piece of identifying information and return a user instance
passport.deserializeUser((userId, done) => {
  User.findById(userId)
    // use .then for working w/promise obj
    .then(user => {
      done(null, user);
    });
});
```

Out of the box, express has no idea  how to handle cookies, so we need to install a helper library called Cookie Session. 
`npm install --save cookie-session`

### Where are we now?
Lecture: https://www.udemy.com/node-with-react-fullstack-web-development/learn/v4/t/lecture/7603048?start=0

![](https://www.dropbox.com/s/kcoyi28jt4tusfo/Screenshot%202017-12-01%2014.03.32.png?raw=1)
"req" is short for request object.



