import { AxiosError } from "axios";
import { deleteCookie } from "cookies-next/client";

export const handleApiErorr = <T = unknown>(error: unknown): ApiResponse<T> => {
  if (error instanceof AxiosError) {
    if (error.response?.status === 401) {
      deleteCookie("token");
    }

    const errorData = error.response?.data as ApiResponse;

    if (errorData.errors) {
      if (typeof errorData.errors === "object") {
        const errors: ErrorValidator[] = errorData.errors as ErrorValidator[];

        return {
          message: errorData.message,
          errors: errors.map((err) => err.message).join(","),
          code: error.response?.status || 500,
        };
      }

      return {
        message: errorData.message,
        errors: errorData.errors,
        code: error.response?.status || 500,
      };
    }
  }

  return {
    message: "An error occurred. Please try again later.",
    errors: error instanceof Error ? error.message : "Unknown error",
    code: 500,
  };
};
