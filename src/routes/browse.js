const express = require('express');
const browseController = require('../controllers/browseController');

const router = express.Router();

router.get('/:page', browseController.showCryptoData);

module.exports = router;
