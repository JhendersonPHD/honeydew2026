import { useState, useCallback } from 'react';

export const useLoyalty = () => {
  const [points, setPoints] = useState(0);
  const [tier, setTier] = useState('Bronze');
  const [loading, setLoading] = useState(false);

  const fetchLoyaltyData = useCallback(async () => {
    setLoading(true);
    // Mock data - API endpoint doesn't exist yet
    setPoints(350);
    setTier('Silver');
    setLoading(false);
  }, []);

  const addPoints = useCallback(async (amount) => {
    setPoints(prev => prev + amount);
  }, []);

  return {
    points,
    tier,
    loading,
    fetchLoyaltyData,
    addPoints
  };
};
