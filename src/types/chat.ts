import type { ChatParticpant } from "./user";

export interface ChatBase {
  chatId: string;
  name: string;
  avatarUrl?: string;
  isGroup: boolean;
}

export interface ChatDetail extends ChatBase {
  lastMessage?: string;
  lastMessageTime?: string;
  isOnline?: boolean;
  lastSeen?: string;
  participants: ChatParticpant[];
  createdAt: string;
}
