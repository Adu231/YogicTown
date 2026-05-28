import { useState } from 'react';
import { getCurrentUser, logout as authLogout } from '@/lib/auth';
import type { User } from '@/types';

export function useAuth() {
  const [user, setUser] = useState<User | null>(() => getCurrentUser());

  const logout = () => {
    authLogout();
    setUser(null);
  };

  const refreshUser = () => {
    const current = getCurrentUser();
    setUser(current);
  };

  return { user, loading: false, logout, refreshUser, isAuthenticated: !!user };
}
