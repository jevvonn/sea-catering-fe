import { api } from "@/lib/axios";
import { handleApiErorr } from "./api";
import { Plan } from "@/types/plan";

export const getPlans = async (): Promise<ApiResponse<Plan[]>> => {
  try {
    const response = await api.get("/plans");
    return response.data;
  } catch (error) {
    return handleApiErorr(error);
  }
};
