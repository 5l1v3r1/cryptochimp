const logger = require('../middlewares/logger');
const crypto = require('../services/crypto');
const User = require('../models/User');

const renderHomeView = async (req, res) => {
  const coinData = await crypto.getAllCoins();

  let name;

  if (req.user === undefined) {
    name = 'guest';
  } else {
    name = req.user.displayName;
  }

  res.render('index', {
    title: 'Home',
    coins: coinData,
    userName: name,
  });
  logger.info('Rendered home view');
};

const renderProfileView = (req, res) => {
  if (req.user === undefined) {
    res.redirect('/auth/google');
    logger.info('Redirected to /auth/google');
  } else {
    res.render('profile', {
      title: 'Profile',
      displayName: req.user.displayName,
      profilePicture: req.user.image,
    });
    logger.info('Rendered profile view');
  }
};

const renderAboutView = (req, res) => {
  res.render('about', { title: 'About' });
  logger.info('Rendered about view');
};

const renderWalletView = (req, res) => {
  if (req.user === undefined) {
    res.redirect('/auth/google');
    logger.info('Redirected to /auth/google');
  } else {
    User.find({ googleId: req.user.googleId })
      .then((result) => {
        res.render('wallet', {
          title: 'Wallet',
          cash: Math.round(result[0].cash),
        });
        logger.info('Render wallet view');
      })
      .catch((err) => {
        logger.error(`Failed wallet: ${err}`);
      });
  }
};

module.exports = {
  renderHomeView,
  renderProfileView,
  renderAboutView,
  renderWalletView,
};
