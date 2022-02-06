const SalesModel = require('../models/SalesModel');
const { validSales } = require('../schema/SalesSchema');

const validSale = (productId, quantity) => {
  const validations = validSales(productId, quantity);

  const invalidItem = validations.find((item) => item.invalid);

  return invalidItem;
};

const answer = (code, message) => ({
  code,
  message,
});

const registerSaleDate = async () => {
  const { insertId } = await SalesModel.registerSaleDate();

  return ({ insertId });
};

const createSaleProducts = async (productInfos) => {
  const [invalidItem] = productInfos
  .map(({ product_id, quantity }) => validSale(product_id, quantity));
  
  if (invalidItem) return answer(invalidItem.code, { message: invalidItem.message });

  const { insertId } = await registerSaleDate();
  
  productInfos
    .map(async ({ product_id, quantity }) => SalesModel
    .createSaleProducts(insertId, product_id, quantity));
  
    const saleProductAnswer = {
    id: insertId,
    itemsSold: productInfos,
  };

  return answer(201, saleProductAnswer);
};

// const getProductById = async (id) => {
//   const products = await SalesModel.getAll();

//   const productExist = products.find((product) => product.id === id);

//   if (!productExist) return answer(404, { message: 'Product not found' });

//   return answer(200, productExist);
// };

// const updateProduct = async (name, quantity, id) => {
//   const invalidItem = await validProduct(name, quantity, id);

//   if (invalidItem) return answer(invalidItem.code, { message: invalidItem.message });

//   const productSearched = await getProductById(id);

//   if (productSearched.code === 404) return productSearched;

//   await SalesModel.updateProduct(name, quantity, id);

//   return answer(200, ({ id, name, quantity }));
// };

// const deleteProduct = async (id) => {
//   const productSearched = await getProductById(id);

//   if (productSearched.code === 404) return productSearched;

//   await SalesModel.deleteProduct(id);

//   return answer(200, productSearched.message);
// };

module.exports = {
  // registerSaleDate,
  createSaleProducts,
//   createProduct,
//   getProductById,
//   updateProduct,
//   deleteProduct,
};
