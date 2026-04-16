import express from 'express';
import * as categoryController from '../controllers/categoryController.js';

const router = express.Router();

router.get('/', categoryController.getCategories);
router.get('/:slug', categoryController.getCategory);

export default router;