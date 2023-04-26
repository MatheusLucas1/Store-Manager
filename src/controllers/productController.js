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
module.exports = {
  getAllProducts,
  getProductById,
};
