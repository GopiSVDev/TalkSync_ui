import { create } from "zustand";
import { Client } from "@stomp/stompjs";

interface StompState {
  client: Client | null;
  setClient: (client: Client) => void;
  clearClient: () => void;
}

export const useStompStore = create<StompState>((set) => ({
  client: null,
  setClient: (client) => set({ client }),
  clearClient: () => set({ client: null }),
}));
