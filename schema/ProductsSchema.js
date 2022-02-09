const { getAll } = require('../models/ProductsModel');

const answer = (code, message) => ({
  code,
  message,
});

const errors = {
  nameMustBeAString: 'name must be a string',
  nameIsToShort: '"name" length must be at least 5 characters long',
  nameAlrealdyExists: 'Product already exists',
  nameIsRequired: '"name" is required',
  quantityIsRequired: '"quantity" is required',
  quantityNumberConstraints: '"quantity" must be a number larger than or equal to 1',
};

const valueWasNotPassed = (value) => (value === undefined || value === null);
const valueTypeIncorrect = (value, type) => (typeof value !== typeof type);
const nameHasNotTheCorrectLength = (name = '', min) => (name.length < min);

const nameIsNotUnique = async (name, id) => {
  const [products] = await getAll();

  const alreadyExists = products.find((product) => product.name === name && product.id !== id);

  if (alreadyExists) return true;

  return false;
};

const nameIsNotUniqueFirstCreate = async (name, id) => {
  const [products] = await getAll();

  if (products.length === 1) {
    const alreadyExists = products.find((product) => product.name === name && product.id !== id);
    if (alreadyExists) return true;
  }
  return false;
};

const quantityIncorrect = (value, min) => value < min;

const validProducts = async (name, quantity, id) => [
  { invalid: valueWasNotPassed(name), code: 400, message: errors.nameIsRequired },
  { invalid: valueTypeIncorrect(name, ''), code: 422, message: errors.nameMustBeAString },
  { invalid: nameHasNotTheCorrectLength(name, 5), code: 422, message: errors.nameIsToShort },
  {
    invalid: await nameIsNotUniqueFirstCreate(name, id),
     code: 409,
     message: errors.nameAlrealdyExists,
  },
  { invalid: await nameIsNotUnique(name, id), code: 409, message: errors.nameAlrealdyExists },
  { invalid: valueWasNotPassed(quantity), code: 400, message: errors.quantityIsRequired },
  {
    invalid: valueTypeIncorrect(quantity, 1) || quantityIncorrect(quantity, 1),
    code: 422,
    message: errors.quantityNumberConstraints,
  },
];

const validProduct = async (name, quantity, id) => {
  const validations = await validProducts(name, quantity, id);

  const invalidItem = validations.find((item) => item.invalid);

  return invalidItem;
};

const getProductById = async (id) => {
  const [products] = await getAll();

  const productExist = products.find((product) => product.id === id);

  if (!productExist) return answer(404, { message: 'Product not found' });

  return answer(200, productExist);
};

module.exports = { 
  validProducts,
  validProduct,
  getProductById,
  answer,
};
