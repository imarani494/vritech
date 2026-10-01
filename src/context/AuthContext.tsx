'use client';

import React, { createContext, useContext, useState } from 'react';
import { AuthContextType, LoginCredentials, User } from '@/types/auth';
import { authService } from '@/services/authService';

const AUTH_TOKEN_KEY = 'store_auth_token';
const AUTH_USER_KEY = 'store_auth_user';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Lazy state initialization to read from localStorage safely without triggering effect set-state warnings
  const [token, setToken] = useState<string | null>(() => {
    if (typeof window === 'undefined') return null;
    try {
      return localStorage.getItem(AUTH_TOKEN_KEY);
    } catch {
      return null;
    }
  });

  const [user, setUser] = useState<User | null>(() => {
    if (typeof window === 'undefined') return null;
    try {
      const savedUser = localStorage.getItem(AUTH_USER_KEY);
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    setIsLoading(true);
    try {
      const res = await authService.login(credentials);
      setToken(res.token);
      setUser(res.user);

      try {
        localStorage.setItem(AUTH_TOKEN_KEY, res.token);
        localStorage.setItem(AUTH_USER_KEY, JSON.stringify(res.user));
      } catch (e) {
        console.error('Failed to save auth to localStorage:', e);
      }

      return true;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    try {
      localStorage.removeItem(AUTH_TOKEN_KEY);
      localStorage.removeItem(AUTH_USER_KEY);
    } catch (e) {
      console.error('Failed to clear auth from localStorage:', e);
    }
  };

  const value: AuthContextType = {
    user,
    token,
    isAuthenticated: !!token && !!user,
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
