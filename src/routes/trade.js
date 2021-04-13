const express = require('express');
const tradeController = require('../controllers/tradeController');

const router = express.Router();

router.get('/buy', tradeController.renderBuyForm);
router.get('/sell', tradeController.renderSellForm);
router.post('/buy/post', tradeController.buyCoin);
router.post('/sell/post', tradeController.sellCoin);

module.exports = router;
