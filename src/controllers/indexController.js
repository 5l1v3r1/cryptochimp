const logger = require('../middlewares/logger');
const User = require('../models/User');

const redirectFromHome = (req, res) => {
  // Check is user is signed in
  if (req.user === undefined) {
    // Show first page of crypto data table
    res.redirect('/browse/1');
    logger.info('Redirected to /browse/1');
  } else {
    // Redirect to users wallet
    res.redirect('/wallet');
    logger.info('Redirected to /wallet');
  }
};

const renderProfileView = (req, res) => {
  // Check is user is signed in
  if (req.user === undefined) {
    // Open google Oauth
    res.redirect('/auth/google');
    logger.info('Redirected to /auth/google');
  } else {
    // Render profile view with user data
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
  // Check is user is signed in
  if (req.user === undefined) {
    // Open google Oauth
    res.redirect('/auth/google');
    logger.info('Redirected to /auth/google');
  } else {
    // Query the signed in user data from db
    User.find({ googleId: req.user.googleId })
      .then((result) => {
        // Render wallet view with user data
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
  redirectFromHome,
  renderProfileView,
  renderAboutView,
  renderWalletView,
};
