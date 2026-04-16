import { getGamificationStatus, updateStreak } from '../services/gamificationService.js';

export const getStatus = (req, res) => {
  try {
    const userId = req.user?.id || 1;
    const status = getGamificationStatus(userId);
    res.json(status);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const checkIn = (req, res) => {
  try {
    const userId = req.user?.id || 1;
    const newStreak = updateStreak(userId);
    res.json({ streak: newStreak, success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
