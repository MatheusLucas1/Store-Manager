const express = require('express');
const { salesController } = require('../controllers');
const {
  validateSaleFields,
  validateSaleQuantity,
  validateSalesProducts,
  validateSaleId } = require('../middlewares/salesValidation');

const router = express.Router();

router.get('/:id', validateSaleId, salesController.getSaleById);
router.get('/', salesController.getAllSales);

router.post(
  '/',
  validateSaleFields,
  validateSaleQuantity,
  validateSalesProducts,
  salesController.insertSale,
);

module.exports = router;