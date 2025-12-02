import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type AdminPage = 'dashboard' | 'population' | 'households' | 'audit-trail' | 'contact';

interface User {
  acc_id: number;
  username: string;
  role: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  activePage: AdminPage;
  login: (user: User) => void;
  logout: () => void;
  setActivePage: (page: AdminPage) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      activePage: 'dashboard',
      login: (user: User) => set({ isAuthenticated: true, user }),
      logout: () => set({ isAuthenticated: false, user: null, activePage: 'dashboard' }),
      setActivePage: (page) => set({ activePage: page }),
    }),
    {
      name: 'auth-storage', // localStorage key
    }
  )
);
