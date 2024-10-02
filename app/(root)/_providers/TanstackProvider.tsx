"use client";
import { ballangClient } from "@/api/ballang.api";
import { useAuthStore } from "@/zustand/auth.store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { PropsWithChildren, useEffect } from "react";

const queryClient = new QueryClient();

function TanstackProvider({ children }: PropsWithChildren) {
  const setIsLoggedIn = useAuthStore((state) => state.setIsLoggedIn);

  useEffect(() => {
    (async () => {
      const response = await ballangClient.get("/auth/refresh-token");
      if (!response.data.result) {
        setIsLoggedIn(false);
      } else {
        setIsLoggedIn(true);
      }
    })();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

export default TanstackProvider;
