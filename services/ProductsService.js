const ProductsModel = require('../models/ProductsModel');
const { validProducts } = require('../schema/ProductsSchema');

// const getAll = async () => {
//   const products = await ProductsModel.getAll();

//   return products;
// };

const createProduct = async (name, quantity) => {
  const validations = await validProducts(name, quantity);
  const invalid = validations.find((item) => item.invalid);

  if (invalid) return invalid;

  const product = await ProductsModel.createProduct(name, quantity);

  return product;
};

module.exports = {
  // getAll,
  createProduct,
};
