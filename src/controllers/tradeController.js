const renderBuyForm = async (req, res) => {
  res.render('trade/buy', { title: 'Buy' });
};

const renderSellForm = async (req, res) => {
  res.render('trade/sell', { title: 'Sell' });
};

module.exports = {
  renderBuyForm,
  renderSellForm,
};
