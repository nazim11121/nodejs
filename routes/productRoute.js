const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');
const verifyToken = require('../middleware/authMiddleware');

router.get('/products', verifyToken, ProductController.getAllProducts);
router.get('/products/:id', verifyToken, ProductController.getProductById);
router.post('/products', verifyToken, ProductController.createProduct);
router.put('/products/:id', verifyToken, ProductController.updateProduct);
router.delete('/products/:id', verifyToken, ProductController.deleteProduct);

module.exports = router;