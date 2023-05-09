const express = require('express');
const productController = require('../controllers/productController');
const { validateIfExists, validateName } = require('../middlewares/productsValidation');

const router = express.Router();

router.get('/', productController.getAllProducts);

router.get('/:id', productController.getProductById);

router.post('/', productController.addProduct);

router.put('/:id', validateIfExists, validateName, productController.updateProduct);

module.exports = router;