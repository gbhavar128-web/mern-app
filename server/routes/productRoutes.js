import express from 'express';
import { getProduct, listProducts, rateProduct } from '../controllers/productController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();
router.get('/', listProducts);
router.get('/:id', getProduct);
router.post('/:id/rate', protect, rateProduct);
export default router;
