const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require ('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

// tell app to use cookies
app.use(
  // 2 args: maxAge: how long before expiring in milliseconds (we use 30 days), keys for encrypting cookie
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieEncryptionKey]
  })
);

// tell pasport to make use of cookies to handle authentication
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT);
