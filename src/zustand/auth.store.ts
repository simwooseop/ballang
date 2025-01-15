import { create } from "zustand";

type AuthStore = {
  isAuthInitialized: boolean;
  setIsAuthInitialized: (authInitialized: boolean) => void;
  isLogIn: boolean;
  setIsLogIn: (isLogIn: boolean) => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthInitialized: false,
  setIsAuthInitialized: (isAuthInitialized) => set({ isAuthInitialized }),
  isLogIn: false,
  setIsLogIn: (isLogIn) => set({ isLogIn }),
}));
