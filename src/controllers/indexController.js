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
        res.render('wallet', {
          title: 'Wallet',
          cash: Math.round(result[0].cash),
        });
      })
      .catch((err) => {
        logger.error(`Failed rendering wallet: ${err}`);
      });
  }
};

module.exports = {
  renderHomeView,
  renderProfileView,
  renderAboutView,
  renderWalletView,
};
