import { useAuthStore } from "@/store/useAuthStore";
import { useEffect } from "react";

const AuthWatcher = () => {
  const { validateToken, setToken, setUser } = useAuthStore();

  useEffect(() => {
    validateToken();

    const interval = setInterval(() => {
      const stillValid = validateToken();

      if (!stillValid) clearInterval(interval);

      return () => clearInterval(interval);
    }, 1000);
  }, [validateToken]);

  useEffect(() => {
    const authData = localStorage.getItem("auth-store");

    if (authData) {
      const parsed = JSON.parse(authData).state;

      setToken(parsed.token);
      setUser(parsed.user);
    }
  }, [setToken, setUser]);

  return null;
};

export default AuthWatcher;
