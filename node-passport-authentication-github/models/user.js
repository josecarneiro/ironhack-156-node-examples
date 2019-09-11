'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    unique: true
  },
  name: {
    type: String,
    trim: true
  },
  githubID: {
    type: String,
    required: true
  },
  githubToken: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    enum: [ 'user', 'editor', 'admin' ],
    default: 'user'
  }
});

const signInStatic = require('./user-sign-in-static');
const signUpStatic = require('./user-sign-up-static');

schema.statics.signIn = signInStatic;
schema.statics.signUp = signUpStatic;

schema.statics.findByEmail = function(email) {
  const Model = this;
  return Model.findOne({ email })
    .then(user => {
      return Promise.resolve(user);
    })
    .catch(error => {
      return Promise.reject(error);
    });
};

const User = mongoose.model('User', schema);

module.exports = User;

// Built in statics
// User.find()
// User.findOne()
// User.findOneAndUpdate()
// User.findOneAndUpdate()
// User.findById()

// We can define our own custom statis
// User.findByEmail()
