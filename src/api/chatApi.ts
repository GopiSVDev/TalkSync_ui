import type { ChatDetail } from "@/types/chat";
import axios from "./axiosInstance";

export const getUserChats = async (): Promise<ChatDetail[]> => {
  const response = await axios.get("/chat");
  return response.data;
};

export const getOrCreatePrivateChat = async (
  userId: string,
  targetUserId: string
): Promise<ChatDetail> => {
  const response = await axios.post(
    `/chat/private?userId=${userId}&targetUserId=${targetUserId}`
  );

  return response.data;
};
