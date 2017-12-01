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
