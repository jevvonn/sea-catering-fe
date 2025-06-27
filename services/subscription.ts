import { api } from "@/lib/axios";
import { subscribeSchema } from "@/schema/subscription";
import { z } from "zod";
import { handleApiErorr } from "./api";
import { getCookie } from "cookies-next/client";

export const createSubscription = async (
  data: z.infer<typeof subscribeSchema>
): Promise<ApiResponse> => {
  const token = getCookie("token");
  if (!token) {
    return {
      message: "Unauthorized",
      errors: "No token provided",
    };
  }

  try {
    const response = await api.post(
      "/subscriptions",
      {
        ...data,
        plan_id: data.mealPlan,
        delivery_days: data.deliveryDays,
        phone_number: data.phoneNumber,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data as ApiResponse;
  } catch (error) {
    return handleApiErorr(error);
  }
};
