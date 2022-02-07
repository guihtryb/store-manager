const express = require('express');

const SalesController = require('../controllers/SalesController');

const router = express.Router();

router.post('/', SalesController.createSaleProducts);

router.get('/', SalesController.getAllSales);

router.get('/:id', SalesController.getSaleById);

// router.put('/:id', ProductController.updateProduct);

// router.delete('/:id', ProductController.deleteProduct);

module.exports = router;
