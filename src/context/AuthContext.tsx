import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { jwtDecode } from "jwt-decode";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import type { UserResponse } from "@/api/authApi";

interface JwtPayload {
  exp?: number;
}

interface AuthContextType {
  token: string | null;
  setToken: (token: string | null) => void;
  isAuthenticated: boolean;
  logout: () => void;
  isLoading: boolean;
  user: UserResponse | null;
  setUser: (user: UserResponse | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserResponse | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const logout = useCallback(
    (silent = false) => {
      localStorage.removeItem("token");
      setToken(null);

      localStorage.removeItem("user");
      setUser(null);

      if (!silent) {
        navigate("/");
        toast.success("Logged Out Successfully");
      }
    },
    [navigate]
  );

  const isTokenValid = useCallback(
    (token: string) => {
      try {
        const decoded = jwtDecode<JwtPayload>(token);
        if (!decoded.exp) return false;
        const expiry = decoded.exp * 1000;
        const now = Date.now();

        if (now >= expiry) {
          logout(true);
          return false;
        }

        return now < expiry;
      } catch {
        return false;
      }
    },
    [logout]
  );

  useEffect(() => {
    const validateToken = () => {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");

      if (!token || !isTokenValid(token)) {
        logout(true);
        return false;
      }

      setToken(token);
      setUser(user ? JSON.parse(user) : null);

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      return true;
    };

    validateToken();
    setIsLoading(false);

    const interval = setInterval(() => {
      const stillValid = validateToken();

      if (!stillValid) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isTokenValid, logout, token]);

  const isAuthenticated = Boolean(token);

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        user,
        setUser,
        isAuthenticated,
        logout,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
