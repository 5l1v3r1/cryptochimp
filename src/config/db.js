const mongoose = require('mongoose');
const logger = require('../middlewares/logger');

const { MONGO_URI } = process.env;

const connectDB = () => {
  logger.info('Connecting to database...');
  mongoose
    .connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: true,
    })
    .then(() => {
      logger.info('Connected to database');
    })
    .catch((err) => {
      logger.error(`Error connecting to database: ${err}`);
    });
};

module.exports = connectDB;
