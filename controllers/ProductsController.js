const ProductsService = require('../services/ProductsService');
const ProductsModel = require('../models/ProductsModel');

const getAll = async (_req, res) => {
  const products = await ProductsModel.getAll();
  res.status(200).json(products);
};

const createProduct = async (req, res) => {
  const { name, quantity } = req.body;

  const { code, message } = await ProductsService.createProduct(name, quantity);

  return res.status(code).json(message);
};

const getProductById = async (req, res) => {
  const { id } = req.params;

  const productId = parseInt(id, 10);

  const { code, message } = await ProductsService.getProductById(productId);

  return res.status(code).json(message);
};

const updateProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const { id } = req.params;

  const productId = parseInt(id, 10);

  const { code, message } = await ProductsService.updateProduct(name, quantity, productId);

  return res.status(code).json(message);
};

module.exports = {
  getAll,
  createProduct,
  getProductById,
  updateProduct,
};
