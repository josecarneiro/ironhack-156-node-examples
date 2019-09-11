'use strict';

const bcrypt = require('bcrypt');

// Create a sign in static that is going to abstact the authentication functionality
module.exports = function(profile, email, accessToken) {
  const Model = this;

  return Model.findByEmail(email)
    .then(user => {
      if (user) {
        throw new Error('USER_ALREADY_EXISTS');
      } else {
        return Model.create({
          email,
          name: profile.displayName,
          githubID: profile.id,
          githubToken: accessToken
        });
      }
    })
    .then(user => {
      return Promise.resolve(user);
    })
    .catch(error => {
      console.log(error);
      return Promise.reject(new Error('There was an error in the sign up process.'));
    });
};
