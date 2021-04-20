const axios = require('axios');
const logger = require('../middlewares/logger');

const BASE_URL = 'https://api.nomics.com/v1/currencies/ticker';
const { API_KEY } = process.env;

const getPrice = async (coinId) => {
  logger.info('Getting crypto price data...');

  const URL = `${BASE_URL}?key=${API_KEY}&ids=${coinId}&convert=EUR`;
  let price;

  const res = await axios.get(URL);

  res.data.forEach((coin) => {
    price = Number(coin.price);
  });

  return price;
};

const getAllCoins = async (perPage, page) => {
  logger.info('Getting all crypto data...');

  const URL = `${BASE_URL}?key=${API_KEY}&convert=EUR&per-page=${perPage}&page=${page}`;

  const res = await axios.get(URL);

  return res;
};

module.exports = { getPrice, getAllCoins };
