const express = require('express');
const hbs = require('hbs');
const bodyParser = require('body-parser');

// Create express app
const app = express();

// Set view engine to handlebars
app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');

hbs.registerPartials(__dirname + '/views/partials');

// Inject body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));

// Other middleware
// app.use(/* MIDDLEWARE */)
// app.use(/* MIDDLEWARE */)
app.use((req, res, next) => {
  console.log('Inside a custom middleware.');
  next();
});

app.use('/about', (req, res, next) => {
  console.log('Inside the about middleware');
  // next();
  if (Math.random() > 0.5) {
    next();
  } else {
    // res.send('You hit an error.');
    next(new Error('You hit an error.'));
  }
});
// app.use(/* MIDDLEWARE */)
// app.use(/* MIDDLEWARE */)
// app.use(/* MIDDLEWARE */)

// Handle Routes
app.get('/', (req, res, next) => {
  res.render('index');
});

app.post('/contact', (req, res, next) => {
  // Params:     req.params
  // Queries:    req.query
  // Body:       req.body
  // console.log(req.body);
  res.render('contact-response');
  // res.send('You successfully sent your message!');
});

app.get('/about', (req, res, next) => {
  res.send('About page');
});

app.get('/about/other', (req, res, next) => {
  // res.send('About other page');
  res.redirect('/');
});

app.get('/profile/:username', (req, res, next) => {
  if (req.params.username === 'josecarneiro') {
    res.send('José Carneiro\'s profile.');
  } else {
    next(new Error('Profile not found'));
  }
});

app.get('*', (req, res, next) => {
  res.send('That page wasnt found.');
});

// General Error handler
app.use((error, req, res, next) => {
  console.log('There was an error in the server');
  res.status(500);
  res.send('There was an error in the server');
});

// Listen on Port 3000
app.listen(3000);
