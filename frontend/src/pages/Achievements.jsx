import React from 'react';
import { useRewards } from '../contexts/RewardsContext';
import { AchievementBadge } from '../components/AchievementBadge';
import { StreakCounter } from '../components/StreakCounter';

export const Achievements = () => {
  const { gamificationData } = useRewards();
  const { achievements, streak } = gamificationData;

  // Mock list of all available achievements
  const allAchievements = [
    { id: 'first_purchase', name: 'First Purchase', description: 'Make your very first order', icon: '🛍️' },
    { id: 'five_star', name: '5-Star Review', description: 'Leave a 5-star review', icon: '⭐' },
    { id: 'bulk_buyer', name: 'Bulk Buyer', description: 'Order 10+ items at once', icon: '📦' },
    { id: 'weekly_shopper', name: 'Weekly Shopper', description: 'Shop 4 weeks in a row', icon: '📅' },
    { id: 'first_referral', name: 'First Referral', description: 'Refer a friend successfully', icon: '🤝' },
    { id: 'referral_pro', name: 'Referral Pro', description: 'Refer 5 friends', icon: '🚀' },
    { id: 'ambassador', name: 'Ambassador', description: 'Refer 25 friends', icon: '👑' },
    { id: 'streak_7', name: '7-Day Streak', description: 'Maintain a 7-day streak', icon: '🔥' },
    { id: 'streak_30', name: '30-Day Streak', description: 'Maintain a 30-day streak', icon: '🏆' },
    { id: 'product_explorer', name: 'Product Explorer', description: 'View 50 different products', icon: '🔍' },
    { id: 'farm_friend', name: 'Farm Friend', description: 'Buy from 10 different farms', icon: '🚜' }
  ];

  // Merge unlocked state
  const displayAchievements = allAchievements.map(a => {
    const unlocked = achievements.find(ua => ua.id === a.id);
    return { ...a, unlocked: !!unlocked };
  });

  const categories = {
    'Shopping': ['first_purchase', 'five_star', 'bulk_buyer', 'weekly_shopper'],
    'Referrals': ['first_referral', 'referral_pro', 'ambassador'],
    'Engagement': ['streak_7', 'streak_30', 'product_explorer', 'farm_friend']
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-cream min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Your Achievements</h1>
        <StreakCounter streak={streak} />
      </div>

      {Object.entries(categories).map(([category, ids]) => (
        <div key={category} className="mb-8">
          <h2 className="text-xl font-bold text-amber-700 mb-4 pb-2 border-b border-amber-200">{category}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {displayAchievements
              .filter(a => ids.includes(a.id))
              .map(achievement => (
                <AchievementBadge key={achievement.id} achievement={achievement} />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};
