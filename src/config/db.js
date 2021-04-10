const mongoose = require('mongoose');
const logger = require('../middlewares/logger');

const { MONGO_URI } = process.env;

const connectDB = () => {
  mongoose
    .connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: true,
    })
    .then(() => {
      logger.info('Connected to DB');
    })
    .catch((err) => {
      logger.error(`DB connection error: ${err}`);
    });
};

module.exports = connectDB;
