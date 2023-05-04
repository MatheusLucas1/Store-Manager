const { salesModel, saleProductModel } = require('../models');

const getAllSales = async () => {
  const allSales = await salesModel.getAllSales();
  return allSales;
};

const getSaleById = async (id) => {
  const sale = await salesModel.getSaleById(id);

  return sale;
};

const insertSale = async (products) => {
  const agora = new Date();
  const insertSaleId = await salesModel.addSale(agora);
  const arrayPromises = [];
  products.forEach((product) => {
    const { productId, quantity } = product;
    const promise = new Promise((resolve) => {
      saleProductModel.insertSaleProduct(productId, insertSaleId, quantity)
        .then((result) => resolve(result));
    });
    arrayPromises.push(promise);
  });
  await Promise.all(arrayPromises);
  return insertSaleId;
};

module.exports = {
  getAllSales,
  getSaleById,
  insertSale,
};