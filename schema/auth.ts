import { z } from "zod";

export const registerSchema = z
  .object({
    name: z.string().min(3, {
      message: "Fullname must be at least 3 characters.",
    }),
    email: z.string().email({
      message: "Invalid email address.",
    }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." })
      .regex(/[a-z]/, { message: "Password must include a lowercase letter." })
      .regex(/[A-Z]/, { message: "Password must include an uppercase letter." })
      .regex(/[0-9]/, { message: "Password must include a number." })
      .regex(/[^A-Za-z0-9]/, {
        message: "Password must include a special character.",
      }),
    confirmPassword: z.string().min(8, {
      message: "Confirm Password must be at least 8 characters.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });
