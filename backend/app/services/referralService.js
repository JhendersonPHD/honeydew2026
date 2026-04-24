import crypto from 'crypto';

// In-memory store
const referralCodes = new Map(); // code -> { userId }
const userReferrals = new Map(); // userId -> { code, referrals: [], rewards: [] }

export const initializeUserReferral = (userId) => {
  if (!userReferrals.has(userId)) {
    const newCode = `HD${crypto.randomBytes(3).toString('hex').toUpperCase()}`;
    userReferrals.set(userId, {
      code: newCode,
      referrals: [], // Array of referred userIds
      rewards: []
    });
    referralCodes.set(newCode, { userId });
  }
  return userReferrals.get(userId);
};

export const getReferralStatus = (userId) => {
  return initializeUserReferral(userId);
};

export const getReferralStats = (userId) => {
  const data = initializeUserReferral(userId);
  return {
    code: data.code,
    count: data.referrals.length,
    rewards: data.rewards
  };
};

export const processReferral = (newUserId, referralCode) => {
  const referrer = referralCodes.get(referralCode);
  if (!referrer) {
    return { success: false, error: 'Invalid referral code' };
  }

  if (referrer.userId === newUserId) {
    return { success: false, error: 'Cannot refer yourself' };
  }

  const referrerData = userReferrals.get(referrer.userId);
  if (referrerData && !referrerData.referrals.includes(newUserId)) {
    referrerData.referrals.push(newUserId);

    // Award reward to referrer (e.g., store credit or points)
    referrerData.rewards.unshift({
      id: Date.now(),
      type: 'referral_bonus',
      amount: 1000, // E.g., 1000 points
      date: new Date().toISOString()
    });

    return { success: true, referrerId: referrer.userId };
  }

  return { success: false, error: 'Referral already processed' };
};
