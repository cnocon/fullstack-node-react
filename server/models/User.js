const mongoose = require('mongoose');
const { Schema } = mongoose;

// Mongoose DOES require schema to know properties of class ahead of time
const userSchema = new Schema({
  googleId: String
});

// Tell mongoose we want to create a new model class called Users, using userSchema
mongoose.model('users', userSchema);
