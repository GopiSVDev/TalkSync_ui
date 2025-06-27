export interface Chat {
  id: string;
  name: string; // group name or null for DMs
  avatarUrl?: string;
  isGroup: boolean;
  participantIds: string[]; // array of user IDs
  lastMessageId?: string; // useful for preview
  createdAt: string;
}

// frontend stuff
export interface ChatListType {
  id: string;
  avatarUrl: string;
  displayName: string;
  username: string;

  lastMessage?: string;
  time?: string;

  isOnline?: string;
  lastSeen?: string;
}

export interface ChatListProps {
  chats: ChatListType[];
  onSelect: (chat: ChatListType) => void;
  selectedChat: ChatListType | null;
}
