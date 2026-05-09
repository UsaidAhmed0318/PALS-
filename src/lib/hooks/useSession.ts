import { useQuery, useQueryClient } from "@tanstack/react-query";

import { SessionUser } from "@/types/session";

type SessionResponse = {
  authenticated: boolean;
  user?: SessionUser;
};

export function useSessionQuery() {
  return useQuery<SessionResponse>({
    queryKey: ["session"],
    queryFn: async () => {
      const res = await fetch("/api/auth/session");
      // Return data even on 401 (not logged in is valid state)
      const data = await res.json();
      return data;
    },
    retry: false, // Don't retry on 401
    staleTime: 60 * 1000, // Cache 5 min
    refetchOnWindowFocus: true, // Recheck when user returns to tab
    refetchOnMount: "always",
  });
}

// Call this after login/logout to refresh session
export function useInvalidateSession() {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries({ queryKey: ["session"] });
}
