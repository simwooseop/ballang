import { create } from "zustand";

type useAuthState = {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;

  authInitial: boolean;
  setAuthInitial: () => void;
};

export const useAuthStore = create<useAuthState>((set) => ({
  isLoggedIn: false,
  setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),

  authInitial: false,
  setAuthInitial: () => set({ authInitial: true }),
}));
