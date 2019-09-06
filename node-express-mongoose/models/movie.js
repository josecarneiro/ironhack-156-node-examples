const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  year: {
    type: String
  },
  director: {
    type: String
  },
  duration: {
    type: String
  },
  genre: [
    {
      type: String
    }
  ],
  rate: {
    type: String
  }
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;

/*
  _id: ObjectID(5d6e71e5921c874dfe6fa6e4)
 title: "The Dark Knight"
 year: "2008"
 director: "Francis Ford Coppola"
 duration: "2h 32min"
 genre: [
   "Action"
  "Crime"
  "Drama"
  "Thriller"
],
 rate : "5.5"
*/