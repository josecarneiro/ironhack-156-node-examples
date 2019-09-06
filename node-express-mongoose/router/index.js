const express = require('express');

const router = express.Router();

const Movie = require('./../models/movie');

router.get('/', (req, res, next) => {
  // List some movies
  Movie.find()
    .limit(20)
    .then(movieList => {
      const data = {
        // These do the same thing
        // movieList: movieList,
        // This is the ES6 way
        movieList
      };
      res.render('index', data);
    })
    .catch(error => {
      next(error);
    });
});

router.get('/movie/:movieId', (req, res, next) => {
  // Find
  const movieId = req.params.movieId;
  // Movie.findOne({ _id: movieId })
  Movie.findById(movieId)
    .then(movieItem => {
      if (!movieItem) {
        next(new Error('MOVIE_NOT_FOUND'));
      } else {
        const data = {
          movieItem
        };
        res.render('movie', data);
      }
    })
    .catch(error => {
      next(error);
    });
});

router.post('/movie/:movieId', (req, res, next) => {
  const movieId = req.params.movieId;
  const title = req.body.title;
  const director = req.body.director;

  // console.log('Got a post request to movie ' + movieId + title + director);
  // res.send('Edited movie');

  const data = {
    title,
    director
  };

  Movie.update({ _id: movieId }, data)
    .then(movieItem => {
      res.redirect('/movie/' + movieId);
    })
    .catch(error => {
      console.log('Had trouble updating the movie ' + movieId);
    })
});

// router.delete('/movie/:movieId', (req, res, next) => {
router.post('/movie/:movieId/delete', (req, res, next) => {
  console.log('Deleting movie');
  const movieId = req.params.movieId;

  Movie.findByIdAndDelete(movieId)
    .then(() => {
      console.log('Movie ' + movieId + ' was deleted.');
      res.redirect('/');
    })
    .catch(error => {
      console.log('Failed at deleting the movie ' + movieId);
    })
})

module.exports = router;
