import type { ChatUser } from "@/types/user";
import ChatWindowHeader from "./ChatWindow/ChatWindowHeader";
import MessagesWindow from "./ChatWindow/MessagesWindow";
import ChatInputWithButton from "./ChatWindow/ChatInputWithButton";
import { useEffect, useState } from "react";
import type { Message } from "@/types/message";

export interface ChatWindowProps {
  chat: ChatUser | null;
  onBack: () => void;
}

const dummyMessages: Message[] = [
  {
    id: "msg1",
    chatId: "chat123",
    senderId: "userA",
    content: "Hey, how's it going?",
    createdAt: "2025-06-28T10:15:00Z",
    seenBy: [{ userId: "userB", seenAt: "2025-06-28T10:17:00Z" }],
  },
  {
    id: "msg2",
    chatId: "chat123",
    senderId: "userB",
    content: "All good! Just working on the project.",
    createdAt: "2025-06-28T10:16:00Z",
    seenBy: [{ userId: "userA", seenAt: "2025-06-28T10:18:00Z" }],
  },
  {
    id: "msg3",
    chatId: "chat123",
    senderId: "userA",
    mediaUrl: "https://images.unsplash.com/photo-1750173588085-895136c6e0a5",
    mediaType: "image",
    createdAt: "2025-06-28T10:17:00Z",
    seenBy: [{ userId: "userB", seenAt: "2025-06-28T10:19:00Z" }],
  },
  {
    id: "msg4",
    chatId: "chat123",
    senderId: "userB",
    content: "Looks awesome 🔥",
    createdAt: "2025-06-28T10:18:00Z",
    seenBy: [],
  },
  {
    id: "msg5",
    chatId: "chat123",
    senderId: "userA",
    content: "Check out this audio clip.",
    mediaUrl: "https://dl.espressif.com/dl/audio/ff-16b-2c-44100hz.mp3",
    mediaType: "audio",
    createdAt: "2025-06-28T10:19:00Z",
    seenBy: [],
  },
  {
    id: "msg6",
    chatId: "chat123",
    senderId: "userB",
    mediaUrl:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    mediaType: "video",
    createdAt: "2025-06-28T10:20:00Z",
    seenBy: [],
  },
  {
    id: "msg7",
    chatId: "chat123",
    senderId: "userA",
    content: "Can you review the doc?",
    mediaUrl:
      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    mediaType: "file",
    createdAt: "2025-06-28T10:21:00Z",
    seenBy: [{ userId: "userB", seenAt: "2025-06-28T10:23:00Z" }],
  },
  {
    id: "msg8",
    chatId: "chat123",
    senderId: "userB",
    content: "Yes, I’ll check it today.",
    createdAt: "2025-06-28T10:22:00Z",
    seenBy: [{ userId: "userA", seenAt: "2025-06-28T10:24:00Z" }],
  },
  {
    id: "msg9",
    chatId: "chat123",
    senderId: "userA",
    content: "Thanks!",
    createdAt: "2025-06-28T10:23:00Z",
    seenBy: [],
  },
  {
    id: "msg10",
    chatId: "chat123",
    senderId: "userB",
    content: "No problem 🙌",
    createdAt: "2025-06-28T10:24:00Z",
    seenBy: [],
  },
];

const currentUserId = "user_1";

export default function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>(dummyMessages);

  useEffect(() => {
    if (
      messages.length > 0 &&
      messages[messages.length - 1].senderId === currentUserId
    ) {
      const timeout = setTimeout(() => {
        const botReply = {
          id: (Date.now() + 1).toString(),
          chatId: "1",
          senderId: "user_2",

          content: "This is a fake reply!",
          createdAt: new Date().toISOString(),

          seenBy: [
            {
              userId: "user1",
              seenAt: new Date().toISOString(),
            },
          ],
        };
        setMessages((prev) => [...prev, botReply]);
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [messages]);

  return (
    <div className="h-screen flex flex-col items-center z-10">
      {/* Header with status */}
      <ChatWindowHeader />

      {/* message window */}
      <MessagesWindow messages={messages} />

      {/* chat window input with send button */}
      <ChatInputWithButton setMessages={setMessages} />
    </div>
  );
}
