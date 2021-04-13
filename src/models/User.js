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
      coinPrice: Number,
      quantity: Number,
      totalPrice: Number,
    },
  ],
});

module.exports = model('User', UserSchema);
