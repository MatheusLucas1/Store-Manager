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

const addProduct = async (productName) => {
  const insertId = await productModel.addProduct(productName);
  return insertId;
};

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
};
