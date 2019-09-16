'use strict';

const { Router } = require('express');
const router = Router();

const Restaurant = require('./../models/restaurant');

router.get('/', (req, res, next) => {
  Restaurant.find({
    location: {
      $near: {
        $geometry: {
           type: "Point" ,
           coordinates: [ -9, 38 ]
        },
        $maxDistance: 100 * 1000,
        $minDistance: 50 * 1000
      }
    }
  })
    .then(restaurants => {
      res.render('index', { restaurants });
    })
    .catch(error => {
      console.log(error);
      next(error);
    });
});

module.exports = router;
