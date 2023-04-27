const productModel = require('../models/productModel');
const schema = require('./validations/validationsInputValues');

const getAllProducts = async () => {
  const products = await productModel.getAllProducts();
  return products;
};

const getProductById = async (id) => {
  const error = schema.validateId(id);
  if (error.type) return error;
  const products = await productModel.getProductById(id);
  if (!products) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

  return { type: null, message: products };
};

const createNewProduct = async (name) => {
  const error = schema.validateNewProduct(name);
  if (error.type) return error;
  const newProductId = await productModel.insert({ name });
  const newProduct = await productModel.findById(newProductId);

  return { type: null, message: newProduct };
};

module.exports = {
  getAllProducts,
  getProductById,
  createNewProduct,
};
