// In-memory store
const userGamification = new Map();

export const initializeUserGamification = (userId) => {
  if (!userGamification.has(userId)) {
    userGamification.set(userId, {
      achievements: [],
      streak: 0,
      lastActionDate: null,
      stats: {
        totalOrders: 0,
        farmsBoughtFrom: new Set(),
        productsViewed: new Set(),
        referralCount: 0
      }
    });
  }
  return userGamification.get(userId);
};

export const getGamificationStatus = (userId) => {
  const data = initializeUserGamification(userId);
  // Convert Sets to sizes for JSON serialization
  return {
    ...data,
    stats: {
      ...data.stats,
      farmsBoughtFrom: data.stats.farmsBoughtFrom.size,
      productsViewed: data.stats.productsViewed.size
    }
  };
};

export const updateStreak = (userId) => {
  const data = initializeUserGamification(userId);
  const now = new Date();

  if (!data.lastActionDate) {
    data.streak = 1;
  } else {
    const lastDate = new Date(data.lastActionDate);
    const diffTime = Math.abs(now - lastDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      data.streak += 1;
    } else if (diffDays > 1) {
      data.streak = 1; // reset
    }
  }
  data.lastActionDate = now.toISOString();

  checkAchievements(userId, 'engagement');
  return data.streak;
};

export const processAction = (userId, actionType, payload) => {
  const data = initializeUserGamification(userId);

  switch(actionType) {
    case 'order':
      data.stats.totalOrders += 1;
      if (payload.farms) {
        payload.farms.forEach(f => data.stats.farmsBoughtFrom.add(f));
      }
      break;
    case 'view_product':
      if (payload.productId) data.stats.productsViewed.add(payload.productId);
      break;
    case 'referral':
      data.stats.referralCount += 1;
      break;
  }

  return checkAchievements(userId, actionType);
};

// Internal achievement checker
const checkAchievements = (userId, category) => {
  const data = initializeUserGamification(userId);
  const newAchievements = [];

  const addAchievement = (id, name) => {
    if (!data.achievements.find(a => a.id === id)) {
      data.achievements.push({ id, name, date: new Date().toISOString() });
      newAchievements.push(id);
    }
  };

  if (category === 'order' || category === 'engagement') {
    if (data.stats.totalOrders >= 1) addAchievement('first_purchase', 'First Purchase');
    if (data.stats.totalOrders >= 10) addAchievement('bulk_buyer', 'Bulk Buyer');
    if (data.stats.farmsBoughtFrom.size >= 10) addAchievement('farm_friend', 'Farm Friend');
  }

  if (category === 'referral') {
    if (data.stats.referralCount >= 1) addAchievement('first_referral', 'First Referral');
    if (data.stats.referralCount >= 5) addAchievement('referral_pro', 'Referral Pro');
    if (data.stats.referralCount >= 25) addAchievement('ambassador', 'Ambassador');
  }

  if (category === 'engagement') {
    if (data.streak >= 7) addAchievement('streak_7', '7-Day Streak');
    if (data.streak >= 30) addAchievement('streak_30', '30-Day Streak');
    if (data.stats.productsViewed.size >= 50) addAchievement('product_explorer', 'Product Explorer');
  }

  return newAchievements;
};
