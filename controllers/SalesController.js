const SaleService = require('../services/SalesService');

const getAll = async (_req, res) => {
  const sales = await SaleService.getAll();
  res.status(200).json(sales);
};

module.exports = {
  getAll,
};
