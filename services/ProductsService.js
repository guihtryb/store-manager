const ProductsModel = require('../models/ProductsModel');
const { validProducts } = require('../schema/ProductsSchema');

const createProduct = async (name, quantity) => {
  const validations = await validProducts(name, quantity);
  const invalid = validations.find((item) => item.invalid);

  if (invalid) return invalid;

  const product = await ProductsModel.createProduct(name, quantity);

  return product;
};

const getProductById = async (id) => {
  const products = await ProductsModel.getAll();
  const productExist = products.find((product) => product.id === id);

  if (!productExist) return false;

  return productExist;
};

module.exports = {
  createProduct,
  getProductById,
};
