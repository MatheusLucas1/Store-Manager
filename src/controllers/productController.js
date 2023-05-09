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

const addProduct = async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: '"name" is required' });
  }
  if (name.length < 5) {
    return res.status(422).json({ message: '"name" length must be at least 5 characters long' });
  }
  const insertId = await productService.addProduct(name);
  return res.status(201).json({ name, id: insertId });
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  await productService.updateProduct(id, name);
  return res.status(200).json({
    id,
    name,
  });
};

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct, 
};
