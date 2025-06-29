import { z } from "zod";

export const subscribeSchema = z.object({
  name: z.string().min(3, {
    message: "Username must be at least 3 characters.",
  }),
  phoneNumber: z
    .string()
    .min(1, { message: "Phone number must be at least 1 number." })
    .max(15, { message: "Phone number must not exceed 15 number." }),
  mealPlan: z.enum(["diet", "protein", "royal"]),
  mealType: z.array(z.string()).min(1, {
    message: "Please select at least one meal type.",
  }),
  deliveryDays: z.array(z.string()).min(1, {
    message: "Please select at least one day.",
  }),
  allergies: z.array(z.string()).min(0),
});
