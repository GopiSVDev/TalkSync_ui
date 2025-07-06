export interface UserBase {
  id: string;
  avatarUrl?: string;
  displayName: string;
  username: string;
  isOnline?: boolean;
  lastSeen?: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ChatParticpant extends UserBase {}

export interface ChatListProps {
  chats: ChatParticpant[];
  onSelect: (chat: string) => void;
  selectedChat: string | null;
}
