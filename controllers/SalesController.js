const SalesService = require('../services/SalesService');
// const ProductsModel = require('../models/ProductsModel');

// const getAll = async (_req, res) => {
//   const products = await ProductsModel.getAll();
//   res.status(200).json(products);
// };

const createSaleProducts = async (req, res) => {
  const { code, message } = await SalesService.createSaleProducts(req.body);

  return res.status(code).json(message);
};

// const getProductById = async (req, res) => {
//   const { id } = req.params;

//   const productId = parseInt(id, 10);

//   const { code, message } = await ProductsService.getProductById(productId);

//   return res.status(code).json(message);
// };

// const updateProduct = async (req, res) => {
//   const { name, quantity } = req.body;
//   const { id } = req.params;

//   const productId = parseInt(id, 10);

//   const { code, message } = await ProductsService.updateProduct(name, quantity, productId);

//   return res.status(code).json(message);
// };

// const deleteProduct = async (req, res) => {
//   const { id } = req.params;

//   const productId = parseInt(id, 10);

//   const { code, message } = await ProductsService.deleteProduct(productId);

//   return res.status(code).json(message);
// };

module.exports = {
  createSaleProducts,
//   getAll,
//   createProduct,
//   getProductById,
//   updateProduct,
//   deleteProduct,
};
