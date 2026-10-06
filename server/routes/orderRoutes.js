import express from 'express';
import { createOrder, myOrders } from '../controllers/orderController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();
router.post('/', protect, createOrder);
router.get('/mine', protect, myOrders);
export default router;
