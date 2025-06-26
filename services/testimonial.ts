import { api } from "@/lib/axios";
import { testimonialSchema } from "@/schema/testimonial";
import { z } from "zod";
import { handleApiErorr } from "./api";
import { Testimonial } from "@/types/testimonial";

export const createTestimonial = async (
  data: z.infer<typeof testimonialSchema>
): Promise<ApiResponse> => {
  try {
    const response = await api.post("/testimonials", data);
    return response.data as ApiResponse;
  } catch (error) {
    return handleApiErorr(error);
  }
};

export const getTestimonials = async (): Promise<
  ApiResponse<{
    page: number;
    total: number;
    limit: number;
    testimonials: Testimonial[];
  }>
> => {
  try {
    const response = await api.get("/testimonials");
    return response.data;
  } catch (error) {
    return handleApiErorr(error);
  }
};
