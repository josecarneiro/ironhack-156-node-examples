const express = require('express');

const app = express();

// Look in public files first 
app.use(express.static('public'));

// Adding some custom middleware
app.use((request, response, next) => {
  console.log('Hit my custom middleware.', request.url);
  next();
});

// Try to match all other routes
app.get('/', (request, response, next) => {
  // Often times you will see "request" being called "req"
  // and "response" being called "res"
  // There's no difference
  console.log('Got request in express app');
  // You can send a simple text message
  // response.send('Hello world from express app!');
  // Serving an html file instead
  response.sendFile(__dirname + '/views/index.html');
});

app.get('/about', (request, response, next) => {
  // response.send('Hello from about page.');
  response.sendFile(__dirname + '/views/index.html');
});

// * "catches" all routes that haven't satisfied the declarations specified above
app.get('*', (request, response, next) => {
  console.log('User hit error page', request.url);
  response.status(404);
  response.send('Got lost');
});

app.listen(3000);
