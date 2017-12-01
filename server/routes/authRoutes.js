// will hold all routes related to authorization

// this is the ORIGINAL passport npm module; has nothing to do with services/passport.js file
const passport = require('passport');

// note how you don't need parens for the arguments :)
module.exports = app => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  app.get('/auth/google/callback', passport.authenticate('google'));

  app.get('/api/current_user', (req, res) => {
    // test to make sure user is accessible/there
    res.send(req.user);
  })
};


