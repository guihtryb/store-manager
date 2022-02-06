const express = require('express');

const SalesController = require('../controllers/SalesController');

const router = express.Router();

router.post('/', SalesController.createSaleProducts);

// router.get('/', ProductController.getAll);

// router.get('/:id', ProductController.getProductById);

// router.put('/:id', ProductController.updateProduct);

// router.delete('/:id', ProductController.deleteProduct);

module.exports = router;