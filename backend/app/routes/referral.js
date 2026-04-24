import express from 'express';
import { getStatus, applyReferral, getStats } from '../controllers/referralController.js';

const router = express.Router();

router.get('/status', getStatus);
router.post('/apply', applyReferral);
router.get('/stats', getStats);

export default router;
