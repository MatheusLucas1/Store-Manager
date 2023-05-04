const connection = require('../connection/connection');

const getAll = async () => {
  const [sales] = await connection.execute(
    'SELECT * FROM sales_products INNER JOIN sales ON sales_products.sale_id = sales.id;',
  );
  return sales;
};

const getSaleProductById = async (id) => {
  const [sales] = await connection.execute(
    `SELECT sale_id as saleId,
    product_id as productId,
    quantity FROM sales_products WHERE sale_id = ?;`,
    [id],
  );
  return sales;
};

const insertSaleProduct = async (productId, saleId, quantity) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO sales_products (product_id, sale_id, quantity) VALUE (?, ?, ?)',
    [productId, saleId, quantity],
  );
  return insertId;
};

const updateSaleProduct = async (productId, quantity, saleId) => {
  const result = await connection.execute(
    'UPDATE sales_products SET product_id = ?, quantity = ? WHERE product_id = ? AND sale_id = ?',
    [productId, quantity, productId, saleId],
  );
  const [{ insertId }] = result;
  return insertId;
};

module.exports = {
  getAll,
  getSaleProductById,
  insertSaleProduct,
  updateSaleProduct,
};