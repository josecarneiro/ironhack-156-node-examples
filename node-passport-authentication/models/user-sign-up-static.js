'use strict';

const bcrypt = require('bcrypt');

// Create a sign in static that is going to abstact the authentication functionality
module.exports = function(email, password) {
  const Model = this;

  return bcrypt.hash(password, 10)
    .then(hash => {
      return Model.create({
        email,
        passwordHash: hash
      });
    })
    .then(user => {
      return Promise.resolve(user);
    })
    .catch(error => {
      console.log(error);
      return Promise.reject(new Error('There was an error in the sign up process.'));
    });
};