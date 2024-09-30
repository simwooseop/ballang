import { create } from "zustand";

type useAuthState = {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;

  AuthInitial: boolean;
  setAuthInitial: () => void;
};

export const useAuthStore = create<useAuthState>((set) => ({
  isLoggedIn: false,
  setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),

  AuthInitial: false,
  setAuthInitial: () => set({ AuthInitial: true }),
}));
