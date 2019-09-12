'use strict';

const { Router } = require('express');
const router = Router();

// The following is "pseudo-code" using undefined models
// it will not work

const Beach = require('./../models/beach');

router.get('/beach/list', (req, res, next) => {
  Beach.find()
    .then(beaches => {
      res.json({
        type: 'success',
        data: {
          beaches
        }
      });
    })
    .catch(error => {
      res.json({
        type: 'error',
        error: { message: error.message }
      });
    });
});

router.get('/beach/:id', (req, res, next) => {
  const id = req.params.id;
  Beach.findById(id)
    .then(beach => {
      res.json({
        type: 'success',
        data: {
          beach
        }
      });
    })
    .catch(error => {
      res.json({
        type: 'error',
        error: { message: error.message }
      });
    });
});

// Get a pokemon from the pokeapi before sending it to the user
const axios = require('axios');

router.get('/pokemon/:id', (req, res, next) => {
  const id = req.params.id;
  axios.get(`https://pokeapi.co/api/v2/pokemon/${ id }`)
    .then(response => {
      const pokemon = response.data;
      res.json({
        type: 'success',
        data: {
          pokemon
        }
      });
    })
    .catch(error => {
      res.json({
        type: 'error',
        error: { message: error.message }
      });
    });
  // Beach.findById(id)
  //   .then(beach => {
  //     res.json({
  //       type: 'success',
  //       data: {
  //         beach
  //       }
  //     });
  //   })
  //   .catch(error => {
  //     res.json({
  //       type: 'error',
  //       error: { message: error.message }
  //     });
  //   });
});

module.exports = router;
