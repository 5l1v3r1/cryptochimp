const User = require('../models/User');
const logger = require('../middlewares/logger');

const updateCash = (res, userId, newCash) => {
  User.updateOne({ googleId: userId }, { cash: newCash }, (err) => {
    if (err) {
      logger.error(`Failed to update user cash: ${err}`);
    } else {
      res.redirect('/wallet');
      logger.info('Redirected to /wallet');
    }
  });
};

const buyNewCoin = (res, userId, coinSymbol, coinQuantity) => {
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
        logger.error('Error adding coin to wallet');
      } else {
        res.redirect('/wallet');
      }
    },
  );
};

const buyExistingCoin = (res, userId, coinSymbol, coinQuantity) => {
  User.updateOne(
    { 'wallet.symbol': coinSymbol, googleId: userId },
    { $inc: { 'wallet.$.quantity': coinQuantity } },
    (err) => {
      if (err) {
        logger.error('Error updating coin quantity');
      } else {
        res.redirect('/wallet');
      }
    },
  );
};

module.exports = {
  updateCash,
  buyNewCoin,
  buyExistingCoin,
};
