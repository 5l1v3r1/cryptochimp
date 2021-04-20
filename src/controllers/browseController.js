const crypto = require('../services/crypto');

const showCryptoData = async (req, res) => {
  const rowsPerPage = 100;
  const currentPage = Number(req.params.page);
  const nextPage = currentPage + 1;
  const previousPage = currentPage - 1;

  const coinData = await crypto.getAllCoins(rowsPerPage, req.params.page);

  res.render('browse/browse', {
    title: 'Browse',
    coins: coinData,
    next: nextPage,
    previous: previousPage,
    current: currentPage,
  });
};

module.exports = {
  showCryptoData,
};
