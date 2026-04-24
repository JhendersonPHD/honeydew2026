// In-memory store
const userPreferences = new Map(); // userId -> prefs
const stockAlerts = []; // { id, userId, productId, email, notified, created_at }

export const getUserPreferences = (userId) => {
  if (!userPreferences.has(userId)) {
    userPreferences.set(userId, {
      order_updates: true,
      promotions: false,
      farm_news: true,
      back_in_stock: true
    });
  }
  return userPreferences.get(userId);
};

export const updatePreferences = (userId, updates) => {
  const current = getUserPreferences(userId);
  const updated = { ...current, ...updates };
  userPreferences.set(userId, updated);
  return updated;
};

export const createStockAlert = (userId, productId, email) => {
  const newAlert = {
    id: Date.now(),
    userId,
    productId,
    email,
    notified: false,
    created_at: new Date().toISOString()
  };
  stockAlerts.push(newAlert);
  return newAlert;
};
