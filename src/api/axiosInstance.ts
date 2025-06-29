import { useAuthStore } from "@/store/useAuthStore";
import { isTokenExpired } from "@/utils/jwt";
import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_URL,
});

instance.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;

  if (token) {
    if (isTokenExpired(token)) {
      useAuthStore.getState().logout();
      return Promise.reject(new Error("Token expired"));
    }

    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

instance.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response.status === 401) {
      useAuthStore.getState().logout();
    }

    return Promise.reject(error);
  }
);

export const API_BASE_URL = instance.defaults.baseURL;

export default instance;
