const express = require('express');

// Create express app
const app = express();

// Set view engine to handlebars
app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');

// Handle Routes
app.get('/', (req, res, next) => {
  // res.sendFile(__dirname + '/views/index.html');
  res.render('index');
});

app.get('/about', (req, res, next) => {
  const data = {
    name: 'José Carneiro',
    location: {
      country: 'Portugal',
      city: 'Elvas'
      // region: 'Alentejo'
    },
    animals: [
      'Panda',
      'Milu',
      'Whiskers'
    ],
    schools: {
      primary: 'Colégio Luso-Britânico',
      secondarySchool: 'Escola Secundária D. Sancho II',
      college: 'CLSBE'
    }
  };
  res.render('about', data);
});

// Listen on Port 3000
app.listen(3000);
