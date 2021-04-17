const User = require('../models/User');
const logger = require('../middlewares/logger');

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

const buyNewCoin = (res, userId, coinSymbol, coinQuantity) => {
  logger.info('Buying a new coin...');
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

const buyExistingCoin = (res, userId, coinSymbol, coinQuantity) => {
  logger.info('Buying existing coin...');

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

module.exports = {
  updateCash,
  buyNewCoin,
  buyExistingCoin,
};
