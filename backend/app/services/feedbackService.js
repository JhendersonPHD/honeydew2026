// In-memory store
const npsFeedback = []; // { id, userId, score, comments, created_at }
const productFeedback = []; // { id, userId, productId, rating, review, created_at }

export const submitNpsScore = (userId, score, comments) => {
  const newFeedback = {
    id: Date.now(),
    userId,
    score,
    comments,
    created_at: new Date().toISOString()
  };
  npsFeedback.push(newFeedback);
  return newFeedback;
};

export const submitProductFeedback = (userId, productId, rating, review) => {
  const newFeedback = {
    id: Date.now(),
    userId,
    productId,
    rating,
    review,
    created_at: new Date().toISOString()
  };
  productFeedback.push(newFeedback);
  return newFeedback;
};

export const getFeedbackTypes = () => {
  return [
    { id: 'nps', name: 'Net Promoter Score', description: 'Rate your overall experience' },
    { id: 'product', name: 'Product Review', description: 'Review a specific product' }
  ];
};
