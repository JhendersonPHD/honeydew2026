import React from 'react';

export const PointsBalance = ({ points, tier }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center border-t-4 border-amber-500">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">Your Points Balance</h3>
      <div className="flex items-center justify-center w-32 h-32 rounded-full bg-amber-50 border-4 border-amber-200 mb-4">
        <span className="text-4xl font-bold text-amber-600">{points || 0}</span>
      </div>
      <div className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-100 text-emerald-800 font-medium">
        <svg className="w-5 h-5 mr-2 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
        {tier || 'Bronze'} Tier
      </div>
    </div>
  );
};
