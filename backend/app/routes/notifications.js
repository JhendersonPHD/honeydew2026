import express from 'express';
import { getPreferences, updatePrefs, signupStockAlert } from '../controllers/notificationPrefController.js';

const router = express.Router();

router.get('/preferences', getPreferences);
router.put('/preferences', updatePrefs);
router.post('/stock-alert', signupStockAlert);

export default router;
