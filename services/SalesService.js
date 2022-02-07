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

const createSale = async (productInfos) => {
  const [invalidItem] = productInfos
  .map(({ product_id, quantity }) => validSale(product_id, quantity));
  
  if (invalidItem) return answer(invalidItem.code, { message: invalidItem.message });

  const insertId = await SalesModel.createSale(productInfos);

    const saleProductAnswer = {
    id: insertId,
    itemsSold: productInfos,
  };

  return answer(201, saleProductAnswer);
};

const getSaleById = async (id) => {
  const sales = await SalesModel.getAllSales();

  const saleExist = sales.filter((sale) => sale.saleId === id);

  if (!saleExist.length) return answer(404, { message: 'Sale not found' });

  const saleById = await SalesModel.getSaleById(id);

  return answer(200, saleById);
};

const updateSale = async (newInfos, saleId) => {
  const invalidItem = validSale(newInfos.product_id, newInfos.quantity);

  if (invalidItem) return answer(invalidItem.code, { message: invalidItem.message });

  const saleSearched = await getSaleById(saleId);

  if (saleSearched.code === 404) return saleSearched;

  await SalesModel.updateSale(newInfos.quantity, saleId, newInfos.product_id);

  const updatedSaleAnswer = {
    saleId,
    itemUpdated: [newInfos],
  };

  return answer(200, updatedSaleAnswer);
};

// const deleteProduct = async (id) => {
//   const productSearched = await getProductById(id);

//   if (productSearched.code === 404) return productSearched;

//   await SalesModel.deleteProduct(id);

//   return answer(200, productSearched.message);
// };

module.exports = {
  createSale,
  getSaleById,
  updateSale,
//   deleteProduct,
};
