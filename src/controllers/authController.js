const logger = require('../middlewares/logger');

const authLogout = (req, res) => {
  req.logout();
  logger.info('User signed out');
  res.redirect('/');
};

module.exports = {
  authLogout,
};
