const express = require('express');

const ProductController = require('../controllers/ProductsController');

const router = express.Router();

router.post('/', ProductController.createProduct);

router.get('/', ProductController.getAll);

router.get('/:id', ProductController.getProductById);

router.put('/:id', ProductController.updateProduct);

router.delete('/:id', ProductController.deleteProduct);

module.exports = router;
