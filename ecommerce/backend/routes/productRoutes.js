const express = require('express');
const { getAllProducts, getProductById, addProduct } = require('../controllers/productControllers');
const router = express.Router();

// Route to get all products
router.get('/all', getAllProducts);

// Route to get a product by ID
router.get('/:id', getProductById);

// Route to add a new product
router.post('/add', addProduct);

module.exports = router;
