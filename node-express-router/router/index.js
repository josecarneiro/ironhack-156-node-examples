const express = require('express');

const router = express.Router();


router.get('/', (req, res, next) => {
  res.send('Hello world');
});

router.get('/about', (req, res, next) => {
  res.send('About page');
});

module.exports = router;
