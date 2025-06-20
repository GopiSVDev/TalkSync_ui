export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  text?: string;
  createdAt: string;

  mediaUrl?: string;
  seenBy?: string[];
  reactions?: {
    [emoji: string]: string[];
  };
}
