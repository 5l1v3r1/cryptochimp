const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
require('dotenv/config');

const index = require('./routes/index');
const auth = require('./routes/auth');
const trade = require('./routes/trade');
const browse = require('./routes/browse');
const connectDB = require('./config/db');
require('./config/passport')(passport);

const app = express();

connectDB();

app.set('view engine', 'ejs');

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static('src/public'));
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
app.use('/trade', trade);
app.use('/browse', browse);

module.exports = app;
