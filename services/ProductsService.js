const ProductsModel = require('../models/ProductsModel');
const ProductsSchema = require('../schema/ProductsSchema');

const createProduct = async (name, quantity) => {
  const [products] = await ProductsModel.getAll();

  const defaultId = products.length + 1;

  const invalidItem = await ProductsSchema.validProduct(name, quantity, defaultId);

  if (invalidItem) return ProductsSchema.answer(invalidItem.code, { message: invalidItem.message });

  const product = await ProductsModel.createProduct(name, quantity);

  return ProductsSchema.answer(201, ({ id: product.insertId, name, quantity }));
};

const getProductById = async (id) => {
  const [products] = await ProductsModel.getAll();

  const productExist = products.find((product) => product.id === id);

  if (!productExist) return ProductsSchema.answer(404, { message: 'Product not found' });

  return ProductsSchema.answer(200, productExist);
};

const updateProduct = async (name, quantity, id) => {
  const invalidItem = await ProductsSchema.validProduct(name, quantity, id);

  if (invalidItem) return ProductsSchema.answer(invalidItem.code, { message: invalidItem.message });

  const productSearched = await ProductsSchema.getProductById(id);

  if (productSearched.code === 404) return productSearched;

  await ProductsModel.updateProduct(name, quantity, id);

  return ProductsSchema.answer(200, ({ id, name, quantity }));
};

const deleteProduct = async (id) => {
  const productSearched = await ProductsSchema.getProductById(id);

  if (productSearched.code === 404) return productSearched;

  await ProductsModel.deleteProduct(id);

  return ProductsSchema.answer(200, productSearched.message);
};

module.exports = {
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};
