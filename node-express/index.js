const express = require('express');

const app = express();

app.get('/', (request, response, next) => {
  // Often times you will see "request" being called "req"
  // and "response" being called "res"
  // There's no difference
  console.log('Got request in express app');
  // response.send('<h1>Hello world from express app!</h1>');
  // Serving an html file instead
  response.sendFile(__dirname + '/views/index.html');
});

app.get('/about', (request, response, next) => {
  response.send('Hello from about page.');
});

app.get('*', (request, response, next) => {
  response.status(404);
  response.send('Got lost');
});

app.listen(3000);
