const User = require('../models/User');
const logger = require('../middlewares/logger');

const renderBuyForm = async (req, res) => {
  if (req.user === undefined) {
    res.redirect('/auth/google');
  } else {
    res.render('trade/buy', { title: 'Buy' });
  }
};

const renderSellForm = async (req, res) => {
  if (req.user === undefined) {
    res.redirect('/auth/google');
  } else {
    res.render('trade/sell', { title: 'Sell' });
  }
};

const buyCoin = (req, res) => {
  // req.user.wallet.forEach((coin) => {
  //   if (coin.symbol === req.body.symbol) {
  //     User.updateOne(
  //       { 'wallet.symbol': req.body.symbol, googleId: req.user.googleId },
  //       { $inc: { 'wallet.$.quantity': req.body.quantity } },
  //       (err) => {
  //         if (err) {
  //           logger.error(err);
  //         } else {
  //           res.redirect('/wallet');
  //         }
  //       },
  //     );
  //   } else {
  //     User.updateOne(
  //       { googleId: req.user.googleId },
  //       {
  //         $push: {
  //           wallet: [
  //             {
  //               symbol: req.body.symbol,
  //               quantity: req.body.quantity,
  //             },
  //           ],
  //         },
  //       },
  //       (err) => {
  //         if (err) {
  //           logger.error(err);
  //         } else {
  //           res.redirect('/wallet');
  //         }
  //       },
  //     );
  //   }
  // });
};

const sellCoin = async (req, res) => {
  // console.log('penis');
  // let i = 0;
  // req.user.wallet.forEach((coin) => {
  //   // logger.info(coin.symbol);
  //   logger.info(req.user.wallet[i].symbol);
  //   if (coin.symbol === req.body.symbol) {
  //     if (req.user.wallet[i].quantity === req.body.quantity) {
  //       logger.info('Delete the bitch');
  //     } else {
  //       logger.info('Remove nicely from quantity');
  //       // User.updateOne(
  //       //   { 'wallet.symbol': req.body.symbol, googleId: req.user.googleId },
  //       //   { $inc: { 'wallet.$.quantity': -Math.abs(req.body.quantity) } },
  //       //   (err) => {
  //       //     if (err) {
  //       //       logger.error(err);
  //       //     } else {
  //       //       res.redirect('/wallet');
  //       //     }
  //       //   },
  //       // );
  //     }
  //   } else {
  //     i += 1;
  //     logger.error('You dont have the coin you want to sell');
  //   }
  // });
};

module.exports = {
  renderBuyForm,
  renderSellForm,
  buyCoin,
  sellCoin,
};
