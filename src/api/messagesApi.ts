import type { Message } from "@/types/message";
import axios from "./axiosInstance";

export const getMessages = async (chatId: string): Promise<Message[]> => {
  const response = await axios.get(`/messages/${chatId}`);
  return response.data.content;
};
