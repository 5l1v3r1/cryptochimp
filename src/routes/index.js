const express = require('express');
const indexController = require('../controllers/indexController');

const router = express.Router();

router.get('/', indexController.renderHomeView);
router.get('/profile', indexController.renderProfileView);
router.get('/about', indexController.renderAboutView);
router.get('/wallet', indexController.renderWalletView);

module.exports = router;
