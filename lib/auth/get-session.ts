import { User } from "@/types/user";
import { cookies } from "next/headers";
import { api } from "../axios";
import { Session } from "@/types/auth";
import { redirect } from "next/navigation";
import { AxiosError } from "axios";

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
    if (error instanceof AxiosError && error.response?.status === 401) {
      (await cookies()).delete("token");
      redirect("/sign-in");
    }

    console.error("error fetching session:", error);
    return null;
  }
};
