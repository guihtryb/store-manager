const express = require('express');

const ProductController = require('../controllers/ProductsController');

const router = express.Router();

router.get('/', ProductController.getAll);

router.post('/', ProductController.createProduct);

router.get('/:id', ProductController.getProductById);

router.put('/:id', ProductController.updateProduct);

module.exports = router;
