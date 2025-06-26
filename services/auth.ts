import { api } from "@/lib/axios";
import { loginSchema, registerSchema } from "@/schema/auth";
import { z } from "zod";
import { handleApiErorr } from "./api";

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

type LoginApiResponse = {
  token: string;
  userId: string;
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
