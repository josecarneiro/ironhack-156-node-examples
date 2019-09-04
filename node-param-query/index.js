const express = require('express');

const app = express();

app.get('/', (request, response, next) => {
  response.send('Hello world');
});

// Params
// /user/josecarneiro   <--- josecarneiro is the value for the username prop in request.params

app.get('/user/:username', (request, response, next) => {
  const username = request.params.username;
  response.send('This is a user profile for ' + username);
});

app.get('/user/:username/post/:post_id/comment/:comment_id', (request, response, next) => {
  const username = request.params.username;
  const postId = request.params.post_id;
  const commentId = request.params.comment_id;
  response.send('Loaded comment ' + commentId + ' from post ' + postId + ' by user ' + username);
});

// Queries
//   PROTOCOL + DOMAIN + PORT:    http://localhost:3000/
//   PATH:                        search
//   QUERY:                       ?  question=beni  &  class=web  &  location=lisbon  &  rubish=abc

app.get('/search', (request, response, next) => {
  const query = request.query;
  const user = request.query.user;
  response.send('Looked up user ' + user);
});

// Catch all missing pages

app.get('*', (request, response, next) => {
  response.status(404);
  response.send('There has been an error');
})

app.listen(3000);
