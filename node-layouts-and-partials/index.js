const express = require('express');
const hbs = require('hbs');

// Create express app
const app = express();

// Set view engine to handlebars
app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');

hbs.registerPartials(__dirname + '/views/partials');

// Handle Routes
app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/about', (req, res, next) => {
  const data = {
    name: 'José Carneiro'
  };
  res.render('about', data);
});

app.get('/students', (req, res, next) => {
  const data = {
    students: [
      { name: 'Benedita', country: 'Portugal', photo: 'https://source.unsplash.com/1600x900/?student' },
      { name: 'Filipe', country: 'Portugal', photo: 'https://source.unsplash.com/1600x901/?student' },
      { name: 'Paula', country: 'Germany', photo: 'https://source.unsplash.com/1600x902/?student' },
      { name: 'Kidist', country: 'Ethiopia', photo: 'https://source.unsplash.com/1600x903/?student' },
      { name: 'Gustavo', country: 'Brazil', photo: 'https://source.unsplash.com/1600x904/?student' },
      { name: 'Sam', country: 'United States of America', photo: 'https://source.unsplash.com/1600x905/?student' },
      { name: 'Tiago', country: 'Portugal', photo: 'https://source.unsplash.com/1600x906/?student' }
    ]
  };
  res.render('students', data);
});

// Listen on Port 3000
app.listen(3000);
