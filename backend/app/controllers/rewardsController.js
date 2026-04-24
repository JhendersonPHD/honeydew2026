import { getPointsBalance, getPointsHistory, getTiers } from '../services/rewardsService.js';

export const getBalance = (req, res) => {
  try {
    const userId = req.user?.id || 1;
    const balance = getPointsBalance(userId);
    res.json(balance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getHistory = (req, res) => {
  try {
    const userId = req.user?.id || 1;
    const history = getPointsHistory(userId);
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getTiersInfo = (req, res) => {
  try {
    const tiers = getTiers();
    res.json(tiers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
