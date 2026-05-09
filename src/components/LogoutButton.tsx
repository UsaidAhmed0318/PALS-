"use client";

import { logoutAction } from "@/lib/actions/logout.action";
import { useQueryClient } from "@tanstack/react-query";

export default function LogoutButton({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  const queryClient = useQueryClient();

  const handleLogout = async () => {
    queryClient.removeQueries({ queryKey: ["session"] });
    await logoutAction();
  };
  return (
    <button onClick={handleLogout} className={className}>
      {children}
    </button>
  );
}
