import { User } from "./user";

export type Session = {
  user: User | null;
  isAuthenticated: boolean;
  logout: () => void;
};

export type LoginApiResponse = {
  token: string;
  userId: string;
};
