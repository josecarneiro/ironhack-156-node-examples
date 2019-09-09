'use strict';

const { Router } = require('express');
const router = Router();

router.get('/sign-up', (req, res, next) => {
  res.render('sign-up');
});

const User = require('./../models/user');

const bcrypt = require('bcrypt');

router.post('/sign-up', (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  bcrypt.hash(password, 10)
    .then(hash => {
      return User.create({
        email,
        passwordHash: hash
      });
    })
    .then(user => {
      // console.log('Signed up user', user);
      res.redirect('/authentication/private');
    })
    .catch(error => {
      console.log('There was an error in the sign up process.');
    });
});

router.get('/sign-in', (req, res, next) => {
  res.render('sign-in');
});

router.post('/sign-in', (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log(email, password);
  res.redirect('private');
});

router.get('/private', (req, res, next) => {
  res.render('private');
});

module.exports = router;
