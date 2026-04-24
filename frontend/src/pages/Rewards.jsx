import React, { useEffect, useState } from 'react';
import { TierProgress } from '../components/TierProgress';
import { useLoyalty } from '../hooks/useLoyalty';
import { PointsBalance } from '../components/PointsBalance';
import { PointsHistory } from '../components/PointsHistory';
import { LoyaltyCard } from '../components/LoyaltyCard';

export const Rewards = () => {
  const { points, tier, fetchLoyaltyData } = useLoyalty();
  const [history, setHistory] = useState([
      { id: 1, type: 'earned', points: 150, description: 'Purchase: Order #1024', date: new Date().toISOString() },
      { id: 2, type: 'earned', points: 50, description: 'Account Creation Bonus', date: new Date(Date.now() - 86400000).toISOString() }
  ]);

  useEffect(() => {
    fetchLoyaltyData();
    // history could also be fetched here from /api/rewards/history
  }, [fetchLoyaltyData]);

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
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Rewards Hub</h1>
      <p className="text-gray-600 mb-8">Earn points on every purchase and unlock exclusive farm perks.</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-1 space-y-8">
          <LoyaltyCard tier={tier} pointsToNextTier={pointsToNextTier} nextTier={nextTier} />
          <PointsBalance points={points} tier={tier} />
        </div>
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Tier Progress</h3>
            <TierProgress
              currentPoints={points}
              tier={tier}
              nextTier={nextTier}
              pointsToNextTier={pointsToNextTier}
            />
          </div>
          <PointsHistory history={history} />
        </div>
      </div>
    </div>
  );
};
export default Rewards;
