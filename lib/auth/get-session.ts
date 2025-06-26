import { User } from "@/types/user";
import { cookies } from "next/headers";
import { api } from "../axios";
import { Session } from "@/types/auth";
import { redirect } from "next/navigation";

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
      logout: async () => {
        (await cookies()).delete("token");
        redirect("/sign-in");
      },
    };
  } catch (error) {
    console.error("error fetching session:", error);
    return null;
  }
};
