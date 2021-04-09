const authLogout = (req, res) => {
  req.logout();
  res.redirect('/');
};

module.exports = {
  authLogout,
};
