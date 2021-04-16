const axios = require('axios');
const logger = require('../middlewares/logger');

const BASE_URL = 'https://api.nomics.com/v1/currencies/ticker';
const { API_KEY } = process.env;

const getPrice = async (coinId) => {
  logger.info('Getting crypto price data...');

  // Get nomics API with coinId parameter
  const res = await axios.get(
    `${BASE_URL}?key=${API_KEY}&ids=${coinId}&convert=EUR`,
  );

  let price;

  // Update price with API response
  res.data.forEach((coin) => {
    price = coin.price;
  });

  return price;
};

const getAllCoins = async (perPage, page) => {
  logger.info('Getting all crypto data...');

  // Get nomics API with page and per page parameters
  const res = await axios.get(
    `${BASE_URL}?key=${API_KEY}&convert=EUR&per-page=${perPage}&page=${page}`,
  );

  return res;
};

module.exports = { getPrice, getAllCoins };
