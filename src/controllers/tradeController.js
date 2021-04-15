const User = require('../models/User');
const logger = require('../middlewares/logger');
const crypto = require('../services/crypto');

const renderBuyForm = (req, res) => {
  // Check is user is signed in
  if (req.user === undefined) {
    // Open google Oauth
    res.redirect('/auth/google');
    logger.info('Redirected to /auth/google');
  } else {
    // Render buy view
    res.render('trade/buy', { title: 'Buy' });
    logger.info('Rendered buy view');
  }
};

const renderSellForm = (req, res) => {
  // Check is user is signed in
  if (req.user === undefined) {
    // Open google Oauth
    res.redirect('/auth/google');
    logger.info('Redirected to /auth/google');
  } else {
    // Render sell view
    res.render('trade/sell', { title: 'Sell' });
    logger.info('Rendered sell view');
  }
};

const buyCoin = async (req, res) => {
  const { symbol } = req.body;
  const { quantity } = req.body;

  // Get price data from crypto service
  const price = await crypto.getPrice(symbol.toUpperCase());

  // Check if service doesn't find symbol
  if (price === undefined) {
    res.redirect('/trade/buy');
    logger.info('Coin symbol not found');
  } else {
    // Calculate the price of the purchase
    const totalPrice = price * quantity;
    // Subtract purchase price from cash
    const newCash = req.user.cash - totalPrice;

    // Check if user doesn't have enough cash
    if (newCash < 0) {
      res.redirect('/trade/buy');
      logger.info('User dosent have enough cash to buy coins');
    } else {
      // Update cash value for signed in user
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

  // Get price data from crypto service
  const price = await crypto.getPrice(symbol.toUpperCase());

  // Check if service doesn't find symbol
  if (price === undefined) {
    res.redirect('/trade/sell');
    logger.info('Coin symbol not found');
  } else {
    // Calculate the price of the coins user wants to sell
    const totalPrice = price * quantity;
    // Add users coins price to user cash
    const newCash = req.user.cash + totalPrice;

    // Update cash value for signed in user
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
