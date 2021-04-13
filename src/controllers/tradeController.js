const User = require('../models/User');
const logger = require('../middlewares/logger');

const renderBuyForm = async (req, res) => {
  res.render('trade/buy', { title: 'Buy' });
};

const renderSellForm = async (req, res) => {
  res.render('trade/sell', { title: 'Sell' });
};

const buyCoin = (req, res) => {
  User.updateOne(
    { googleId: req.user.googleId },
    {
      $push: {
        purchases: [
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
        res.redirect('/portfolio');
      }
    },
  );
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
