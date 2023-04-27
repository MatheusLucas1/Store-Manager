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

const insert = async (product) => {
  const columns = Object.keys(product).join(', ');

  const placeholders = Object.keys(product)
    .map((_key) => '?')
    .join(', ');

  const [{ insertId }] = await connection.execute(
    `INSERT INTO products (${columns}) VALUE (${placeholders})`,
    [...Object.values(product)],
  );

  return insertId;
};

module.exports = {
  getAllProducts,
  getProductById,
  insert,
};
