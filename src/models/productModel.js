const connection = require('./connection');

const getAllProducts = async () => {
  const [products] = await connection.execute('SELECT * FROM products');
  // console.log(products);
  return products;
};

const getProductById = async (id) => {
  const [[products]] = await connection.execute(
    'SELECT * FROM products WHERE id = ?',
    [id],
  );
  console.log(products);
  return products;
};
module.exports = {
  getAllProducts,
  getProductById,
};
