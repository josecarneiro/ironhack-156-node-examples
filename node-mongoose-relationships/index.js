const express = require('express');

const app = express();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.use(express.urlencoded({ extended: false }));

const hbs = require('hbs');

hbs.registerPartials(__dirname + '/views/partials');

const router = require('./router');

app.use(router);

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/video', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to the database');
  })
  .catch(error => {
    console.log('There was an error connecting to the database');
  })

app.listen(3000);
