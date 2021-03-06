'use strict';

const { Router } = require('express');
const router = Router();
const routeRoleGuardMiddleware = require('./../controllers/route-role-guard-middleware');

router.get('/user', routeRoleGuardMiddleware([ 'user', 'editor', 'admin' ]), (req, res, next) => {
  res.render('restricted', { title: 'This is a user restricted view!' });
});

router.get('/editor', routeRoleGuardMiddleware([ 'editor', 'admin' ]), (req, res, next) => {
  res.render('restricted', { title: 'This is a editor restricted view!' });
});

router.get('/admin', routeRoleGuardMiddleware([ 'admin' ]), (req, res, next) => {
  res.render('restricted', { title: 'This is a admin restricted view!' });
});

router.post('/admin', routeRoleGuardMiddleware([ 'admin' ]), (req, res, next) => {
  res.render('restricted', { title: 'This is a admin restricted view!' });
});

module.exports = router;
