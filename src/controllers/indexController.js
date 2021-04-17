const logger = require('../middlewares/logger');
const User = require('../models/User');

const redirectFromHome = (req, res) => {
  // Check is user is signed in
  if (req.user === undefined) {
    // Show first page of crypto data table
    res.redirect('/browse/1');
  } else {
    // Redirect to users wallet
    res.redirect('/wallet');
  }
};

const renderProfileView = (req, res) => {
  // Check is user is signed in
  if (req.user === undefined) {
    // Open google Oauth
    res.redirect('/auth/google');
  } else {
    // Render profile view with user data
    res.render('profile', {
      title: 'Profile',
      displayName: req.user.displayName,
      profilePicture: req.user.image,
    });
    logger.info('Sent profile.html');
  }
};

const renderAboutView = (req, res) => {
  res.render('about', { title: 'About' });
  logger.info('Sent about.html');
};

const renderWalletView = (req, res) => {
  // Check is user is signed in
  if (req.user === undefined) {
    // Open google Oauth
    res.redirect('/auth/google');
  } else {
    // Query the signed in user data from db
    User.find({ googleId: req.user.googleId })
      .then((result) => {
        // Render wallet view with user data
        res.render('wallet', {
          title: 'Wallet',
          cash: Math.round(result[0].cash),
        });
        logger.info('Sent wallet.html');
      })
      .catch((err) => {
        logger.error(err);
      });
  }
};

module.exports = {
  redirectFromHome,
  renderProfileView,
  renderAboutView,
  renderWalletView,
};
