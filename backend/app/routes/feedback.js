import express from 'express';
import { submitNps, submitProduct, getTypes } from '../controllers/feedbackController.js';

const router = express.Router();

router.post('/nps', submitNps);
router.post('/product', submitProduct);
router.get('/types', getTypes);

export default router;
