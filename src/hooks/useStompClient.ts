import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { useAuthStore } from "@/store/useAuthStore";
import { useEffect, useRef } from "react";
import { useChatStore } from "@/store/useChatStore";
import { useRealTimeStore } from "@/store/realtimeStore";

const baseURL = import.meta.env.VITE_WEBSOCKET_URL;

export const useStompClient = () => {
  const token = useAuthStore((state) => state.token);
  const clientRef = useRef<Client | null>(null);

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
        const subscription = client.subscribe(
          "/topic/user/status",
          (message) => {
            const { userId, online } = JSON.parse(message.body);

            const authStore = useAuthStore.getState();
            const chatStore = useChatStore.getState();
            const realTimeStore = useRealTimeStore.getState();

            if (authStore.user?.id === userId) {
              useAuthStore.getState().updateUser({ isOnline: online });
            }

            chatStore.updateSelectedChatOnlineStatus(userId, online);

            realTimeStore.setOnlineStatus(userId, online);
          }
        );

        client.onDisconnect = () => {
          console.log("🛑 STOMP disconnected");
          subscription.unsubscribe();
        };
      },

      onStompError: (frame) => {
        console.error("❌ STOMP error", frame);
      },

      debug: (msg) => console.log("[STOMP]", msg),
    });

    client.activate();
    clientRef.current = client;

    return () => {
      console.log("🧹 Deactivating STOMP client");
      client.deactivate();
      clientRef.current = null;
    };
  }, [token]);
};
