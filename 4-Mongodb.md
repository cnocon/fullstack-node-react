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
