import { api } from "@/lib/axios";
import { subscribeSchema } from "@/schema/subscription";
import { z } from "zod";
import { handleApiErorr } from "./api";
import { getCookie } from "cookies-next/client";
import { Subscription, updateSubscriptionRequest } from "@/types/subscription";
import { format } from "date-fns";

export const createSubscription = async (
  req: z.infer<typeof subscribeSchema>
): Promise<ApiResponse> => {
  const token = getCookie("token");
  if (!token) {
    return {
      message: "Unauthorized",
      errors: "No token provided",
    };
  }

  const data = Object.assign(
    {
      mealPlan: null,
      plan_id: req.mealPlan,
      delivery_days: req.deliveryDays,
      phone_number: req.phoneNumber,
      mealtype: req.mealType,
    },
    req
  );

  delete data["mealPlan"];
  delete data["mealType"];
  delete data["deliveryDays"];
  delete data["phoneNumber"];

  try {
    const response = await api.post("/subscriptions", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data as ApiResponse;
  } catch (error) {
    return handleApiErorr(error);
  }
};

export const getSubscriptions = async (): Promise<
  ApiResponse<Subscription[]>
> => {
  const token = getCookie("token");
  if (!token) {
    return {
      message: "Unauthorized",
      errors: "No token provided",
    };
  }

  try {
    const response = await api.get("/subscriptions", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return handleApiErorr(error);
  }
};

export const updateSubscription = async (
  subscriptionId: string,
  req: updateSubscriptionRequest
): Promise<ApiResponse> => {
  const token = getCookie("token");
  if (!token) {
    return {
      message: "Unauthorized",
      errors: "No token provided",
    };
  }

  const data = {
    ...req,
    pause_start_date: req.pause_start_date
      ? format(req.pause_start_date, "dd-MM-yyyy")
      : undefined,
    pause_end_date: req.pause_end_date
      ? format(req.pause_end_date, "dd-MM-yyyy")
      : undefined,
  };

  try {
    const response = await api.put(`/subscriptions/${subscriptionId}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data as ApiResponse;
  } catch (error) {
    return handleApiErorr(error);
  }
};
