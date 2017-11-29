const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const cookieSession = require('cookie-session');
const cookieParser = require('cookie-parser');
const favicon = require('serve-favicon');
const controllers = require('./controllers/index');
const bodyParser = require('body-parser');
require('env2')('config.env');

const flash = require('express-flash');
const app = express();

const requireLogin = require('./controllers/require_login');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine(
  'hbs',
  exphbs({
    extname: 'hbs',
    layoutsDir: path.join(__dirname, 'views', 'layouts'),
    partialsDir: path.join(__dirname, 'views', 'partials'),
    defaultLayout: 'main',
  }));

app.use(cookieSession({
  name: 'session',
  secret: process.env.SESSION_SECRET,
  // the session will last for three days
  maxAge: 24 * 60 * 60 * 1000 * 3,
}));

app.use(cookieParser());
app.use(flash());
app.use(favicon(path.join(__dirname, '..', 'public', 'favicon.ico')));

app.use(requireLogin);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(controllers);

app.use((req, res) => {
  res.status(404).render('error', {
    layout: 'error',
    statusCode: 404,
    errorMessage: 'This page couldn\'t be found.',
  });
});
//Error handling middleware for development
if (process.env.NODE_ENV !== 'production') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
      errorMessage: err.message,
      error: err
    });
  });
}
//Error handling middleware for production
app.use( (err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', {
    layout: 'error',
    errorMessage: 'Something went wrong.',
    error: {}
  });
});

module.exports = app;
