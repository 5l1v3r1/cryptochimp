const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const UserSchema = new Schema({
  googleId: {
    type: String,
    required: true,
  },
  displayName: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  purchases: [
    {
      symbol: String,
      quantity: Number,
    },
  ],
});

module.exports = model('User', UserSchema);
