const mongoose = require('mongoose');

const { MONGO_URI } = process.env;

const connectDB = () => {
  mongoose
    .connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: true,
    })
    .then(() => {
      console.log('Connected to DB');
    })
    .catch((error) => {
      throw new Error(error);
    });
};

module.exports = connectDB;
