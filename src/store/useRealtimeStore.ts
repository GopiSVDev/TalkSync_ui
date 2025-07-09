import { create } from "zustand";

type TypingInfo = {
  [chatId: string]: string[];
};

interface RealtimeState {
  onlineUsers: Record<string, boolean>;
  typingStatus: TypingInfo;
  setOnlineStatus: (userId: string, online: boolean) => void;
  setTypingStatus: (chatId: string, userId: string, isTyping: boolean) => void;
  clearChatTypingStatus: (chatId: string) => void;
}

export const useRealTimeStore = create<RealtimeState>((set) => ({
  onlineUsers: {},
  typingStatus: {},

  setOnlineStatus: (userId, online) =>
    set((state) => ({
      onlineUsers: { ...state.onlineUsers, [userId]: online },
    })),

  setTypingStatus: (chatId, userId, isTyping) =>
    set((state) => {
      const currentTyping = state.typingStatus[chatId] || [];
      const updatedTyping = isTyping
        ? [...new Set([...currentTyping, userId])]
        : currentTyping.filter((id) => id !== userId);

      return {
        typingStatus: {
          ...state.typingStatus,
          [chatId]: updatedTyping,
        },
      };
    }),

  clearChatTypingStatus: (chatId) =>
    set((state) => {
      const newTyping = { ...state.typingStatus };
      delete newTyping[chatId];
      return { typingStatus: newTyping };
    }),
}));
