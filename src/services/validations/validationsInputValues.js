const { idSchema, addProductSchema } = require('./schemas');

const validateId = (id) => {
  const { error } = idSchema.validate(id);
  if (error) return { type: 'INVALID_VALUE', message: '"id" must be a number' };

  return { type: null, message: '' };
};

const validateNewProduct = (name) => {
  const { error } = addProductSchema
    .validate({ name });
  if (!error.name) return { type: 'NAME_REQUIRED', message: '"name" is required' };
  if (error.name.length < 5) {
    return { type: 'INVALID_LENGTH', message: '"name" length must be at least 5 characters long' };
  }
  return { type: null, message: '' };
};

module.exports = {
  validateId,
  validateNewProduct,
};