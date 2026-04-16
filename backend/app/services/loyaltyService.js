const tiers = [
  { name: 'Bronze', threshold: 0, multiplier: 1 },
  { name: 'Silver', threshold: 500, multiplier: 1.2 },
  { name: 'Gold', threshold: 2000, multiplier: 1.5 },
  { name: 'Platinum', threshold: 5000, multiplier: 2 }
];

// In-memory store
const userLoyalty = new Map();

export const initializeUserLoyalty = (userId) => {
  if (!userLoyalty.has(userId)) {
    userLoyalty.set(userId, {
      points: 0,
      tier: 'Bronze',
      lifetimePoints: 0,
      history: []
    });
  }
  return userLoyalty.get(userId);
};

export const getLoyaltyStatus = (userId) => {
  return initializeUserLoyalty(userId);
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

export const awardPoints = (userId, amountSpent, description = 'Purchase Reward') => {
  const loyalty = initializeUserLoyalty(userId);

  // Calculate multiplier based on tier
  const tierConfig = tiers.find(t => t.name === loyalty.tier);
  const pointsToAward = Math.floor(amountSpent * (tierConfig?.multiplier || 1) * 10); // $1 = 10 points * multiplier

  loyalty.points += pointsToAward;
  loyalty.lifetimePoints += pointsToAward;
  loyalty.tier = calculateTier(loyalty.lifetimePoints);

  loyalty.history.unshift({
    id: Date.now(),
    type: 'earn',
    points: pointsToAward,
    date: new Date().toISOString(),
    description
  });

  return { pointsAwarded: pointsToAward, newStatus: loyalty };
};

export const redeemPoints = (userId, pointsToRedeem, description = 'Reward Redeemed') => {
  const loyalty = initializeUserLoyalty(userId);

  if (loyalty.points < pointsToRedeem) {
    throw new Error('Insufficient points');
  }

  loyalty.points -= pointsToRedeem;
  loyalty.history.unshift({
    id: Date.now(),
    type: 'redeem',
    points: -pointsToRedeem,
    date: new Date().toISOString(),
    description
  });

  return loyalty;
};
