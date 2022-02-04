const ProductsModel = require('../models/ProductsModel');
const { validProducts } = require('../schema/ProductsSchema');

const answer = (code, message) => ({
  code,
  message,
});

const createProduct = async (name, quantity) => {
  const validations = await validProducts(name, quantity);
  const invalidItem = validations.find((item) => item.invalid);

  if (invalidItem) return answer(invalidItem.code, { message: invalidItem.message });

  const product = await ProductsModel.createProduct(name, quantity);
  const productAnswer = {
      id: product.insertId,
      name,
      quantity,
  };

  return answer(201, productAnswer);
};

const getProductById = async (id) => {
  const products = await ProductsModel.getAll();
  const productExist = products.find((product) => product.id === id);

  if (!productExist) return answer(404, { message: 'Product not found' });

  return answer(200, productExist);
};

module.exports = {
  createProduct,
  getProductById,
};
