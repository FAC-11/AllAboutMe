const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const cookieSession = require('cookie-session');
const cookieParser = require('cookie-parser');
const favicon = require('serve-favicon');
const controllers = require('./controllers/index');
require('env2')('config.env');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine(
  'hbs',
  exphbs({
    extname: 'hbs',
    layoutsDir: path.join(__dirname, 'views', 'layouts'),
    partialsDir: path.join(__dirname, 'views', 'partials'),
    defaultLayout: 'main',
  }),
);

app.use(cookieSession({
  name: 'session',
  secret: process.env.SESSION_SECRET,
  // the session will last for three days
  maxAge: 24 * 60 * 60 * 1000 * 3,
}));
app.use(cookieParser());
app.use(favicon(path.join(__dirname, '..', 'public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(controllers);


module.exports = app;
