import type { ChatUser } from "@/types/chat";
import { create } from "zustand";

type ChatStore = {
  selectedChat: ChatUser | null;
  setSelectedChat: (chat: ChatUser | null) => void;
  updateSelectedChatOnlineStatus: (userId: string, isOnline: boolean) => void;
};

export const useChatStore = create<ChatStore>((set, get) => ({
  selectedChat: null,
  setSelectedChat: (chat) => set({ selectedChat: chat }),

  updateSelectedChatOnlineStatus: (userId, isOnline) => {
    const current = get().selectedChat;

    if (current?.id === userId) {
      set({
        selectedChat: {
          ...current,
          isOnline,
          lastSeen: !isOnline ? new Date().toISOString() : undefined,
        },
      });
    }
  },
}));
