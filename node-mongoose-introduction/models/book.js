const mongoose = require('mongoose');

// const bookSchema = new mongoose.Schema({
//   title: String,
//   release: Number
// });

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: 3,
    maxlength: 20,
    lowercase: true,
    // uppercase: true,
    required: true,
    enum: [ '1984', 'Hello World' ],
    validate: (value) => {
      const swearWords = [
        'potato',
        'carrot',
        'cheese'
      ];
      return !swearWords.includes(value);
    }
  },
  release: {
    type: Number,
    min: 1800,
    max: 2020,
    default: 2000
  },
  dateCreated: {
    type: Date,
    default: Date.now
  }
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
