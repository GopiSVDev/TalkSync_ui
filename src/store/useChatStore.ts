import type { ChatDetail } from "@/types/chat";
import { create } from "zustand";

type ChatStore = {
  selectedChat: ChatDetail | null;
  setSelectedChat: (chat: ChatDetail | null) => void;
  updateSelectedChatOnlineStatus: (userId: string, isOnline: boolean) => void;
};

export const useChatStore = create<ChatStore>((set, get) => ({
  selectedChat: null,
  setSelectedChat: (chat) => set({ selectedChat: chat }),

  updateSelectedChatOnlineStatus: (userId, isOnline) => {
    const current = get().selectedChat;

    if (!current) return;

    const updatedParticipants = current.participants.map((participant) =>
      participant.id == userId
        ? {
            ...participant,
            isOnline,
            lastSeen: !isOnline
              ? new Date().toISOString()
              : participant.lastSeen,
          }
        : participant
    );

    set({
      selectedChat: {
        ...current,
        participants: updatedParticipants,
      },
    });
  },
}));
