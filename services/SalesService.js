const SalesProductsService = require('./SalesProductsService');
const SalesModel = require('../models/SalesModel');
const { validSales } = require('../schema/SalesSchema');
const { answer } = require('../schema/ProductsSchema');

const validSale = (productId, quantity) => {
  const validations = validSales(productId, quantity);

  const invalidItem = validations.find((item) => item.invalid);

  return invalidItem;
};

const createSale = async (productInfos) => {
  const [invalidItem] = productInfos
  .map(({ product_id, quantity }) => validSale(product_id, quantity));
  
  if (invalidItem) return answer(invalidItem.code, { message: invalidItem.message });

  const updatedProductQuantities = productInfos.map(
    async ({ product_id, quantity }) => SalesProductsService
      .updateProductQuantity(product_id, quantity, 'create'),
    );

  await Promise.all(updatedProductQuantities);

  const error = await updatedProductQuantities[0];

  if (error) return error;

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

  const updatingProductQuantity = await SalesProductsService
    .verifySaleToUpdate(saleSearched.message, newInfos.product_id, newInfos.quantity);

  if (updatingProductQuantity && updatingProductQuantity.code) return updatingProductQuantity;

  await SalesModel.updateSale(newInfos.quantity, saleId, newInfos.product_id);

  const updatedSaleAnswer = {
    saleId,
    itemUpdated: [newInfos],
  };

  return answer(200, updatedSaleAnswer);
};

const deleteSale = async (id) => {
  const saleSearched = await getSaleById(id);

  if (saleSearched.code === 404) return saleSearched;

  const updateProductQuantities = saleSearched.message
    .map(async ({ product_id, quantity }) => SalesProductsService
    .updateProductQuantity(product_id, quantity, 'delete'));

  await Promise.all(updateProductQuantities);

  await SalesModel.deleteSale(id);

  return answer(200, saleSearched.message);
};

module.exports = {
  createSale,
  getSaleById,
  updateSale,
  deleteSale,
};
