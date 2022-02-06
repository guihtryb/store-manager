const ProductsModel = require('../models/ProductsModel');
const { validProducts } = require('../schema/ProductsSchema');

const validProduct = async (name, quantity, id) => {
  const validations = await validProducts(name, quantity, id);

  const invalidItem = validations.find((item) => item.invalid);

  return invalidItem;
};

const answer = (code, message) => ({
  code,
  message,
});

const createProduct = async (name, quantity) => {
  const products = await ProductsModel.getAll();

  const defaultId = products.length - 1;

  const invalidItem = await validProduct(name, quantity, defaultId);

  if (invalidItem) return answer(invalidItem.code, { message: invalidItem.message });

  const product = await ProductsModel.createProduct(name, quantity);

  return answer(201, ({ id: product.insertId, name, quantity }));
};

const getProductById = async (id) => {
  const products = await ProductsModel.getAll();

  const productExist = products.find((product) => product.id === id);

  if (!productExist) return answer(404, { message: 'Product not found' });

  return answer(200, productExist);
};

const updateProduct = async (name, quantity, id) => {
  const invalidItem = await validProduct(name, quantity, id);

  if (invalidItem) return answer(invalidItem.code, { message: invalidItem.message });

  const productSearched = await getProductById(id);

  if (productSearched.code === 404) return productSearched;

  await ProductsModel.updateProduct(name, quantity, id);

  return answer(200, ({ id, name, quantity }));
};

const deleteProduct = async (id) => {
  const productSearched = await getProductById(id);

  if (productSearched.code === 404) return productSearched;

  await ProductsModel.deleteProduct(id);

  return answer(200, productSearched.message);
};

module.exports = {
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};
