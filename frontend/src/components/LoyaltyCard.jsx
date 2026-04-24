import React from 'react';

export const LoyaltyCard = ({ tier, pointsToNextTier, nextTier }) => {
  const getTierColor = (t) => {
    switch (t?.toLowerCase()) {
      case 'bronze': return 'bg-amber-700 text-amber-100';
      case 'silver': return 'bg-gray-300 text-gray-800';
      case 'gold': return 'bg-yellow-400 text-yellow-900';
      case 'platinum': return 'bg-slate-800 text-slate-100';
      default: return 'bg-amber-600 text-white';
    }
  };

  return (
    <div className={`rounded-xl shadow-lg p-6 relative overflow-hidden ${getTierColor(tier)}`}>
      {/* Decorative pattern */}
      <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl"></div>

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h3 className="text-xl font-bold uppercase tracking-wider opacity-90">HoneyDew VIP</h3>
            <p className="text-3xl font-extrabold mt-1">{tier || 'Bronze'} Member</p>
          </div>
          <svg className="w-10 h-10 opacity-80" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
          </svg>
        </div>

        {pointsToNextTier > 0 && (
          <div className="mt-6 pt-4 border-t border-white border-opacity-20">
            <p className="text-sm font-medium opacity-90">
              Only <span className="font-bold text-lg">{pointsToNextTier}</span> points to <span className="font-bold">{nextTier}</span>!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
