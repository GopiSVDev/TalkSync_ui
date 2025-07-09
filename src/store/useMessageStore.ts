import type { Message } from "@/types/message";
import { create } from "zustand";

interface MessageStore {
  messagesByChat: Record<string, Message[]>;
  setMessages: (chatId: string, messages: Message[]) => void;
  addMessage: (chatId: string, message: Message) => void;
  markSeen: (chatId: string, userId: string, seenAt: string) => void;
  clearMessages: (chatId: string) => void;
}

export const useMessageStore = create<MessageStore>((set, get) => ({
  messagesByChat: {},
  setMessages: (chatId, messages) => {
    set((state) => ({
      messagesByChat: {
        ...state.messagesByChat,
        [chatId]: messages,
      },
    }));
  },

  addMessage: (chatId, message) => {
    const currentMessages = get().messagesByChat[chatId] || [];

    const exists = currentMessages.some((m) => m.id == message.id);
    if (exists) return;

    set((state) => ({
      messagesByChat: {
        ...state.messagesByChat,
        [chatId]: [...currentMessages, message],
      },
    }));
  },

  markSeen: (chatId, userId, seenAt) => {
    const currentMessages = get().messagesByChat[chatId] || [];

    const updatedMessages = currentMessages.map((message) => {
      const seenBy = message.seenBy || [];
      const alreadySeen = seenBy.some((s) => s.userId == userId);

      if (!alreadySeen) {
        return {
          ...message,
          seenBy: [...seenBy, { userId, seenAt }],
        };
      }

      return message;
    });

    set((state) => ({
      messagesByChat: {
        ...state.messagesByChat,
        [chatId]: updatedMessages,
      },
    }));
  },

  clearMessages: (chatId) => {
    set((state) => {
      const updated = { ...state.messagesByChat };
      delete updated[chatId];
      return { messagesByChat: updated };
    });
  },
}));
