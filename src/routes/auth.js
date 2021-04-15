const express = require('express');
const passport = require('passport');
const logger = require('../middlewares/logger');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    logger.info('User authenticated');
    res.redirect('/profile');
    logger.info('Redirected to /profile');
  },
);

router.get('/logout', authController.authLogout);

module.exports = router;
