import React from 'react';

export const TierProgress = ({ currentPoints, tier, nextTier, pointsToNextTier }) => {
  const tiers = [
    { name: 'Bronze', threshold: 0, color: 'bg-amber-700' },
    { name: 'Silver', threshold: 500, color: 'bg-gray-400' },
    { name: 'Gold', threshold: 2000, color: 'bg-yellow-500' },
    { name: 'Platinum', threshold: 5000, color: 'bg-platinum' }
  ];

  const currentIndex = tiers.findIndex(t => t.name === tier);
  const progressPercent = currentIndex >= tiers.length - 1 
    ? 100 
    : ((currentPoints - tiers[currentIndex].threshold) / 
       (tiers[currentIndex + 1].threshold - tiers[currentIndex].threshold)) * 100;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Tier Progress</h3>
      
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-600">Current Tier</span>
        <span className={`px-3 py-1 rounded-full text-sm font-bold text-white ${tiers[currentIndex]?.color || 'bg-gray-400'}`}>
          {tier}
        </span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
        <div 
          className="bg-emerald-500 h-3 rounded-full transition-all duration-300"
          style={{ width: `${Math.min(progressPercent, 100)}%` }}
        />
      </div>

      <div className="flex justify-between text-xs text-gray-500 mb-4">
        <span>{currentPoints} points</span>
        <span>{currentIndex < tiers.length - 1 ? `${tiers[currentIndex + 1].threshold} points` : 'Max Tier'}</span>
      </div>

      {nextTier && nextTier !== 'Max Tier' && (
        <div className="text-center text-sm text-gray-600">
          <span className="font-medium">{pointsToNextTier}</span> more points to reach {nextTier}
        </div>
      )}
    </div>
  );
};
