const errors = {
  productIdIsRequired: '"product_id" is required',
  quantityIsRequired: '"quantity" is required',
  quantityNumberConstraints: '"quantity" must be a number larger than or equal to 1',
};

const valueWasNotPassed = (value) => (value === undefined || value === null);
const valueTypeIncorrect = (value, type) => (typeof value !== typeof type);

const quantityIncorrect = (value, min) => value < min;

const validSales = (productId, quantity) => [
  { invalid: valueWasNotPassed(productId), code: 400, message: errors.productIdIsRequired },
  { invalid: valueWasNotPassed(quantity), code: 400, message: errors.quantityIsRequired },
  {
    invalid: valueTypeIncorrect(quantity, 1) || quantityIncorrect(quantity, 1),
    code: 422,
    message: errors.quantityNumberConstraints,
  },
];

module.exports = { validSales };
