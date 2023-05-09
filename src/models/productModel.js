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

const updateProduct = async (id, name) => {
  const [product] = await connection.execute(
    'UPDATE StoreManager.products SET name = ? WHERE id = ?;',
    [name, id],
  );
  return product;
};

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
};
