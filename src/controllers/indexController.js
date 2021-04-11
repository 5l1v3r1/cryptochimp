const coin = require('../services/crypto');

const api = async (req, res) => {
  const coinData = await coin.getCoinData('ETH', 'EUR');

  res.send(coinData);
};

const renderHomView = (req, res) => {
  res.render('index', { title: 'Home' });
};

module.exports = { renderHomView, api };
