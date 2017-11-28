const express = require('express');

// passport file just has to run, not return anything, so we don't need to assign it to an object here, we can just require the file.
require('./services/passport');

// this has to be accessible in the authRoutes file, so...
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
