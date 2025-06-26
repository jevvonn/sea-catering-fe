import { getUserSession } from "@/services/auth";
import { Session } from "@/types/auth";
import { deleteCookie, getCookie } from "cookies-next/client";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

type Props = {
  authenticated?: boolean;
};

export const useSession = (props?: Props): Session | null => {
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);

  const logout = () => {
    deleteCookie("token");
  };

  const getSession = useCallback(async () => {
    const response = await getUserSession();

    if (response.data) {
      setSession({
        user: response.data,
        isAuthenticated: true,
        logout: () => {
          logout();
          toast.success("You have been logged out successfully.");
          router.push("/sign-in");
        },
      });
    }
  }, [router]);

  useEffect(() => {
    const token = getCookie("token");
    if (!token && props?.authenticated) {
      router.push("/sign-in");
    }

    getSession();
  }, [router, getSession, props?.authenticated]);

  return session;
};
