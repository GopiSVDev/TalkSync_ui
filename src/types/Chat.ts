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
export interface ChatPreview {
  id: string;
  name: string;
  avatarUrl: string;
  lastMessage: string;
  time: string;
}

export interface ChatListProps {
  chats: ChatPreview[];
  onSelect: (chat: ChatPreview) => void;
  selectedChat: ChatPreview | null;
}

export interface SearchList {
  id: string;
  username: string;
  displayName: string;
  avatarUrl: string;
  isOnline: string;
  lastSeen: string;
}
