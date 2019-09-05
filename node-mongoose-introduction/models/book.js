const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: String,
  release: Number
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
