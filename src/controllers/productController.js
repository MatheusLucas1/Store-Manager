const productService = require('../services/productService');

const getAllProducts = async (req, res) => {
  const products = await productService.getAllProducts();
  return res.status(200).json(products);
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productService.getProductById(id);
  if (type) return res.status(404).json({ message: 'Product not found' });
  
  res.status(200).json(message);
};

const createProduct = async (req, res) => {
  const { name } = req.body;

  const { type, message } = await productService.createNewProduct(name);

  if (type === 'NAME_REQUIRED') return res.status(400).json(message);
  if (type === 'INVALID_LENGTH') return res.status(422).json(message);
  res.status(201).json(message);
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
};
