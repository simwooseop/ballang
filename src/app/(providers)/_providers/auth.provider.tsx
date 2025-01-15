"use client";

import { supabase } from "@/supabase/supabase";
import { useAuthStore } from "@/zustand/auth.store";
import { PropsWithChildren, useEffect } from "react";

function AuthProvider({ children }: PropsWithChildren) {
  const setIsLogIn = useAuthStore((state) => state.setIsLogIn);
  const setIsAuthInitialized = useAuthStore(
    (state) => state.setIsAuthInitialized
  );

  useEffect(() => {
    supabase.auth.onAuthStateChange(async (_eventName, session) => {
      if (session) {
        setIsLogIn(true);
      } else {
        setIsLogIn(false);
      }
      setIsAuthInitialized(true);
    });
  }, []);
  return children;
}

export default AuthProvider;
