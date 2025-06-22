import axios from "./axiosInstance";

interface RegisterPayload {
  username: string;
  displayName: string;
  password: string;
}

interface LoginPayload {
  username: string;
  password: string;
}

export const register = async (data: RegisterPayload): Promise<void> => {
  const response = await axios.post("/auth/register", data);
  return response.data;
};

export const login = async (data: LoginPayload): Promise<string> => {
  const response = await axios.post("/auth/login", data);
  return response.data;
};

export const guest = async (): Promise<string> => {
  const response = await axios.post("/auth/guest");
  return response.data;
};
