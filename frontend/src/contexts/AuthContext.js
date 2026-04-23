import React, { createContext, useState, useEffect, useContext } from 'react';

// This is a placeholder since the frontend folder is currently mostly empty
// In a full implementation, this would handle cookie-based authentication state
// using credentials and handle refresh logic automatically.

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check session via /api/auth/me which relies on httpOnly cookies
    const verifySession = async () => {
      try {
        const response = await fetch('/api/auth/me', {
          // Important for cookie-based auth
          credentials: 'include'
        });
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else if (response.status === 401) {
          // Attempt to refresh token if we get 401
          const refreshRes = await fetch('/api/auth/refresh', {
             method: 'POST',
             credentials: 'include'
          });
          if (refreshRes.ok) {
             const retryMe = await fetch('/api/auth/me', { credentials: 'include' });
             if (retryMe.ok) {
                setUser(await retryMe.json());
             }
          }
        }
      } catch (err) {
        console.error("Session verification failed", err);
      } finally {
        setLoading(false);
      }
    };
    verifySession();
  }, []);

  const login = async (email, password) => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
      credentials: 'include'
    });
    if (res.ok) {
      const data = await res.json();
      setUser(data.user);
      return { success: true };
    }
    const err = await res.json();
    return { success: false, error: err.error };
  };

  const logout = async () => {
    await fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include'
    });
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
