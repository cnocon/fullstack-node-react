const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
require ('./models/User');  // put this before services/passport bc passport.js uses it and you'll get error startign server otherwise
require('./services/passport');

// instruct mongoose to attempt to connect to the copy of mongodb we provisioned remotely
mongoose.connect(keys.mongoURI);

const app = express();

/**
  * Cool refactor!
  *
  * 1. When we require the authRoutes file, it returns a FUNCTION because that's what we exported from that file!
  * 2. So what we did was immediately call the function returned from the require with the proper argument, `app`, for that function. Awesome.
  */
require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT);
