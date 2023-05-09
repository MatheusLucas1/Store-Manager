const { productModel } = require('../models');

const validateName = (req, res, next) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: '"name" is required' });
  if (name.length < 5) {
    return res
      .status(422)
      .json({ message: '"name" length must be at least 5 characters long' });
  }
  return next();
};

const validateIfExists = async (req, res, next) => {
  const resp = await productModel.getProductById(req.params.id);
  if (!resp) return res.status(404).json({ message: 'Product not found' });
  next();
};

module.exports = { validateName, validateIfExists };