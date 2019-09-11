'use strict';

const bcrypt = require('bcrypt');

// Create a sign in static that is going to abstact the authentication functionality
module.exports = function(githubID, accessToken) {
  const Model = this;

  return Model.findOne({ githubID })
    .then(user => {
      if (!user) {
        throw new Error('USER_NOT_FOUND');
      } else {
        // const accessTokenMatches = user.accessToken === accessToken;
        // if (!accessTokenMatches) {
        //   throw new Error('GITHUB_ACCESS_TOKEN_DOESNT_MATCH');
        // } else {
          return Promise.resolve(user);
        // }
      }
    })
    .catch(error => {
      console.log('There was an error signing up the user', error);
      return Promise.reject(error);
    });
};
