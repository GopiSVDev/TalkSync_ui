import axios from "./axiosInstance";

export const getMessages = async (chatId: string, page = 0, size = 20) => {
  const response = await axios.get(
    `/messages/${chatId}?page=${page}&size=${size}`
  );
  return response.data;
};
