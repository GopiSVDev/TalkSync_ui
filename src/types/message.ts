export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  text?: string;
  createdAt: string;

  mediaUrl?: string; // image, file, etc.
  seenBy?: string[]; // array of userIds
  reactions?: {
    [emoji: string]: string[]; // { "❤️": ["user_1", "user_2"] }
  };
}
