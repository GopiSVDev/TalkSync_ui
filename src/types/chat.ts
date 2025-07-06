import type { ChatParticpant } from "./user";

export interface ChatBase {
  chatId: string;
  name: string;
  avatarUrl?: string;
  isGroup: boolean;
}

export interface ChatSummary extends ChatBase {
  lastMessage?: string;
  lastMessageTime?: string;
  isOnline?: boolean;
  lastSeen?: string;
}

export interface ChatDetail extends ChatSummary {
  participants: ChatParticpant[];
  createdAt: string;
}
