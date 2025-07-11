export interface Message {
  id: string;
  chatId: string;
  senderId: string;

  content?: string;
  mediaUrl?: string;
  mediaType?: "image" | "video" | "audio" | "file" | null;

  createdAt: string;
  sentAt: string;

  seenBy: {
    messageId: string;
    userId: string;
    seenAt: string;
    allSeen: boolean;
  }[];
}
