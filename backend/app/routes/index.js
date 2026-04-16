import express from 'express';
import authRoutes from './auth.js';
import farmRoutes from './farms.js';
import productRoutes from './products.js';
import categoryRoutes from './categories.js';
import cartRoutes from './cart.js';
import orderRoutes from './orders.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/farms', farmRoutes);
router.use('/products', productRoutes);
router.use('/categories', categoryRoutes);
router.use('/cart', cartRoutes);
router.use('/orders', orderRoutes);

export default router;