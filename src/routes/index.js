const express = require('express');
const indexController = require('../controllers/indexController');

const router = express.Router();

router.get('/', indexController.renderHomView);
router.get('/api', indexController.api);

module.exports = router;
