const User = require('../models/User');
const logger = require('../middlewares/logger');

const addCoin = (res, userId, coinSymbol, coinQuantity) => {
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

const removeCoin = (res, userId, coinSymbol, coinQuantity) => {
  // If selling quantity === owning quantity
  // Pull elemnt from array
  // Else subtract selling from owning quantity

  logger.info('Removeing a coin...');
  User.updateOne(
    { googleId: userId },
    {
      $pull: {
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

const updateQuantity = (res, userId, coinSymbol, coinQuantity) => {
  logger.info('Updating coin quantity...');

  User.updateOne(
    { 'wallet.symbol': coinSymbol, googleId: userId },
    { $inc: { 'wallet.$.quantity': coinQuantity } },
    (err, result) => {
      if (err) {
        logger.error(err);
      } else {
        logger.info(result);
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
