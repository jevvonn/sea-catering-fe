import { AxiosError } from "axios";

export const handleApiErorr = <T = unknown>(error: unknown): ApiResponse<T> => {
  if (error instanceof AxiosError) {
    const errorData = error.response?.data as ApiResponse;

    if (errorData.errors) {
      if (typeof errorData.errors === "object") {
        const errors: ErrorValidator[] = errorData.errors as ErrorValidator[];

        return {
          message: errorData.message,
          errors: errors.map((err) => err.message).join(","),
        };
      }

      return {
        message: errorData.message,
        errors: errorData.errors,
      };
    }
  }

  return {
    message: "An error occurred. Please try again later.",
    errors: error instanceof Error ? error.message : "Unknown error",
  };
};
