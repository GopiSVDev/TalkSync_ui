import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { useAuthStore } from "@/store/useAuthStore";
import { useEffect, useRef } from "react";

const baseURL = import.meta.env.VITE_WEBSOCKET_URL;
export const useStompClient = () => {
  const token = useAuthStore.getState().token;
  const clientRef = useRef<Client | null>(null);

  useEffect(() => {
    if (!token) return;
    console.log(token);

    const client = new Client({
      webSocketFactory: () => new SockJS(`${baseURL}/ws`),

      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },

      onConnect: () => {
        console.log("Stomp connected");
      },

      onStompError: (frame) => {
        console.error("❌ STOMP error", frame);
      },

      debug: (msg) => console.log("[STOMP]", msg),
    });

    client.activate();
    clientRef.current = client;

    return () => {
      client.deactivate();
    };
  }, [token]);

  useEffect(() => {
    const client = clientRef.current;
    if (!client || !client.connected) return;

    const subscription = client.subscribe("/topic/user/status", (message) => {
      const { userId, online } = JSON.parse(message.body);

      const authUser = useAuthStore.getState().user;
      if (authUser?.id == userId) {
        useAuthStore.getState().updateUser({ isOnline: online });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [clientRef.current?.connected]);

  return clientRef;
};
