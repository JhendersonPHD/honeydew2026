import express from 'express';
import * as farmController from '../controllers/farmController.js';

const router = express.Router();

router.get('/', farmController.getFarms);
router.get('/:slug', farmController.getFarm);
router.get('/:slug/products', farmController.getProductsForFarm);

export default router;