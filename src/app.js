const express = require('express');
const favicon = require('serve-favicon');
const path = require('path');
const cors = require('cors');
require('dotenv/config');

const home = require('./routes/home');
const connectDB = require('./config/db');

const app = express();

// Middleware
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(cors());

app.set('view engine', 'ejs');

connectDB();

// Routes
app.use('/', home);

module.exports = app;
