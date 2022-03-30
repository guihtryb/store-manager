const connection = require('./connection');

const getAll = async () => {
  const query = 'SELECT * FROM StoreManager.products';

  return connection.execute(query);
};

const createProduct = async (name, quantity) => {
  const query = 'INSERT INTO StoreManager.products (name, quantity) VALUES (?,?)';

  const [product] = await connection.execute(query, [name, quantity]);

  return product;
};

const updateProduct = async (name, quantity, id) => {
  const query = 'UPDATE StoreManager.products SET name = ?, quantity = ? WHERE id = ?';

  const [product] = await connection.execute(query, [name, quantity, id]);

  return product;
};

const deleteProduct = async (id) => {
  const query = 'DELETE FROM StoreManager.products WHERE id = ?';

  const [product] = await connection.execute(query, [id]);

  return product;
};

const updateProductQuantity = async (name, quantity) => {
  const query = `
  UPDATE StoreManager.products
  SET quantity = (SELECT quantity WHERE name = ?) + ? WHERE name = ?;`;

  const [updatedQuantity] = await connection.execute(query, [name, quantity, name]);

  return updatedQuantity;
};

module.exports = {
  getAll,
  createProduct,
  updateProduct,
  deleteProduct,
  updateProductQuantity,
};