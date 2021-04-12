const axios = require('axios');

const BASE_URL = 'https://api.nomics.com/v1/currencies/ticker';
const { API_KEY } = process.env;

const getCoinData = async (coinId, currency) => {
  const coinData = {
    symbol: null,
    name: null,
    price: null,
    logo: null,
    ytdPriceChangePercentage: null,
  };

  const res = await axios.get(
    `${BASE_URL}?key=${API_KEY}&ids=${coinId}&convert=${currency}`,
  );

  res.data.forEach((coin) => {
    coinData.symbol = coin.symbol;
    coinData.name = coin.name;
    coinData.price = coin.price;
    coinData.logo = coin.logo_url;
    coinData.ytdPriceChangePercentage = coin.ytd.price_change_pct;
  });

  return coinData;
};

const getAllCoinData = async () => {
  const coinData = await axios.get(`${BASE_URL}?key=${API_KEY}`);

  return coinData;
};

module.exports = { getCoinData, getAllCoinData };
