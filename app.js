const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const authenticate = require('./routes/authenticate');
const indexRouter = require('./routes/index');
const carsRouter = require('./routes/cars');
const loginRouter = require('./routes/login');
const signupRouter = require('./routes/signup');
const favoritesRouter = require('./routes/favorites');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());

app.use(authenticate);

app.use('/', indexRouter);
app.use(carsRouter);
app.use(loginRouter);
app.use(signupRouter);
app.use(favoritesRouter);

// error handler
app.use(function(err, req, res, next) {
  const {statusCode, message, error} = err;

  if (error) {
    console.log(error);
  }
  return res.status(statusCode || 500).end(message || 'Unexpected error');
});

module.exports = app;
