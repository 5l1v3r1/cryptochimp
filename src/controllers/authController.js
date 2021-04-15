const logger = require('../middlewares/logger');

const authLogout = (req, res) => {
  logger.info('Logging user out...');
  req.logout();
  res.redirect('/');
};

module.exports = {
  authLogout,
};
