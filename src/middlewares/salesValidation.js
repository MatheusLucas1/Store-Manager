const { productServices } = require('../services');

const validateSaleFields = (req, res, next) => {
  const requiredFields = ['productId', 'quantity'];
  const sales = req.body;
  const notHasField = requiredFields.find((property) => sales.some((sale) => !(property in sale)));
  if (notHasField) {
    return res.status(400).json({ message: `"${notHasField}" is required` });
  }
  return next();
};

const validateSalesProducts = async (req, res, next) => {
  const sales = req.body;
  const products = await productServices.getAllProducts();
  const hasInvalidProduct = sales.some((sale) => {
    const product = products.find((p) => p.id === sale.productId);
    return product === undefined;
  });

  if (hasInvalidProduct) {
    return res.status(404).json({ message: 'Product not found' });
  }

  return next();
};

const validateSaleQuantity = (req, res, next) => {
  const sales = req.body;
  const hasInvalidQuantity = sales.some((sale) => sale.quantity < 1);

  if (hasInvalidQuantity) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }

  return next();
};

module.exports = {
  validateSalesProducts,
  validateSaleFields,
  validateSaleQuantity,
};