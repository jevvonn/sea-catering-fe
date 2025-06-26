import { api } from "@/lib/axios";
import { registerSchema } from "@/schema/auth";
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
