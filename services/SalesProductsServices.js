const SalesProductsModel = require('../models/SalesModel');

const getAll = async () => {
  const salesProducts = await SalesProductsModel.getAll();

  return salesProducts;
};

module.exports = {
  getAll,
};
