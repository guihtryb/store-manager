const ProductsModel = require('../models/ProductsModel');

const getAll = async () => {
  const products = await ProductsModel.getAll();

  return products;
};

module.exports = {
  getAll,
};
