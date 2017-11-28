// should really only contain business logic & helper modules

const express = require('express');
// passport file just has to run, not return anything, so we don't need to assign it to an object here, we can just require the file.
// const passportConfig = require('./services/passport');
require('./services/passport');

// this will
const authRoutes = require('./routes/authRoutes');

// this has to be accessible in the authRoutes file, so...
const app = express();

// here is how we pass app object to authRoutes. In the authRoutes file, we put the two get requests in an arrow function that gets exported, so the routes are registered/exist
authRoutes(app);



const PORT = process.env.PORT || 5000;

app.listen(PORT);
