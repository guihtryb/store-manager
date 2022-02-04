const ProductService = require('../services/ProductsService');

const getAll = async (_req, res) => {
  const products = await ProductService.getAll();
  res.status(200).json(products);
};

module.exports = {
  getAll,
};
