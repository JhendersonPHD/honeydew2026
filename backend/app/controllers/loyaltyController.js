import { getLoyaltyStatus, awardPoints, redeemPoints } from '../services/loyaltyService.js';

export const getStatus = (req, res) => {
  try {
    const userId = req.user?.id || 1; // Fallback to mock user ID
    const status = getLoyaltyStatus(userId);
    res.json(status);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const redeem = (req, res) => {
  try {
    const userId = req.user?.id || 1;
    const { points, rewardId } = req.body;

    if (!points) {
      return res.status(400).json({ error: 'Points amount required' });
    }

    const updatedLoyalty = redeemPoints(userId, points, `Redeemed Reward ${rewardId || ''}`);
    res.json(updatedLoyalty);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
