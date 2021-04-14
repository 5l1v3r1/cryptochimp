const User = require('../models/User');
const logger = require('../middlewares/logger');

const renderBuyForm = async (req, res) => {
  res.render('trade/buy', { title: 'Buy' });
};

const renderSellForm = async (req, res) => {
  res.render('trade/sell', { title: 'Sell' });
};

const buyCoin = (req, res) => {
  req.user.wallet.forEach((coin) => {
    if (coin.symbol === req.body.symbol) {
      User.updateOne(
        { 'wallet.symbol': req.body.symbol, googleId: req.user.googleId },
        { $inc: { 'wallet.$.quantity': req.body.quantity } },
        (err) => {
          if (err) {
            logger.error(err);
          } else {
            res.redirect('/wallet');
          }
        },
      );
    } else {
      User.updateOne(
        { googleId: req.user.googleId },
        {
          $push: {
            wallet: [
              {
                symbol: req.body.symbol,
                quantity: req.body.quantity,
              },
            ],
          },
        },
        (err) => {
          if (err) {
            logger.error(err);
          } else {
            res.redirect('/wallet');
          }
        },
      );
    }
  });
};

const sellCoin = async (req, res) => {
  res.send('Hello team');
};

module.exports = {
  renderBuyForm,
  renderSellForm,
  buyCoin,
  sellCoin,
};
