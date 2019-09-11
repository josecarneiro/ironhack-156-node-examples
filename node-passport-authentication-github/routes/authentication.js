'use strict';

const { Router } = require('express');
const router = Router();
const passport = require('passport');
const routeGuardMiddleware = require('./../controllers/route-guard-middleware');

router.get('/github', passport.authenticate('github', {
  failureRedirect: '/',
  successRedirect: '/authentication/private'
}));

router.get('/github-authorization', passport.authenticate('github', {
  failureRedirect: '/',
  successRedirect: '/authentication/private'
}));

/*
router.get('/sign-up', (req, res, next) => {
  res.render('sign-up');
});

router.post('/sign-up', passport.authenticate('sign-up', {
  successRedirect: "/authentication/private",
  failureRedirect: "/authentication/sign-up"
}));

router.get('/sign-in', (req, res, next) => {
  res.render('sign-in');
});

router.post('/sign-in', passport.authenticate('sign-in', {
  successRedirect: "/authentication/private",
  failureRedirect: "/authentication/sign-in"
}));
*/

router.get('/private', routeGuardMiddleware, (req, res, next) => {
  res.render('private');
});

router.post('/sign-out', (req, res, next) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
