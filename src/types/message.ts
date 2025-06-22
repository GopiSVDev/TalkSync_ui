export interface Message {
  id: string;
  chatId: string;
  senderId: string;

  content?: string;
  mediaUrl?: string;
  mediaType?: "image" | "video" | "audio" | "file";

  createdAt: string;

  seenBy: {
    userId: string;
    seenAt: string;
  }[];
}
