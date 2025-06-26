import { User } from "@/types/user";
import { cookies } from "next/headers";
import { api } from "../axios";

type Session = {
  user: User | null;
  isAuthenticated: boolean;
};

export const getSession = async (): Promise<Session | null> => {
  const token = (await cookies()).get("token")?.value;
  if (!token) {
    return null;
  }

  try {
    const response = await api.get("/auth/session", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return {
      user: response.data.data as User,
      isAuthenticated: true,
    };
  } catch (error) {
    console.error("error fetching session:", error);
    return null;
  }
};
