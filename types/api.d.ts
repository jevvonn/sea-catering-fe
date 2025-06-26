type ApiResponse<T = unknown> = {
  data?: T | null;
  message?: string;
  errors?: string | null;
};

type ErrorValidator = {
  field: string;
  message: string;
};
