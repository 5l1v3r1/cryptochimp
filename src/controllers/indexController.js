const logger = require('../middlewares/logger');
const coin = require('../services/crypto');

const api = async (req, res) => {
  const coinData = await coin.getCoinData('ETH', 'EUR');

  res.send(coinData);
};

const renderHomeView = async (req, res) => {
  const coinData = await coin.getAllCoinData();

  res.render('index', { title: 'Home', coins: coinData });
};

const renderProfileView = (req, res) => {
  try {
    res.render('profile', {
      title: 'Profile',
      displayName: req.user.displayName,
      profilePicture: req.user.image,
    });
  } catch (err) {
    res.redirect('/auth/google');
    logger.info('Not signed in, cant open profile');
  }
};

module.exports = {
  renderHomeView,
  renderProfileView,
  api,
};
