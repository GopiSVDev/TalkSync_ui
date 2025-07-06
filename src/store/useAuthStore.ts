import type { UserBase } from "@/types/user";
import { isTokenExpired } from "@/utils/jwt";
import axios from "axios";
import { toast } from "sonner";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  token: string | null;
  user: UserBase | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  setToken: (token: string | null) => void;
  setUser: (user: UserBase | null) => void;
  updateUser: (partial: Partial<UserBase>) => void;
  logout: (silent?: boolean) => void;
  validateToken: () => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      isLoading: false,

      setToken: (token) => {
        set({ token, isAuthenticated: !!token });
        if (token) {
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        } else {
          delete axios.defaults.headers.common["Authorization"];
        }
      },

      setUser: (user) => set({ user }),
      updateUser: (partial) =>
        set((state) => ({
          user: state.user
            ? {
                ...state.user,
                ...partial,
              }
            : null,
        })),

      logout: (silent = false) => {
        set({ token: null, user: null, isAuthenticated: false });
        localStorage.removeItem("auth-store");
        delete axios.defaults.headers.common["Authorization"];

        if (!silent) {
          toast.success("Logged out successfully");
          window.location.href = "/";
        }
      },

      validateToken: () => {
        const token = get().token;
        if (!token || isTokenExpired(token)) {
          get().logout(true);
          return false;
        }

        return true;
      },
    }),
    {
      name: "auth-store",
      partialize: (state) => ({ token: state.token, user: state.user }),
    }
  )
);
