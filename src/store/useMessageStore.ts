import type { Message } from "@/types/message";
import { create } from "zustand";

interface MessageStore {
  messagesByChat: Record<string, Message[]>;
  setMessages: (chatId: string, messages: Message[]) => void;
  addMessage: (chatId: string, message: Message) => void;
  updateSeenStatus: (
    chatId: string,
    messageIds: string[],
    userId: string
  ) => void;

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

  updateSeenStatus: (chatId: string, messageIds: string[], userId: string) => {
    set((state) => {
      const messages = state.messagesByChat[chatId] ?? [];

      let hasChanged = false;

      const updatedMessages: Message[] = messages.map((msg) => {
        if (!messageIds.includes(msg.id)) return msg;

        const alreadySeen = msg.seenBy.some((s) => s.userId === userId);
        if (alreadySeen) return msg;

        hasChanged = true;

        return {
          ...msg,
          seenBy: [
            ...msg.seenBy,
            {
              messageId: msg.id,
              userId,
              seenAt: new Date().toISOString(),
              allSeen: false,
            },
          ],
        };
      });

      if (!hasChanged) return {};

      return {
        messagesByChat: {
          ...state.messagesByChat,
          [chatId]: updatedMessages,
        },
      };
    });
  },
  clearMessages: (chatId) => {
    set((state) => {
      const updated = { ...state.messagesByChat };
      delete updated[chatId];
      return { messagesByChat: updated };
    });
  },
}));
