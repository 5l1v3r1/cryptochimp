const logger = require('../middlewares/logger');
const crypto = require('../services/crypto');
const User = require('../models/User');

const renderHomeView = async (req, res) => {
  const coinData = await crypto.getAllCoins();

  res.render('index', { title: 'Home', coins: coinData });
};

const renderProfileView = (req, res) => {
  if (req.user === undefined) {
    res.redirect('/auth/google');
  } else {
    res.render('profile', {
      title: 'Profile',
      displayName: req.user.displayName,
      profilePicture: req.user.image,
    });
  }
};

const renderAboutView = (req, res) => {
  res.render('about', { title: 'About' });
};

const renderWalletView = (req, res) => {
  if (req.user === undefined) {
    res.redirect('/auth/google');
  } else {
    User.find({ googleId: req.user.googleId })
      .then((result) => {
        res.render('wallet', { userData: result, title: 'Wallet' });
      })
      .catch((err) => {
        logger.error(`Wallet failed: ${err}`);
      });
  }
};

module.exports = {
  renderHomeView,
  renderProfileView,
  renderAboutView,
  renderWalletView,
};
