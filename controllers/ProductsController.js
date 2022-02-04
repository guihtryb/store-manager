const ProductsService = require('../services/ProductsService');
const ProductsModel = require('../models/ProductsModel');

const getAll = async (_req, res) => {
  const products = await ProductsModel.getAll();
  res.status(200).json(products);
};

const createProduct = async (req, res) => {
  const { name, quantity } = req.body;

  const product = await ProductsService.createProduct(name, quantity);

  if (product.code) return res.status(product.code).json({ message: product.message });

  res.status(201).json(
    {
      id: product.insertId,
      name,
      quantity,
    },
  );
};

const getProductById = async (req, res) => {
  const { id } = req.params;

  const productId = parseInt(id, 10);

  const product = await ProductsService.getProductById(productId);

  if (!product) {
    return res.status(404).json({
      message: 'Product not found',
    });
  }

  return res.status(200).json(product);
};

module.exports = {
  getAll,
  createProduct,
  getProductById,
};
