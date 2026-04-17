import React from 'react';

export const LoyaltyDashboard = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Loyalty Rewards</h3>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center p-4 bg-emerald-50 rounded-lg">
          <p className="text-3xl font-bold text-emerald-600">350</p>
          <p className="text-sm text-gray-600">Points Balance</p>
        </div>
        <div className="text-center p-4 bg-indigo-50 rounded-lg">
          <p className="text-lg font-bold text-indigo-600">Silver</p>
          <p className="text-sm text-gray-600">Current Tier</p>
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium text-gray-700">Ways to Earn</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li className="flex justify-between">
            <span>Purchase Bonus</span>
            <span className="text-emerald-600">+10 pts/$</span>
          </li>
          <li className="flex justify-between">
            <span>Referral Bonus</span>
            <span className="text-emerald-600">+100 pts</span>
          </li>
          <li className="flex justify-between">
            <span>Birthday Bonus</span>
            <span className="text-emerald-600">+50 pts</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
