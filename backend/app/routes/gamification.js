import express from 'express';
import { getStatus, checkIn } from '../controllers/gamificationController.js';

const router = express.Router();

router.get('/status', getStatus);
router.post('/checkin', checkIn);

export default router;
