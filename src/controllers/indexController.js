const coin = require('../services/coinData');

const greeting = async (req, res) => {
  const coinData = await coin.getCoinData('ETH', 'EUR');

  res.send(coinData);
};

module.exports = {
  greeting,
};
