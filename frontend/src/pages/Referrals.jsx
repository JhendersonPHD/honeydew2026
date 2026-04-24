import React, { useState, useEffect } from 'react';
import { ReferralShare } from '../components/ReferralShare';

export const Referrals = () => {
  const [stats, setStats] = useState({ code: 'HONEYDEW2026', count: 0, rewards: [] });

  useEffect(() => {
    // In a real app, fetch from /api/referrals/stats
    setStats({
      code: 'HONEYDEW2026',
      count: 2,
      rewards: [
        { id: 1, type: 'referral_bonus', amount: 1000, date: new Date().toISOString() }
      ]
    });
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Give $10, Get 1,000 Points</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Invite your friends to HoneyDew. They get $10 off their first order, and you earn 1,000 points (worth $10) when they buy!
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div>
          <ReferralShare referralCode={stats.code} />
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Your Referral Stats</h3>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-emerald-50 rounded-xl p-4 text-center">
              <p className="text-sm font-medium text-emerald-800 mb-1">Friends Referred</p>
              <p className="text-3xl font-extrabold text-emerald-600">{stats.count}</p>
            </div>
            <div className="bg-amber-50 rounded-xl p-4 text-center">
              <p className="text-sm font-medium text-amber-800 mb-1">Points Earned</p>
              <p className="text-3xl font-extrabold text-amber-600">{stats.rewards.reduce((acc, r) => acc + r.amount, 0)}</p>
            </div>
          </div>

          <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-4">Recent Rewards</h4>
          {stats.rewards.length === 0 ? (
            <p className="text-gray-500 text-sm italic">You haven't earned any referral rewards yet.</p>
          ) : (
            <ul className="space-y-3">
              {stats.rewards.map(reward => (
                <li key={reward.id} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                  <div>
                    <p className="font-medium text-gray-800">Referral Bonus</p>
                    <p className="text-xs text-gray-500">{new Date(reward.date).toLocaleDateString()}</p>
                  </div>
                  <span className="font-bold text-emerald-600">+{reward.amount} pts</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Referrals;
