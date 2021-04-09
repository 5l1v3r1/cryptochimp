const coin = require('../services/coinData');

const greeting = async (req, res) => {
  const price = await coin.getCoinData('ETH', 'EUR');

  res.send(price);
};

module.exports = {
  greeting,
};
