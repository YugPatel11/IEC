import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService } from '@/services/api';
import type { AdminUser } from '@/types';

interface AuthContextType {
  admin: AdminUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('ppsu_admin_token'));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem('ppsu_admin_token');
    if (savedToken) {
      authService.me()
        .then((res: any) => {
          setAdmin(res.data.data);
          setToken(savedToken);
        })
        .catch(() => {
          localStorage.removeItem('ppsu_admin_token');
          setToken(null);
          setAdmin(null);
        })
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = async (username: string, password: string) => {
    const res = await authService.login({ username, password });
    const { token: newToken, admin: adminData } = res.data.data!;
    localStorage.setItem('ppsu_admin_token', newToken);
    setToken(newToken);
    setAdmin(adminData);
  };

  const logout = () => {
    localStorage.removeItem('ppsu_admin_token');
    setToken(null);
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ admin, token, isAuthenticated: !!admin, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
