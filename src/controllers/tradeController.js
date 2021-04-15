const User = require('../models/User');
const logger = require('../middlewares/logger');
const crypto = require('../services/crypto');

const renderBuyForm = (req, res) => {
  if (req.user === undefined) {
    res.redirect('/auth/google');
    logger.info('Redirected to /auth/google');
  } else {
    res.render('trade/buy', { title: 'Buy' });
    logger.info('Rendered buy view');
  }
};

const renderSellForm = (req, res) => {
  if (req.user === undefined) {
    res.redirect('/auth/google');
    logger.info('Redirected to /auth/google');
  } else {
    res.render('trade/sell', { title: 'Sell' });
    logger.info('Rendered sell view');
  }
};

const buyCoin = async (req, res) => {
  const { symbol } = req.body;
  const { quantity } = req.body;
  const price = await crypto.getPrice(symbol.toUpperCase());

  if (price === undefined) {
    res.send('Coin symbol not found');
    logger.info('Coin symbol not found');
  } else {
    const totalPrice = price * quantity;
    const newCash = req.user.cash - totalPrice;

    if (newCash < 0) {
      res.send('You dont have enough cash');
      logger.info('User dosent have enough cash to buy coins');
    } else {
      User.updateOne(
        { googleId: req.user.googleId },
        { cash: newCash },
        (err) => {
          if (err) {
            logger.error(`Failed to update user cash: ${err}`);
          } else {
            res.redirect('/wallet');
            logger.info('Redirected to /wallet');
          }
        },
      );
    }
  }
};

const sellCoin = async (req, res) => {
  const { symbol } = req.body;
  const { quantity } = req.body;
  const price = await crypto.getPrice(symbol.toUpperCase());

  if (price === undefined) {
    res.send('Could not find coin');
  } else {
    const totalPrice = price * quantity;
    const newCash = req.user.cash + totalPrice;

    User.updateOne(
      { googleId: req.user.googleId },
      { cash: newCash },
      (err) => {
        if (err) {
          logger.error(err);
        } else {
          res.redirect('/wallet');
        }
      },
    );
  }
};

module.exports = {
  renderBuyForm,
  renderSellForm,
  buyCoin,
  sellCoin,
};
