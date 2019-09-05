const express = require('express');

const app = express();

const PERSON_MAP = {
  jose: {
    name: 'José',
    age: 26
  },
  sonia: {
    name: 'Sonia',
    age: 29
  },
  gui: {
    name: 'Guilherme',
    age: 26
  }
}

// PARAMETERS

// Request parameters
// I can tell express i'm expecting a certain parameter
// by declaring it as :PARAMETER_NAME in my route definition
app.get('/about/:id', (req, res, next) => {
  // Access person from req.params
  const id = req.params.id;
  const person = PERSON_MAP[id];
  res.send('About page for ' + person.name + ' with age ' + person.age);
});

const SONG_MAP = {
  'bohemian rhapsody': {
    title: 'Bohemian Rhapsody',
    duration: 300
  }
};

// QUERIES

// Request query
// You do not need to declare what you're expecting in the query
// You can access it in the req.query
app.get('/search', (req, res, next) => {
  const query = req.query;
  const songId = query.song;
  if (!songId) {
    next(new Error('User did not input anything into search'));
  } else {
    const song = SONG_MAP[songId];
    res.send('Search page for song ' + song.title + ' that has length ' + song.duration);
  }
});

// Request body


app.listen(3000);
