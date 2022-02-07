const connection = require('./connection');

const getAllSales = async () => {
  const salesProductsQuery = `
  SELECT s.id AS saleId, s.date, sp.product_id, sp.quantity
  FROM
    StoreManager.sales_products AS sp
  INNER JOIN
  StoreManager.sales AS s
  ON
  sp.sale_id = s.id;`;

  const [salesProducts] = await connection.execute(salesProductsQuery);

  return salesProducts;
};

const getSaleById = async (id) => {
  const salesProductsQuery = `
  SELECT s.date, sp.product_id, sp.quantity
  FROM
    StoreManager.sales_products AS sp
  INNER JOIN
  StoreManager.sales AS s
  ON
  sp.sale_id = s.id
  WHERE s.id = ?;`;

  const [salesProducts] = await connection.execute(salesProductsQuery, [id]);

  return salesProducts;
};

const createSaleProducts = async (saleProducts) => {
  const saleDateQuery = 'INSERT INTO StoreManager.sales () VALUES ()';

  const [{ insertId }] = await connection.execute(saleDateQuery);

  const sales = saleProducts.map(async ({ product_id: productId, quantity }) => connection
  .execute(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?,?,?)',
    [insertId, productId, quantity],
  ));

  await Promise.all(sales);

  return insertId;
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
  getAllSales,
  getSaleById,
  createSaleProducts,
//   updateProduct,
//   deleteProduct,
};
