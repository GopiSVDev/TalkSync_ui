import type { ChatUser } from "@/types/chat";
import { create } from "zustand";

type ChatStore = {
  selectedChat: ChatUser | null;
  setSelectedChat: (chat: ChatUser | null) => void;
};

export const useChatStore = create<ChatStore>((set) => ({
  selectedChat: null,
  setSelectedChat: (chat) => set({ selectedChat: chat }),
}));
