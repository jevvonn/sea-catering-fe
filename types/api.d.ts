type ApiResponse<T = unknown> = {
  data?: T | null;
  message?: string;
  errors?: string | null;
  code?: number;
};

type ErrorValidator = {
  field: string;
  message: string;
};
