const connection = require('./connection');

const serialize = (data) => ({ data });

const getAll = async () => {
  const query = '';
  const [model] = await connection.execute(query);
  return model.map(serialize);
};

module.exports = {
  getAll,
};
