const ProductService = require('../services/ProductsService');

const getAll = async (_req, res) => {
  const products = await ProductService.getAll();
  res.status(200).json(products);
};

const createProduct = async (req, res) => {
  const { name, quantity } = req.body;

  const product = await ProductService.createProduct(name, quantity);

  if (product.code) return res.status(product.code).json({ message: product.message });

  res.status(201).json(
    {
      id: product.insertId,
      name,
      quantity,
    },
  );
};

module.exports = {
  getAll,
  createProduct,
};
