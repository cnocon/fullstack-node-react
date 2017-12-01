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

  app.get('/api/logout', (req, res) => {
    // use built in logout function by Passport to kill user identification stuff from session;
    req.logout();
    // return the user that was just signed out (it should be EMPTY because this user is destroyed, so that's good)
    res.send(req.user);
  });

  // test to make sure user is accessible/there in session
  app.get('/api/current_user', (req, res) => {

    res.send(req.user);
  })
};


