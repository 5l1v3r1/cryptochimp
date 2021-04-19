const logger = require('../middlewares/logger');
const crypto = require('../services/crypto');
const wallet = require('../services/wallet');

const renderBuyForm = (req, res) => {
  // Check is user is signed in
  if (!req.user) {
    // Open google Oauth
    res.redirect('/auth/google');
  } else {
    // Render buy view
    res.render('trade/buy', { title: 'Buy' });
    logger.info('Sent buy.html');
  }
};

const renderSellForm = (req, res) => {
  // Check is user is signed in
  if (!req.user) {
    // Open google Oauth
    res.redirect('/auth/google');
  } else {
    // Render sell view
    res.render('trade/sell', { title: 'Sell' });
    logger.info('Sent sell.html');
  }
};

const buyCoin = async (req, res) => {
  let { symbol } = req.body;
  symbol = symbol.toUpperCase();
  const { quantity } = req.body;
  const { googleId } = req.user;

  // newCash is coin price times quantity subtracted from users cash
  const price = await crypto.getPrice(symbol);
  const totalPrice = price * quantity;
  const newCash = req.user.cash - totalPrice;

  // if symbol dosen't exists
  if (!price || newCash < 0) {
    res.redirect('/trade/buy');
    logger.info('Symbol not found/not enough cash');
  } else if (req.user.wallet.some((data) => data.symbol === symbol)) {
    // If coin already exists in wallet
    wallet.buyExistingCoin(res, googleId, symbol, quantity);
    wallet.updateCash(res, googleId, newCash);
  } else {
    // If user dosen't yet have coin
    wallet.buyNewCoin(res, googleId, symbol, quantity);
    wallet.updateCash(res, googleId, newCash);
  }
};

const sellCoin = async (req, res) => {
  let { symbol } = req.body;
  symbol = symbol.toUpperCase();
  const { quantity } = req.body;
  const { googleId } = req.user;

  // newCash is coin price times quantity added to users cash
  const price = await crypto.getPrice(symbol);
  const totalPrice = price * quantity;
  const newCash = req.user.cash + totalPrice;

  if (
    req.user.wallet.some(
      (data) => data.symbol === symbol && data.quantity >= quantity,
    )
  ) {
    logger.info('Yeah yeah');
  } else {
    res.redirect('/auth/google');
  }
};

module.exports = {
  renderBuyForm,
  renderSellForm,
  buyCoin,
  sellCoin,
};
