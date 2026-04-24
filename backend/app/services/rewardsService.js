// In-memory store
const userRewards = new Map(); // userId -> { points: 0, history: [] }

const tiers = [
  { name: 'Bronze', threshold: 0, multiplier: 1 },
  { name: 'Silver', threshold: 500, multiplier: 1.2 },
  { name: 'Gold', threshold: 2000, multiplier: 1.5 },
  { name: 'Platinum', threshold: 5000, multiplier: 2 }
];

export const initializeUserRewards = (userId) => {
  if (!userRewards.has(userId)) {
    userRewards.set(userId, {
      points: 0,
      lifetimePoints: 0,
      tier: 'Bronze',
      history: []
    });
  }
  return userRewards.get(userId);
};

export const getPointsBalance = (userId) => {
  const data = initializeUserRewards(userId);
  return { points: data.points, tier: data.tier, lifetimePoints: data.lifetimePoints };
};

export const getPointsHistory = (userId) => {
  const data = initializeUserRewards(userId);
  return data.history;
};

export const getTiers = () => {
  return tiers;
};

export const calculateTier = (lifetimePoints) => {
  let currentTier = tiers[0];
  for (const tier of tiers) {
    if (lifetimePoints >= tier.threshold) {
      currentTier = tier;
    }
  }
  return currentTier.name;
};

export const addPoints = (userId, points, description) => {
    const data = initializeUserRewards(userId);
    data.points += points;
    data.lifetimePoints += points;
    data.tier = calculateTier(data.lifetimePoints);
    data.history.unshift({
        id: Date.now(),
        type: 'earned',
        points,
        description,
        date: new Date().toISOString()
    });
    return data;
};

export const redeemPoints = (userId, points, description) => {
    const data = initializeUserRewards(userId);
    if (data.points < points) {
        throw new Error('Insufficient points');
    }
    data.points -= points;
    data.history.unshift({
        id: Date.now(),
        type: 'redeemed',
        points: -points,
        description,
        date: new Date().toISOString()
    });
    return data;
};
