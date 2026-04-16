import { getReferralStatus, processReferral } from '../services/referralService.js';

export const getStatus = (req, res) => {
  try {
    const userId = req.user?.id || 1;
    const status = getReferralStatus(userId);
    res.json(status);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const applyReferral = (req, res) => {
  try {
    const userId = req.user?.id || 1;
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({ error: 'Referral code required' });
    }

    const result = processReferral(userId, code);
    if (!result.success) {
      return res.status(400).json({ error: result.error });
    }

    res.json({ success: true, message: 'Referral applied successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
