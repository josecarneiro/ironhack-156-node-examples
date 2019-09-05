const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb://127.0.0.1:27017';
const DATABASE_NAME = 'example';

mongoose.connect(`${ MONGODB_URI }/${ DATABASE_NAME }`, { useNewUrlParser: true })
  .then(message => {
    console.log('Mongoose connected.');
    executeExample();
  })
  .catch(error => {
    console.log('Error connecting to database');
    console.log(error);
  });

const Book = require('./models/book');

function executeExample () {
  const book = new Book({
    title: '1984',
    release: 1947
  });

  book.save()
    .then(() => {
      console.log('Book has been saved!');
      Book.find()
        .then(books => {
          console.log('Loaded all of the books');
          console.log(books);
        })
        .catch(error => {
          console.log('Error loading books');
        });
    })
    .catch(error => {
      console.log('There was an error saving book.');
    });
}
