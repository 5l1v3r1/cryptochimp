const User = require('../models/User');
const logger = require('../middlewares/logger');
const crypto = require('../services/crypto');

const renderBuyForm = (req, res) => {
  if (req.user === undefined) {
    res.redirect('/auth/google');
  } else {
    res.render('trade/buy', { title: 'Buy' });
  }
};

const renderSellForm = (req, res) => {
  if (req.user === undefined) {
    res.redirect('/auth/google');
  } else {
    res.render('trade/sell', { title: 'Sell' });
  }
};

const buyCoin = async (req, res) => {
  const { symbol } = req.body;
  const { quantity } = req.body;
  const price = await crypto.getPrice(symbol.toUpperCase());

  if (price === undefined) {
    res.send('Could not find coin');
  } else {
    const totalPrice = price * quantity;
    const newCash = req.user.cash - totalPrice;

    if (newCash < 0) {
      res.send('You dont have enough cash');
    } else {
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
