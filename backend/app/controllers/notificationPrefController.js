import { getUserPreferences, updatePreferences, createStockAlert } from '../services/notificationPrefService.js';

export const getPreferences = (req, res) => {
  try {
    const userId = req.user?.id || 1;
    const prefs = getUserPreferences(userId);
    res.json(prefs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updatePrefs = (req, res) => {
  try {
    const userId = req.user?.id || 1;
    const updates = req.body;

    const updated = updatePreferences(userId, updates);
    res.json({ success: true, preferences: updated });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const signupStockAlert = (req, res) => {
  try {
    const userId = req.user?.id || 1;
    const { productId, email } = req.body;

    if (!productId || !email) {
        return res.status(400).json({ error: 'Product ID and email are required' });
    }

    const alert = createStockAlert(userId, productId, email);
    res.json({ success: true, alert });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
