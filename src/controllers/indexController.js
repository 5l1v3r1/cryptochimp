const redirectFromHome = (req, res) => {
  // Check if user is signed in
  if (!req.user) {
    res.redirect('/browse/1');
  } else {
    res.redirect('/wallet');
  }
};

const renderProfileView = (req, res) => {
  // Check if user is signed in
  if (!req.user) {
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
  // Check if user if signed in
  if (!req.user) {
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
