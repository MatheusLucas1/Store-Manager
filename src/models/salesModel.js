const connection = require('../connection/connection');

const getAllSales = async () => {
  const [sales] = await connection.execute(
    'SELECT id as saleId, date FROM sales;',
  );
  return sales;
};

const getSaleById = async (id) => {
  const [sale] = await connection.execute(
    'SELECT id as saleId, date FROM sales WHERE id = ?;',
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