const connection = require('./connection');

// const serialize = (data) => ({ data });

const getAll = async () => {
  const query = 'SELECT * FROM StoreManager.products';
  const [products] = await connection.execute(query);
  return products;
};

const createProduct = async (name, quantity) => {
  const query = 'INSERT INTO StoreManager.products (name, quantity) VALUES (?,?)';
  const [product] = await connection.execute(query, [name, quantity]);

  return product;
};

module.exports = {
  getAll,
  createProduct,
};