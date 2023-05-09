const connection = require('../connection/connection');

const getAllSales = async () => {
  const [sales] = await connection.execute(
    `SELECT 
      product_id as productId, date, sale_id as saleId, quantity
      FROM sales_products INNER JOIN sales ON sales_products.sale_id = sales.id;`,
  );
  return sales;
}; 

const getSaleById = async (id) => {
  const [sale] = await connection.execute(
    `SELECT product_id as productId, date, quantity 
      FROM sales_products INNER JOIN sales ON sales_products.sale_id = sales.id WHERE sale_id = ?;`,
    [id],
  );
  return sale;
};

const addSale = async (date) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO sales (date) VALUE (?)',
    [date],
  );

  return insertId;
};

module.exports = {
  getAllSales,
  getSaleById,
  addSale,
};