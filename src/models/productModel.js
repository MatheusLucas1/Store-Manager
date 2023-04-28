const connection = require('../connection/connection');

const getAllProducts = async () => {
  const [products] = await connection.execute('SELECT * FROM products');
  return products;
};

const getProductById = async (id) => {
  const [products] = await connection.execute(
    'SELECT * FROM products WHERE id = ?',
    [id],
  );
  return products[0];
};

const addProduct = async (productName) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO products (name) VALUE (?)',
    [productName],
  );

  return insertId;
};

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
};
