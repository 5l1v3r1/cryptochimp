const axios = require('axios');

const BASE_URL = 'https://api.nomics.com/v1/currencies/ticker';
const { API_KEY } = process.env;

const getCoinData = async (coinId, currency) => {
  const res = await axios.get(
    `${BASE_URL}?key=${API_KEY}&ids=${coinId}&convert=${currency}`,
  );

  let output;

  res.data.forEach((coin) => {
    output = coin.price;
  });

  return output;
};

module.exports = { getCoinData };
