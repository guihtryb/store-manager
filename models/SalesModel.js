const connection = require('./connection');

// // const serialize = (data) => ({ data });

const getAll = async () => {
  const query = 'SELECT * FROM StoreManager.sales';

  const [sales] = await connection.execute(query);

  return sales;
};

// const registerSaleDate = async () => {
//   const saleDateQuery = 'INSERT INTO StoreManager.sales VALUES ()';

//   const [saleDate] = await connection.execute(saleDateQuery);

//   return saleDate;
// };

const createSaleProducts = async (productId, quantity) => {
  const saleDateQuery = 'INSERT INTO StoreManager.sales VALUES ()';

  const [{ insertId }] = await connection.execute(saleDateQuery);

  const [saleProductQuantity] = await connection
    .execute(
      'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?,?,?)',
      [insertId, productId, quantity],
    );

  return saleProductQuantity;
};
// const updateProduct = async (name, quantity, id) => {
//   const query = 'UPDATE StoreManager.products SET name = ?, quantity = ? WHERE id = ?';

//   const [product] = await connection.execute(query, [name, quantity, id]);

//   return product;
// };

// const deleteProduct = async (id) => {
//   const query = 'DELETE FROM StoreManager.products WHERE id = ?';

//   const [product] = await connection.execute(query, [id]);

//   return product;
// };

module.exports = {
  getAll,
  // registerSaleDate,
  createSaleProducts,
//   updateProduct,
//   deleteProduct,
};
