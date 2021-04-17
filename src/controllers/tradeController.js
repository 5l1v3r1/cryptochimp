const User = require('../models/User');
const logger = require('../middlewares/logger');
const crypto = require('../services/crypto');
const wallet = require('../services/wallet');

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
  let { symbol } = req.body;
  symbol = symbol.toUpperCase();
  const { quantity } = req.body;
  const { googleId } = req.user;

  const price = await crypto.getPrice(symbol);
  const totalPrice = price * quantity;
  const newCash = req.user.cash - totalPrice;

  // if symbol dosen't exists
  if (!price || newCash < 0) {
    res.redirect('/trade/buy');
    logger.info('Symbol not found or not enough cash');
  } else if (req.user.wallet.some((data) => data.symbol === symbol)) {
    // If coin already exists in wallet
    wallet.buyExistingCoin(res, googleId, symbol, quantity);
    wallet.updateCash(res, googleId, newCash);
  } else {
    // If user dosen't yet have coin
    wallet.buyNewCoin(res, googleId, symbol, quantity);
    wallet.updateCash(res, googleId, newCash);
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
