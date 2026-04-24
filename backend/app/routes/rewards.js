import express from 'express';
import { getBalance, getHistory, getTiersInfo } from '../controllers/rewardsController.js';

const router = express.Router();

router.get('/balance', getBalance);
router.get('/history', getHistory);
router.get('/tiers', getTiersInfo);

export default router;
