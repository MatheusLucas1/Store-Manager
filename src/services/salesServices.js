const { salesModel, saleProductModel } = require('../models');

const getAllSales = async () => {
  let allSales = await salesModel.getAllSales();
  allSales = allSales.map((sale) => ({
    saleId: sale.sale_id,
    date: sale.date,
    quantity: sale.quantity,
    productId: sale.product_id,
  }));
  return allSales;
};

const getSaleById = async (id) => {
  let sale = await salesModel.getSaleById(id);
  sale = sale.map((sa) => ({
    date: sa.date,
    quantity: sa.quantity,
    productId: sa.product_id,
  }));
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