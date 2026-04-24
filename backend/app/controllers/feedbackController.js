import { submitNpsScore, submitProductFeedback, getFeedbackTypes } from '../services/feedbackService.js';

export const submitNps = (req, res) => {
  try {
    const userId = req.user?.id || 1;
    const { score, comments } = req.body;

    if (score === undefined || score < 1 || score > 10) {
        return res.status(400).json({ error: 'Valid NPS score (1-10) is required' });
    }

    const feedback = submitNpsScore(userId, score, comments);
    res.json({ success: true, feedback });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const submitProduct = (req, res) => {
  try {
    const userId = req.user?.id || 1;
    const { productId, rating, review } = req.body;

    if (!productId || !rating) {
        return res.status(400).json({ error: 'Product ID and rating are required' });
    }

    const feedback = submitProductFeedback(userId, productId, rating, review);
    res.json({ success: true, feedback });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getTypes = (req, res) => {
  try {
    const types = getFeedbackTypes();
    res.json(types);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
