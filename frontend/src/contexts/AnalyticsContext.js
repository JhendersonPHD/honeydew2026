'use client';

import React, { createContext, useState, useContext, useCallback } from 'react';
import { analyticsService } from '../services/analytics';
import { useAuth } from './AuthContext';

const AnalyticsContext = createContext();

export function AnalyticsProvider({ children }) {
  const [summary, setSummary] = useState(null);
  const [topProducts, setTopProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { isAuthenticated } = useAuth();

  const fetchSummary = useCallback(async (dateRange = '30d') => {
    if (!isAuthenticated) return;

    setIsLoading(true);
    setError(null);
    try {
      const data = await analyticsService.getSalesSummary(dateRange);
      setSummary(data);
    } catch (err) {
      console.error('Failed to fetch analytics summary', err);
      setError(err.message || 'Failed to load analytics summary');
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  const fetchTopProducts = useCallback(async () => {
    if (!isAuthenticated) return;

    setIsLoading(true);
    setError(null);
    try {
      const data = await analyticsService.getTopProducts();
      setTopProducts(data);
    } catch (err) {
      console.error('Failed to fetch top products', err);
      setError(err.message || 'Failed to load top products');
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  const fetchAll = useCallback(async () => {
    await Promise.all([fetchSummary(), fetchTopProducts()]);
  }, [fetchSummary, fetchTopProducts]);

  const value = {
    summary,
    topProducts,
    isLoading,
    error,
    fetchSummary,
    fetchTopProducts,
    fetchAll,
    clearError: () => setError(null)
  };

  return (
    <AnalyticsContext.Provider value={value}>
      {children}
    </AnalyticsContext.Provider>
  );
}

export function useAnalytics() {
  const context = useContext(AnalyticsContext);
  if (context === undefined) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider');
  }
  return context;
}