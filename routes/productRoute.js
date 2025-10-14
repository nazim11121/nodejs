const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');

router.get('/', ProductController.getAllProducts);
router.get('/:id', ProductController.getProductById);
router.post('/user', ProductController.createProduct);
router.put('/user/:id', ProductController.updateProduct);
router.delete('/user/:id', ProductController.deleteProduct);

module.exports = router;