import React, { createContext, useContext, useState, useEffect } from 'react';

const RewardsContext = createContext(null);

export const useRewards = () => {
  const context = useContext(RewardsContext);
  if (!context) {
    throw new Error('useRewards must be used within a RewardsProvider');
  }
  return context;
};

export const RewardsProvider = ({ children }) => {
  const [gamificationData, setGamificationData] = useState({
    achievements: [],
    streak: 0
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchGamificationData = async () => {
    setLoading(true);
    setError(null);
    try {
      // Try to fetch from API
      const response = await fetch('/api/gamification', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setGamificationData(data);
      } else {
        // Fall back to mock data for demo
        setGamificationData({
          achievements: [],
          streak: 0
        });
      }
    } catch (err) {
      // API not available, use mock data
      setGamificationData({
        achievements: [],
        streak: 0
      });
    } finally {
      setLoading(false);
    }
  };

  const unlockAchievement = async (achievementId) => {
    try {
      const response = await fetch('/api/gamification/achievements', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
        },
        body: JSON.stringify({ achievementId })
      });
      
      if (response.ok) {
        const newAchievement = await response.json();
        setGamificationData(prev => ({
          ...prev,
          achievements: [...prev.achievements, newAchievement]
        }));
      }
    } catch (err) {
      console.error('Failed to unlock achievement:', err);
    }
  };

  const updateStreak = async () => {
    try {
      const response = await fetch('/api/gamification/streak', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setGamificationData(prev => ({
          ...prev,
          streak: data.streak
        }));
      }
    } catch (err) {
      console.error('Failed to update streak:', err);
    }
  };

  useEffect(() => {
    fetchGamificationData();
  }, []);

  const value = {
    gamificationData,
    loading,
    error,
    fetchGamificationData,
    unlockAchievement,
    updateStreak
  };

  return (
    <RewardsContext.Provider value={value}>
      {children}
    </RewardsContext.Provider>
  );
};
