// hooks/useSession.ts
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSessionStore } from "@/stores/use-session-store";

export const useSession = (authenticated = false) => {
  const router = useRouter();
  const { session, loading, fetchSession, clearSession } = useSessionStore();

  useEffect(() => {
    const token = document.cookie.includes("token");

    if (!token && authenticated) {
      router.push("/sign-in");
    }

    if (!session) {
      fetchSession();
    }
  }, [authenticated, fetchSession, router, session]);

  useEffect(() => {
    if (!loading && !session && authenticated) {
      clearSession();
      router.push("/sign-in");
    }
  }, [loading, session, authenticated, clearSession, router]);

  return { session, loading };
};
