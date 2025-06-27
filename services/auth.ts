import { api } from "@/lib/axios";
import { loginSchema, registerSchema } from "@/schema/auth";
import { z } from "zod";
import { handleApiErorr } from "./api";
import { User } from "@/types/user";
import { getCookie } from "cookies-next";
import { LoginApiResponse } from "@/types/auth";

export const registerUser = async (
  data: z.infer<typeof registerSchema>
): Promise<ApiResponse> => {
  try {
    const response = await api.post("/auth/register", data);
    return response.data as ApiResponse;
  } catch (error) {
    return handleApiErorr(error);
  }
};

export const loginUser = async (
  data: z.infer<typeof loginSchema>
): Promise<ApiResponse<LoginApiResponse>> => {
  try {
    const response = await api.post("/auth/login", data);
    return response.data;
  } catch (error) {
    return handleApiErorr(error);
  }
};

export const getUserSession = async (): Promise<ApiResponse<User>> => {
  const token = getCookie("token");
  if (!token) {
    return {
      message: "Unauthorized",
      errors: "No token provided",
      code: 401,
    };
  }

  try {
    const response = await api.get("/auth/session", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return handleApiErorr(error);
  }
};
