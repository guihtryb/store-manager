const ProductsModel = require('../models/ProductsModel');
const { answer } = require('../schema/ProductsSchema');
const ProductsService = require('./ProductsService');

const errors = {
  amountForbbiden: 'Such amount is not permitted to sell',
  productNotFound: 'We could not found this product in the sale referred',
};

const updateProductQuantity = async (productId, quantity, type) => {
  const { message: product } = await ProductsService.getProductById(productId);

  if (type === 'delete') {
    await ProductsModel.updateProductQuantity(product.name, quantity);
  }

  if (type === 'create') {
    if (product.quantity < quantity) return answer(422, { message: errors.amountForbbiden });
      await ProductsModel.updateProductQuantity(product.name, -quantity);
  }
};

const verifySaleToUpdate = async (products, productId, quantity) => {
  const productSold = products.find((item) => item.product_id === productId);

  if (!productSold) return answer(404, { message: errors.productNotFound });

  const currQuantity = productSold.quantity;

  const type = quantity > currQuantity ? 'create' : 'delete';

  const newQuantity = quantity > currQuantity ? quantity - currQuantity : currQuantity - quantity;

  const update = await updateProductQuantity(productId, newQuantity, type);

  return update;
};

module.exports = {
  updateProductQuantity,
  verifySaleToUpdate,
};
