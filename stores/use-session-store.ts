"use client";

import { create } from "zustand";
import { getUserSession } from "@/services/auth";
import { deleteCookie } from "cookies-next";
import { Session } from "@/types/auth";

interface SessionState {
  session: Session | null;
  loading: boolean;
  fetchSession: () => Promise<void>;
  clearSession: () => void;
}

export const useSessionStore = create<SessionState>((set) => ({
  session: null,
  loading: true,
  fetchSession: async () => {
    const response = await getUserSession();

    if (response.data) {
      set({
        session: {
          user: response.data,
          isAuthenticated: true,
          logout: () => {
            deleteCookie("token");
            set({ session: null });
          },
        },
        loading: false,
      });
    } else {
      set({ session: null, loading: false });
    }
  },
  clearSession: () => {
    deleteCookie("token");
    set({ session: null });
  },
}));
