import { getUserChats } from "@/api/chatApi";
import type { ChatDetail } from "@/types/chat";
import { toast } from "sonner";
import { create } from "zustand";

type ChatStore = {
  chats: ChatDetail[];
  selectedChat: ChatDetail | null;
  isChatsLoading: boolean;
  fetchChats: () => Promise<void>;
  setChats: (chats: ChatDetail[]) => void;
  setSelectedChat: (chat: ChatDetail | null) => void;
  updateSelectedChatOnlineStatus: (userId: string, isOnline: boolean) => void;
};

export const useChatStore = create<ChatStore>((set, get) => ({
  chats: [],
  selectedChat: null,
  isChatsLoading: false,
  fetchChats: async () => {
    const state = get();
    if (state.chats.length > 0) return;

    set({ isChatsLoading: true });
    try {
      const response = await getUserChats();
      set({ chats: response });
    } catch (e) {
      console.log(e);
      toast.error("Failed to fetch chats");
    } finally {
      set({ isChatsLoading: false });
    }
  },

  setChats: (chats) => set({ chats }),
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
