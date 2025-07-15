import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { useAuthStore } from "@/store/useAuthStore";
import { useEffect } from "react";
import { useChatStore } from "@/store/useChatStore";
import { useRealTimeStore } from "@/store/useRealtimeStore";
import { useMessageStore } from "@/store/useMessageStore";
import { useStompStore } from "@/store/useStompStore";

const baseURL = import.meta.env.VITE_WEBSOCKET_URL;

export const useStompClient = () => {
  const token = useAuthStore((state) => state.token);
  const setClient = useStompStore((state) => state.setClient);
  const clearClient = useStompStore((state) => state.clearClient);

  useEffect(() => {
    if (!token) return;

    const client = new Client({
      heartbeatIncoming: 10000,
      heartbeatOutgoing: 10000,
      reconnectDelay: 5000,

      webSocketFactory: () => new SockJS(`${baseURL}/ws`),

      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },

      onConnect: () => {
        client.subscribe("/topic/user/status", (message) => {
          const { userId, online } = JSON.parse(message.body);

          const authStore = useAuthStore.getState();
          const chatStore = useChatStore.getState();
          const realTimeStore = useRealTimeStore.getState();

          if (authStore.user?.id === userId) {
            useAuthStore.getState().updateUser({ isOnline: online });
          }

          chatStore.updateSelectedChatOnlineStatus(userId, online);

          realTimeStore.setOnlineStatus(userId, online);
        });

        const selectedChatId = useChatStore.getState().selectedChat?.chatId;

        const typingSub = selectedChatId
          ? client.subscribe(
              `/topic/chat/${selectedChatId}/typing`,
              (message) => {
                const { chatId, userId, typing } = JSON.parse(message.body);

                const authUserId = useAuthStore.getState().user?.id;

                if (userId !== authUserId) {
                  useRealTimeStore
                    .getState()
                    .setTypingStatus(chatId, userId, typing);
                }
              }
            )
          : null;

        const addMessage = useMessageStore.getState().addMessage;

        const messageSub = selectedChatId
          ? client.subscribe(`/topic/chat.${selectedChatId}`, (message) => {
              const newMessage = JSON.parse(message.body);
              addMessage(selectedChatId, newMessage);
            })
          : null;

        const seenSub = client.subscribe(
          `/topic/chat.${selectedChatId}.seen`,
          (message) => {
            const { chatId, messageIds, userId } = JSON.parse(message.body);

            useMessageStore
              .getState()
              .updateSeenStatus(chatId, messageIds, userId);
          }
        );

        const currentUserId = useAuthStore.getState().user?.id;

        const refreshSub = client.subscribe(
          `/topic/chat.refresh.${currentUserId}`,
          () => {
            useChatStore.getState().fetchChats(true);
          }
        );

        client.onDisconnect = () => {
          typingSub?.unsubscribe();
          messageSub?.unsubscribe();
          seenSub?.unsubscribe();
          refreshSub?.unsubscribe();
        };
      },

      onStompError: (frame) => {
        console.error("❌ STOMP error", frame);
      },

      // debug: (msg) => console.log("[STOMP]", msg),
    });

    client.activate();
    setClient(client);

    return () => {
      client.deactivate();
      clearClient();
    };
  }, [token, setClient, clearClient]);

  const client = useStompStore((state) => state.client);

  return client;
};
