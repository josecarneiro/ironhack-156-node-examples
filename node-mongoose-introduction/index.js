const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb://127.0.0.1:27017';
const DATABASE_NAME = 'example';

mongoose.connect(`${ MONGODB_URI }/${ DATABASE_NAME }`, { useNewUrlParser: true })
  .then(message => {
    console.log('Mongoose connected.');
    // createAndListBooks();
    // loadSingleItem();
    alternativeDocumentCreation();
  })
  .catch(error => {
    console.log('Error connecting to database');
    console.log(error);
  });

const Book = require('./models/book');

function createAndListBooks () {
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

function loadSingleItem () {
  // Book.findOne({ _id: '5d7127d451713e5f0ce33dac' })
  Book.findById('5d7127d451713e5f0ce33dac')
    .then(book => {
      console.log('Found book!');
      // console.log(book)
      book.release = 1967;
      book.save()
        .then(() => {
          console.log('Book was successfully saved.');
        })
        .catch(error => {
          console.log('Book was not successfully saved.');
        });
      console.log('This piece of code is going to run synchronously');
    })
    .catch(error => {
      console.log('Got an error loading book.');
    });
}

function alternativeDocumentCreation () {
  Book.create({
    title: 'Hello World',
    release: 2018
  })
    .then(book => {
      console.log('Created new book');
      console.log(book);
    })
    .catch(error => {
      console.log('Had an error creating the book');
    })
}