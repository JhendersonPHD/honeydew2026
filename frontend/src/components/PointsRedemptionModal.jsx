import React, { useState } from 'react';

export const PointsRedemptionModal = ({ isOpen, onClose, userPoints, onRedeem }) => {
  const [pointsToRedeem, setPointsToRedeem] = useState(100);

  if (!isOpen) return null;

  const discountValue = (pointsToRedeem / 10).toFixed(2); // 10 points = $1

  const handleRedeem = () => {
    onRedeem(pointsToRedeem);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900 bg-opacity-60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        <h2 className="text-xl font-bold text-gray-900 mb-1">Redeem Points</h2>
        <p className="text-sm text-gray-500 mb-6">You have <span className="font-bold text-amber-600">{userPoints}</span> points available.</p>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Points to apply</label>
          <input
            type="range"
            min="10"
            max={Math.min(userPoints, 1000)} // Limit to 1000 per transaction or user's max
            step="10"
            value={pointsToRedeem}
            onChange={(e) => setPointsToRedeem(Number(e.target.value))}
            className="w-full accent-amber-500"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>10</span>
            <span>{Math.min(userPoints, 1000)}</span>
          </div>
        </div>

        <div className="bg-amber-50 p-4 rounded-xl border border-amber-100 mb-6 text-center">
          <p className="text-sm text-amber-800 mb-1">Discount Value</p>
          <p className="text-3xl font-extrabold text-amber-600">${discountValue}</p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleRedeem}
            disabled={userPoints < 10}
            className="flex-1 py-2 bg-amber-500 hover:bg-amber-600 disabled:bg-amber-300 text-white font-bold rounded-xl transition-colors shadow-md shadow-amber-500/20"
          >
            Apply Discount
          </button>
        </div>
      </div>
    </div>
  );
};
