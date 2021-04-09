const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const passport = require('passport');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
require('dotenv/config');

const home = require('./routes/home');
const auth = require('./routes/auth');
const connectDB = require('./config/db');
require('./config/passport')(passport);

const app = express();

connectDB();

app.set('view engine', 'ejs');

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  }),
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded());

// Routes
app.use('/', home);
app.use('/auth', auth);

module.exports = app;
