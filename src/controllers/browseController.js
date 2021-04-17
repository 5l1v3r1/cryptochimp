const logger = require('../middlewares/logger');
const crypto = require('../services/crypto');

const showCryptoData = async (req, res) => {
  const rowsPerPage = 100;
  // Calculate current, next and previous page for pagination
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
  logger.info('Sent browse.html');
};

module.exports = {
  showCryptoData,
};
