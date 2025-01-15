import { create } from "zustand";

type AuthStore = {
  authInitialized: boolean;
  setAuthInitialized: (authInitialized: boolean) => void;
  isLogIn: boolean;
  setIsLogIn: (isLogIn: boolean) => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  authInitialized: false,
  setAuthInitialized: (authInitialized) => set({ authInitialized }),
  isLogIn: false,
  setIsLogIn: (isLogIn) => set({ isLogIn }),
}));
