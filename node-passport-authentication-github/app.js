'use strict';

const { join } = require('path');
const express = require('express');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const sassMiddleware = require('node-sass-middleware');
const serveFavicon = require('serve-favicon');
const flash  = require('connect-flash');

const expressSession = require('express-session');
const MongoStore = require('connect-mongo')(expressSession);
const mongoose = require('mongoose');
const passport = require('passport');
const PassportGithubStrategy = require('passport-github').Strategy;

const indexRouter = require('./routes/index');
const authenticationRouter = require('./routes/authentication');
const restrictedRouter = require('./routes/restricted');

const app = express();

// Setup view engine
app.set('views', join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(serveFavicon(join(__dirname, 'public/images', 'favicon.ico')));
app.use(express.static(join(__dirname, 'public')));
app.use(sassMiddleware({
  src: join(__dirname, 'public'),
  dest: join(__dirname, 'public'),
  outputStyle: process.env.NODE_ENV === 'development' ? 'nested' : 'compressed',
  sourceMap: true
}));
app.use(flash());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressSession({
  secret: process.env.SESSION_SECRET,
  cookie: { maxAge: 60 * 60 * 24 * 1000 },
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 24 * 60 * 60
  })
}));

// PASSPORT CONFIGURATION

const User = require('./models/user');

passport.serializeUser((user, callback) => {
  callback(null, user._id);
});

passport.deserializeUser((id, callback) => {
  User.findById(id)
    .then(user => {
      if (!user) {
        callback(new Error('MISSING_USER'));
      } else {
        callback(null, user);
      }
    })
    .catch(error => {
      callback(error);
    });
});

passport.use('github', new PassportGithubStrategy({
  clientID: process.env.GITHUB_APPLICATION_ID,
  clientSecret: process.env.GITHUB_APPLICATION_SECRET,
  callbackURL: 'http://localhost:3000/authentication/github-authorization',
  scope: 'user:email'
}, (accessToken, refreshToken, profile, callback) => {
  // console.log(accessToken, refreshToken);
  User.findOne({ githubID: profile.id })
    .then(user => {
      if (user) {
        return User.signIn(profile.id, accessToken);
      } else {
        const email = profile.emails.find(item => item.primary).value;
        return User.signUp(profile, email, accessToken);
      }
    })
    .then(user => {
      callback(null, user);
    })
    .catch(error => {
      callback(error);
    });
}));

app.use(passport.initialize());
app.use(passport.session());

// END PASSPORT CONFIGURATION

// Custom piece of middleware
app.use((req, res, next) => {
  // Access user information from within my templates
  res.locals.user = req.user;
  // Keep going to the next middleware or route handler
  next();
});

const routeGuardMiddleware = require('./controllers/route-guard-middleware');

app.use('/', indexRouter);
app.use('/authentication', authenticationRouter);
app.use('/restricted', routeGuardMiddleware, restrictedRouter);

// Catch missing routes and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// Catch all error handler
app.use((error, req, res, next) => {
  // Set error information, with stack only available in development
  res.locals.message = error.message;
  res.locals.error = req.app.get('env') === 'development' ? error : {};
  if (req.app.get('env') === 'development') console.log(error);

  res.status(error.status || 500);
  res.render('error');
});

module.exports = app;
