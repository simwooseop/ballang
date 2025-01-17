import { User } from "@/types/supabaseCustom";
import { create } from "zustand";

type AuthStore = {
  isAuthInitialized: boolean;
  setIsAuthInitialized: (authInitialized: boolean) => void;
  isLogIn: boolean;
  setIsLogIn: (isLogIn: boolean) => void;
  currentUser: null | User;
  setCurrentUser: (currentUser: null | User) => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthInitialized: false,
  setIsAuthInitialized: (isAuthInitialized) => set({ isAuthInitialized }),
  isLogIn: false,
  setIsLogIn: (isLogIn) => set({ isLogIn }),
  currentUser: null,
  setCurrentUser: (currentUser) => set({ currentUser }),
}));
