const axios = require('axios');
const logger = require('../middlewares/logger');

const BASE_URL = 'https://api.nomics.com/v1/currencies/ticker';
const { API_KEY } = process.env;

const getPrice = async (coinId) => {
  const res = await axios.get(
    `${BASE_URL}?key=${API_KEY}&ids=${coinId}&convert=EUR`,
  );

  let price;

  res.data.forEach((coin) => {
    price = coin.price;
  });

  return price;
};

const getAllCoins = async () => {
  const coinData = await axios.get(`${BASE_URL}?key=${API_KEY}`);

  return coinData;
};

module.exports = { getPrice, getAllCoins };
