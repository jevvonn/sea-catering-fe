import { Plan } from "./plan";
import { User } from "./user";

export type Subscription = {
  id: string;
  user_id: string;
  user: Exclude<User, "role">;
  plan_id: string;
  plan: Plan;
  name: string;
  phone_number: string;
  mealtype: string[];
  delivery_days: string[];
  allergies: string[];
  total_price: number;
  status: "ACTIVE" | "CANCELLED";
  pause_start_date?: Date | null;
  pause_end_date?: Date | null;
  is_paused: boolean;
  created_at: string;
  updated_at: string;
};

export type updateSubscriptionRequest = {
  name: string | null;
  phone_number: string | null;
  pause_start_date: Date | null;
  pause_end_date: Date | null;
  status: "ACTIVE" | "CANCELLED" | null;
};
