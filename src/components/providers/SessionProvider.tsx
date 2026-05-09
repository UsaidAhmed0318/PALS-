"use client";

import { createContext, useContext } from "react";
import { useSessionQuery } from "@/lib/hooks/useSession";
import { SessionUser, UserRole } from "@/types/session";

type SessionContextType = {
  user: SessionUser | undefined;
  isLoggedIn: boolean;
  isLoading: boolean;
  hasRole: (role: UserRole) => boolean;
};

const SessionContext = createContext<SessionContextType>({
  user: undefined,
  isLoggedIn: false,
  isLoading: true,
  hasRole: () => false,
});

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const { data, isLoading } = useSessionQuery();

  const value: SessionContextType = {
    user: data?.user,
    isLoggedIn: data?.authenticated ?? false,
    isLoading,
    hasRole: (role: UserRole) => data?.user?.role === role,
  };

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
}

// Custom hook — use this in any component
export function useSession() {
  return useContext(SessionContext);
}
