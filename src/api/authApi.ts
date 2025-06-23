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

export interface UserResponse {
  id: string;
  username: string;
  displayName: string;
  avatarUrl: string;
  isOnline: boolean;
  lastSeen: string;
}

interface LoginResponse {
  token: string;
  user: UserResponse;
}

export const register = async (
  data: RegisterPayload
): Promise<LoginResponse> => {
  const response = await axios.post("/auth/register", data);
  return response.data;
};

export const login = async (data: LoginPayload): Promise<LoginResponse> => {
  const response = await axios.post("/auth/login", data);
  return response.data;
};

export const guest = async (): Promise<LoginResponse> => {
  const response = await axios.post("/auth/guest");
  return response.data;
};
