import type { ChatListType } from "@/types/chat";
import { create } from "zustand";

type ChatStore = {
  selectedChat: ChatListType | null;
  setSelectedChat: (chat: ChatListType | null) => void;
};

export const useChatStore = create<ChatStore>((set) => ({
  selectedChat: null,
  setSelectedChat: (chat) => set({ selectedChat: chat }),
}));
