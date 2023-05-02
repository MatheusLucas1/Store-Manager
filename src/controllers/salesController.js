const { salesServices } = require('../services');

const getAllSales = async (_req, res) => {
  const resp = await salesServices.getAllSales();
  return res.status(200).json(resp);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const sale = await salesServices.getSaleById(id);
  if (!sale) {
    return res.status(404).json({ message: 'Sale not found' });
  }
  return res.status(200).json(sale);
};

const insertSale = async (req, res) => {
  const salesProducts = req.body;
  const insertId = await salesServices.insertSale(salesProducts);
  const result = {
    id: insertId,
    itemsSold: [...salesProducts],
  };
  return res.status(201).json(result);
};

module.exports = { insertSale, getAllSales, getSaleById };