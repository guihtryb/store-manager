const SalesService = require('../services/SalesService');
const SalesModel = require('../models/SalesModel');

const getAllSales = async (_req, res) => {
  const sales = await SalesModel.getAllSales();

  return res.status(200).json(sales);
};

const createSale = async (req, res) => {
  const { code, message } = await SalesService.createSale(req.body);

  return res.status(code).json(message);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;

  const saleId = parseInt(id, 10);

  const { code, message } = await SalesService.getSaleById(saleId);

  return res.status(code).json(message);
};

const updateSale = async (req, res) => {
  const [productInfos] = req.body;
  const { id } = req.params;

  const saleId = parseInt(id, 10);

  const { code, message } = await SalesService.updateSale(productInfos, saleId);

  return res.status(code).json(message);
};

// const deleteProduct = async (req, res) => {
//   const { id } = req.params;

//   const productId = parseInt(id, 10);

//   const { code, message } = await ProductsService.deleteProduct(productId);

//   return res.status(code).json(message);
// };

module.exports = {
  getAllSales,
  getSaleById,
  createSale,
  updateSale,
//   deleteProduct,
};
