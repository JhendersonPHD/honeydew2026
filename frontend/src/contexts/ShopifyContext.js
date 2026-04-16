'use client';

import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { shopifyService } from '../services/shopify';
import { useAuth } from './AuthContext';

const ShopifyContext = createContext();

export function ShopifyProvider({ children }) {
  const [status, setStatus] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { isAuthenticated } = useAuth();

  const checkStatus = useCallback(async () => {
    if (!isAuthenticated) return;

    setIsLoading(true);
    setError(null);
    try {
      const data = await shopifyService.getStatus();
      setStatus(data);
      setIsConnected(data.connected);
    } catch (err) {
      console.error('Failed to fetch Shopify status', err);
      setError(err.message || 'Failed to connect to Shopify');
      setIsConnected(false);
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  const syncProducts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await shopifyService.syncProducts();
      await checkStatus(); // Refresh status after sync
      return result;
    } catch (err) {
      setError(err.message || 'Failed to sync products');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [checkStatus]);

  // Initial check on load if authenticated
  useEffect(() => {
    checkStatus();
  }, [checkStatus]);

  const value = {
    status,
    isConnected,
    isLoading,
    error,
    checkStatus,
    syncProducts,
    clearError: () => setError(null)
  };

  return (
    <ShopifyContext.Provider value={value}>
      {children}
    </ShopifyContext.Provider>
  );
}

export function useShopify() {
  const context = useContext(ShopifyContext);
  if (context === undefined) {
    throw new Error('useShopify must be used within a ShopifyProvider');
  }
  return context;
}