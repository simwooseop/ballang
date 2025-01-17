"use client";

import api from "@/api/api";
import { supabase } from "@/supabase/supabase";
import { useAuthStore } from "@/zustand/auth.store";
import { PropsWithChildren, useEffect, useState } from "react";

function AuthProvider({ children }: PropsWithChildren) {
  const [userId, setUserId] = useState<string | null>(null);
  const setIsLogIn = useAuthStore((state) => state.setIsLogIn);
  const setIsAuthInitialized = useAuthStore(
    (state) => state.setIsAuthInitialized
  );
  const setCurrentUser = useAuthStore((state) => state.setCurrentUser);

  useEffect(() => {
    supabase.auth.onAuthStateChange(async (_eventName, session) => {
      if (session) {
        setUserId(session.user.id);
        setIsLogIn(true);
      } else {
        setUserId(null);
        setIsLogIn(false);
      }
      setIsAuthInitialized(true);
    });
  }, []);

  useEffect(() => {
    if (!userId) return;
    (async () => {
      const profile = await api.profile.getProfile(userId);
      setCurrentUser(profile);
    })();
  }, [userId]);
  return children;
}

export default AuthProvider;
