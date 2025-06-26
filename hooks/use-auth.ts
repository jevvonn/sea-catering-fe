import { getUserSession } from "@/services/auth";
import { User } from "@/types/user";
import { getCookie } from "cookies-next/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Session = {
  user: User | null;
  isAuthenticated: boolean;
};

type Props = {
  authenticated?: boolean;
};

export const useSession = (props?: Props): Session | null => {
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);

  const getSession = async () => {
    const response = await getUserSession();

    if (response.data) {
      setSession({
        user: response.data,
        isAuthenticated: true,
      });
    }
  };

  useEffect(() => {
    const token = getCookie("token");
    if (!token && props?.authenticated) {
      router.push("/sign-in");
    }

    getSession();
  }, [router, props?.authenticated]);

  return session;
};
