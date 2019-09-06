const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
    required: true
  },
  body: {
    type: String,
    required: true
  },
  rate: {
    type: Number,
    min: 0,
    max: 10,
    required: true
  }
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
