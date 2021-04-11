const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
require('dotenv/config');

const index = require('./routes/index');
const auth = require('./routes/auth');
const connectDB = require('./config/db');
require('./config/passport')(passport);

const app = express();

connectDB();

app.set('view engine', 'ejs');

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
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
app.use('/', index);
app.use('/auth', auth);

module.exports = app;
