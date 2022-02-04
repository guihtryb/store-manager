const SalesModel = require('../models/ProductsModel');

const getAll = async () => {
  const sales = await SalesModel.getAll();

  return sales;
};

module.exports = {
  getAll,
};
