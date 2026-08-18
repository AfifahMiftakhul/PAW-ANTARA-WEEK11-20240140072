const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/product.controller');
const { requireAdmin } = require('../middlewares/auth.middleware');

// Public routes
router.get('/', getProducts);
router.get('/:id', getProductById);

// Protected routes (Admin)
router.post('/', requireAdmin, createProduct);
router.put('/:id', requireAdmin, updateProduct);
router.delete('/:id', requireAdmin, deleteProduct);

module.exports = router;