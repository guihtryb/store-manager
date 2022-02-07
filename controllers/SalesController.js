const SalesService = require('../services/SalesService');
const SalesModel = require('../models/SalesModel');

const getAllSales = async (_req, res) => {
  const sales = await SalesModel.getAllSales();
  res.status(200).json(sales);
};

const createSaleProducts = async (req, res) => {
  const { code, message } = await SalesService.createSaleProducts(req.body);

  return res.status(code).json(message);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;

  const productId = parseInt(id, 10);

  const { code, message } = await SalesService.getSaleById(productId);

  return res.status(code).json(message);
};

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
  getAllSales,
  getSaleById,
  createSaleProducts,
//   createProduct,
//   updateProduct,
//   deleteProduct,
};
