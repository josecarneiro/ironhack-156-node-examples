'use strict';

const { Router } = require('express');
const router = Router();

router.get('/sign-up', (req, res, next) => {
  res.render('sign-up');
});

router.post('/sign-up', (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log(email, password);
  res.redirect('private');
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
