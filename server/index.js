const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const app = express();

// creates a new instance of Google Passport Strategy
// passport.use is saying "passport, I want you to be aware there is a new strategy available; please make use of it so users can use strategy to authenticate in our application"
// we'll pass in config for how to authenticate users in our application
passport.use(new GoogleStrategy());


const PORT = process.env.PORT || 5000;
app.listen(PORT);
