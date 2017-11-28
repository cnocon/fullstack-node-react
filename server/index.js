const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const app = express();

// CREATES A NEW INSTANCE OF GOOGLE PASSPORT STRATEGY
/*passport.use is saying "passport, I want you to be aware there is a new strategy available; please make use of it so users can use strategy to authenticate in our application"
// we'll pass in config for how to authenticate users in our application: info for Google to identify where the user is coming from using a ClientID and ClientSecret*/
/* clientID: a public token (anybody can have this, it's ok)
  clientSecret: a private token; it needs to be secure. DO NOT SHARE. */

/**
  * CREATE OAUTH PROJECT IN GOOGLE DEVELOPER CONSOLE:
  * https://console.developers.google.com/ (must use cristinjaneo@gmail.com account,
    not cristin.io)
 */

passport.use(new GoogleStrategy());



const PORT = process.env.PORT || 5000;
app.listen(PORT);
