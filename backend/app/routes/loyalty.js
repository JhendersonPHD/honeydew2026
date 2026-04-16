import express from 'express';
import { getStatus, redeem } from '../controllers/loyaltyController.js';
// Note: In real app, we'd import 'authenticate' middleware here, but we'll bypass or stub for mock setup if not passed via server.js

const router = express.Router();

router.get('/status', getStatus);
router.post('/redeem', redeem);

export default router;
