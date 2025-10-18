const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const ProductController = require('../controllers/ProductController');
const verifyToken = require('../middleware/authMiddleware');

// Configure multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

router.get('/products', verifyToken, ProductController.getAllProducts);
router.get('/products/:id', verifyToken, ProductController.getProductById);
router.post('/products', verifyToken, upload.single('image'), ProductController.createProduct);
router.put('/products/:id', verifyToken, upload.single('image'), ProductController.updateProduct);
router.delete('/products/:id', verifyToken, ProductController.deleteProduct);

module.exports = router;