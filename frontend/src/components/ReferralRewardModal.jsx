import React from 'react';
import { Link } from 'react-router-dom';

export const ReferralRewardModal = ({ isOpen, onClose, amount = 1000 }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900 bg-opacity-60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-8 text-center relative transform transition-all">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        <div className="w-20 h-20 bg-emerald-100 rounded-full mx-auto mb-6 flex items-center justify-center">
          <span className="text-4xl">🎉</span>
        </div>

        <h2 className="text-2xl font-extrabold text-gray-900 mb-2">Reward Earned!</h2>
        <p className="text-gray-600 mb-6">
          Your friend successfully placed their first order. You've earned <span className="font-bold text-emerald-600">{amount} points</span>!
        </p>

        <div className="space-y-3">
          <Link
            to="/rewards"
            onClick={onClose}
            className="block w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl transition-colors shadow-lg shadow-emerald-500/30"
          >
            View My Balance
          </Link>
          <button
            onClick={onClose}
            className="w-full py-2 text-gray-500 hover:text-gray-700 text-sm font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
