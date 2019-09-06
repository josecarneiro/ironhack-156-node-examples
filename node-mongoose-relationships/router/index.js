const express = require('express');

const router = express.Router();

const Movie = require('./../models/movie');
const Review = require('./../models/review');

router.get('/', (req, res, next) => {
  Movie.find()
    .limit(20)
    .then(movieList => {
      const data = {
        movieList
      };
      res.render('index', data);
    })
    .catch(error => {
      next(error);
    });
});

router.get('/movie/:movieId', (req, res, next) => {
  const movieId = req.params.movieId;
  Movie.findById(movieId)
    .then(movieItem => {
      if (!movieItem) {
        next(new Error('MOVIE_NOT_FOUND'));
      } else {
        // We will load all reviews and pass them to view along with movie
        Review.find({ movieId })
          .then(reviews => {
            const data = {
              movieItem,
              reviews
            };
            res.render('movie', data);
          })
          .catch((error) => {
            next(error);
          });
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

router.post('/movie/:movieId/delete', (req, res, next) => {
  const movieId = req.params.movieId;
  Movie.findByIdAndDelete(movieId)
    .then(() => {
      console.log('Movie ' + movieId + ' was deleted.');
      res.redirect('/');
    })
    .catch(error => {
      console.log('Failed at deleting the movie ' + movieId);
    })
});

router.post('/movie/:movieId/review', (req, res, next) => {
  const movieId = req.params.movieId;
  const body = req.body.body;
  const rate = req.body.rate;
  console.log(movieId, body, rate);
  Review.create({
    movieId,
    body,
    rate
  })
    .then(() => {
      console.log('I created my review.');
      res.redirect('/movie/' + movieId);
    })
    .catch(error => {
      console.log('There was an error creating review');
    })
});

router.get('/review/:reviewId', (req, res, next) => {
  const reviewId = req.params.reviewId;

  Review.findById(reviewId)
    .populate('movieId')
    .then(review => {
      const data = {
        review: review
      };
      res.render('review', data);
    })
    .catch(error => {
      console.log('There was an error loading review');
    })
});

module.exports = router;
