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

const createSale = async (saleProducts) => {
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

const updateSale = async (productId, quantity, id) => {
  const query = 'UPDATE StoreManager.sales_products SET product_id = ?, quantity = ? WHERE id = ?';

  const [sale] = await connection.execute(query, [productId, quantity, id]);

  return sale;
};

// const deleteProduct = async (id) => {
//   const query = 'DELETE FROM StoreManager.products WHERE id = ?';

//   const [product] = await connection.execute(query, [id]);

//   return product;
// };

module.exports = {
  getAllSales,
  getSaleById,
  createSale,
  updateSale,
//   deleteProduct,
};
