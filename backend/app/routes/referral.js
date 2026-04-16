import express from 'express';
import { getStatus, applyReferral } from '../controllers/referralController.js';

const router = express.Router();

router.get('/status', getStatus);
router.post('/apply', applyReferral);

export default router;
