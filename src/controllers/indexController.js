const logger = require('../middlewares/logger');

const redirectFromHome = (req, res) => {
  // Check is user is signed in
  if (!req.user) {
    // Show first page of crypto data table
    res.redirect('/browse/1');
  } else {
    // Redirect to users wallet
    res.redirect('/wallet');
  }
};

const renderProfileView = (req, res) => {
  // Check is user is signed in
  if (!req.user) {
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
  if (!req.user) {
    // Open google Oauth
    res.redirect('/auth/google');
  } else {
    res.render('wallet', { title: 'Wallet', user: req.user });
  }
};

module.exports = {
  redirectFromHome,
  renderProfileView,
  renderAboutView,
  renderWalletView,
};
