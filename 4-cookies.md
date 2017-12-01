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

