import type { ChatUser } from "@/types/chat";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { toast } from "sonner";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface JwtPayload {
  exp?: number;
}

interface AuthState {
  token: string | null;
  user: ChatUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  setToken: (token: string | null) => void;
  setUser: (user: ChatUser | null) => void;
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

      logout: (silent = false) => {
        set({ token: null, user: null, isAuthenticated: false });
        delete axios.defaults.headers.common["Authorization"];

        if (!silent) {
          toast.success("Logged out successfully");
          window.location.href = "/";
        }
      },

      validateToken: () => {
        const token = get().token;
        if (!token) return false;

        try {
          const decoded = jwtDecode<JwtPayload>(token);
          if (!decoded.exp || Date.now() >= decoded.exp * 1000) {
            get().logout(true);
            return false;
          }

          return true;
        } catch {
          get().logout(true);
          return false;
        }
      },
    }),
    {
      name: "auth-store",
      partialize: (state) => ({ token: state.token, user: state.user }),
    }
  )
);
