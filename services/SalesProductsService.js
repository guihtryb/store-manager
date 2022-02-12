const ProductsModel = require('../models/ProductsModel');
const { answer } = require('../schema/ProductsSchema');
// const { answer } = require('../schema/ProductsSchema');
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
  // 1. Pegar produtos da venda
  // 2. achar o produto que será editado
  const productSold = products.find((item) => item.product_id === productId);

  if (!productSold) return answer(404, { message: errors.productNotFound });

  // 3. resgatar a quantidade desse produto que será editado
  const currQuantity = productSold.quantity;
  // 4. Nova quantidade é maior ? type = 'create' : type = 'delete';
  const type = quantity > currQuantity ? 'create' : 'delete';
  // 5. quantity = passar a diferença do maior valor com o menor valor;
  const newQuantity = quantity > currQuantity ? quantity - currQuantity : currQuantity - quantity;

  const update = await updateProductQuantity(productId, newQuantity, type);

  return update;
};

module.exports = {
  updateProductQuantity,
  verifySaleToUpdate,
};
