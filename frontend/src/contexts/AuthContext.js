'use client';

import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { apiClient } from '../services/apiClient';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize auth state from token
  useEffect(() => {
    const initAuth = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
        if (token) {
          // Verify token and get user profile
          const userData = await apiClient.get('/auth/me');
          setUser(userData);
          setIsAuthenticated(true);
        }
      } catch (err) {
        console.error('Failed to initialize auth', err);
        // Clean up invalid token
        if (typeof window !== 'undefined') {
          localStorage.removeItem('access_token');
        }
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = useCallback(async (email, password) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await apiClient.post('/auth/login', { email, password });

      if (response.access_token && typeof window !== 'undefined') {
        localStorage.setItem('access_token', response.access_token);
        setUser(response.user);
        setIsAuthenticated(true);
      } else {
        throw new Error('Invalid login response');
      }
    } catch (err) {
      setError(err.message || 'Login failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(async (userData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await apiClient.post('/auth/register', userData);

      if (response.access_token && typeof window !== 'undefined') {
        localStorage.setItem('access_token', response.access_token);
        setUser(response.user);
        setIsAuthenticated(true);
      } else {
         throw new Error('Invalid registration response');
      }
    } catch (err) {
      setError(err.message || 'Registration failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('access_token');
    }
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  const clearError = useCallback(() => setError(null), []);

  const value = {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout,
    clearError
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}