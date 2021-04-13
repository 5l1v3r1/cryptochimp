const coin = require('../services/crypto');
const User = require('../models/User');
const logger = require('../middlewares/logger');

const renderBuyForm = async (req, res) => {
  res.render('trade/buy', { title: 'Buy' });
};

const renderSellForm = async (req, res) => {
  res.render('trade/sell', { title: 'Sell' });
};

const buyCoin = async (req, res) => {
  const coinData = await coin.getCoinData(req.body.symbol);

  User.updateOne(
    { googleId: req.user.googleId },
    {
      $push: {
        purchases: [
          {
            symbol: req.body.symbol,
            coinPrice: coinData.price,
            quantity: req.body.quantity,
            totalPrice: coinData.price * req.body.quantity,
          },
        ],
      },
    },
    (err, result) => {
      if (err) {
        logger.error(err);
      } else {
        res.redirect('/portfolio');
        logger.info(result);
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
