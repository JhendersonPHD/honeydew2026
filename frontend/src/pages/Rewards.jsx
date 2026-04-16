import React, { useEffect } from 'react';
import { TierProgress } from '../components/TierProgress';
import { useLoyalty } from '../hooks/useLoyalty';
import { LoyaltyDashboard } from '../components/LoyaltyDashboard';
import { ReferralShare } from '../components/ReferralShare';

export const Rewards = () => {
  const { points, tier, fetchLoyaltyData } = useLoyalty();

  useEffect(() => {
    fetchLoyaltyData();
  }, [fetchLoyaltyData]);

  // Mock tier logic for UI display
  const getNextTierInfo = (currentTier, currentPoints) => {
    const tiers = [
      { name: 'Bronze', threshold: 0 },
      { name: 'Silver', threshold: 500 },
      { name: 'Gold', threshold: 2000 },
      { name: 'Platinum', threshold: 5000 }
    ];

    const currentIndex = tiers.findIndex(t => t.name === currentTier);
    if (currentIndex === -1 || currentIndex === tiers.length - 1) {
      return { nextTier: 'Max Tier', pointsToNextTier: 0 };
    }
    const nextTier = tiers[currentIndex + 1];
    return { nextTier: nextTier.name, pointsToNextTier: nextTier.threshold - currentPoints };
  };

  const { nextTier, pointsToNextTier } = getNextTierInfo(tier, points);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Rewards Hub</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <LoyaltyDashboard />
          <TierProgress
            currentPoints={points}
            tier={tier}
            nextTier={nextTier}
            pointsToNextTier={pointsToNextTier}
          />
        </div>
        <div>
          <ReferralShare />
        </div>
      </div>
    </div>
  );
};
