const User = require('../models/User');
const logger = require('../middlewares/logger');

const addCoin = (userId, coinSymbol, coinQuantity) => {
  logger.info('Adding a new coin...');
  User.updateOne(
    { googleId: userId },
    {
      $push: {
        wallet: [
          {
            symbol: coinSymbol,
            quantity: coinQuantity,
          },
        ],
      },
    },
    (err) => {
      if (err) {
        logger.error(err);
      }
    },
  );
};

const removeCoin = (userId, coinSymbol) => {
  logger.info('Removeing a coin...');
  User.updateOne(
    { googleId: userId },
    {
      $pull: {
        wallet: { symbol: coinSymbol },
      },
    },
    { safe: true },
    (err) => {
      if (err) {
        logger.error(err);
      }
    },
  );
};

const updateQuantity = (userId, coinSymbol, coinQuantity) => {
  logger.info('Updating coin quantity...');

  User.updateOne(
    { 'wallet.symbol': coinSymbol, googleId: userId },
    { $inc: { 'wallet.$.quantity': coinQuantity } },
    (err) => {
      if (err) {
        logger.error(err);
      }
    },
  );
};

const updateCash = (res, userId, newCash) => {
  logger.info('Updating user cash...');
  User.updateOne({ googleId: userId }, { cash: newCash }, (err) => {
    if (err) {
      logger.error(err);
    } else {
      res.redirect('/wallet');
    }
  });
};

module.exports = {
  updateCash,
  addCoin,
  removeCoin,
  updateQuantity,
};
