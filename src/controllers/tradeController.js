const logger = require('../middlewares/logger');
const crypto = require('../services/crypto');
const wallet = require('../services/wallet');

const renderBuyForm = (req, res) => {
  // Check is user is signed in
  if (!req.user) {
    res.redirect('/auth/google');
  } else {
    res.render('trade/buy', { title: 'Buy' });
  }
};

const renderSellForm = (req, res) => {
  // Check is user is signed in
  if (!req.user) {
    res.redirect('/auth/google');
  } else {
    res.render('trade/sell', { title: 'Sell' });
  }
};

const buyCoin = async (req, res) => {
  let { symbol } = req.body;
  symbol = symbol.toUpperCase();
  let { quantity } = req.body;
  quantity = Number(quantity);
  const { googleId } = req.user;

  // newCash is coin price times quantity subtracted from users cash
  const price = await crypto.getPrice(symbol);
  const totalPrice = price * quantity;
  const newCash = req.user.cash - totalPrice;

  const userOwnsCoin = req.user.wallet.some((data) => data.symbol === symbol);

  // if symbol dosen't exists or not enough cash
  if (!price || newCash < 0) {
    res.redirect('/trade/buy');
    logger.info('Symbol not found/not enough cash');
  } else if (userOwnsCoin) {
    // If coin already exists in wallet
    wallet.updateQuantity(googleId, symbol, quantity);
    wallet.updateCash(res, googleId, newCash);
  } else {
    // If user dosen't yet have coin
    wallet.addCoin(googleId, symbol, quantity);
    wallet.updateCash(res, googleId, newCash);
  }
};

const sellCoin = async (req, res) => {
  let { symbol } = req.body;
  symbol = symbol.toUpperCase();
  let { quantity } = req.body;
  quantity = Number(quantity);
  const { googleId } = req.user;
  const sellingQuantity = -Math.abs(quantity);

  // newCash is coin price times quantity added to users cash
  const price = await crypto.getPrice(symbol);
  const totalPrice = price * quantity;
  const newCash = req.user.cash + totalPrice;

  const userSellsSomeCoins = req.user.wallet.some(
    (data) => data.symbol === symbol && data.quantity > quantity,
  );
  const userSellsAllCoins = req.user.wallet.some(
    (data) => data.symbol === symbol && data.quantity === quantity,
  );

  if (userSellsSomeCoins) {
    wallet.updateQuantity(googleId, symbol, sellingQuantity);
    wallet.updateCash(res, googleId, newCash);
  } else if (userSellsAllCoins) {
    wallet.removeCoin(googleId, symbol);
    wallet.updateCash(res, googleId, newCash);
  } else {
    res.redirect('/trade/sell');
  }
};

module.exports = {
  renderBuyForm,
  renderSellForm,
  buyCoin,
  sellCoin,
};
