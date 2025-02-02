"use client";

import { useAuthStore } from "@/zustand/auth.store";
import { useRouter } from "next/navigation";
import { PropsWithChildren, useEffect } from "react";

function LoggedInOnlyLayout({ children }: PropsWithChildren) {
  const isLogIn = useAuthStore((state) => state.isLogIn);
  const router = useRouter();
  const isAuthInitialized = useAuthStore((state) => state.isAuthInitialized);

  useEffect(() => {
    if (isAuthInitialized) {
      if (!isLogIn) router.replace("/");
    }
  }, [isAuthInitialized, isLogIn, router]);

  return children;
}

export default LoggedInOnlyLayout;
