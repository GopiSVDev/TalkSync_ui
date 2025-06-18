import type { ChatPreview } from "@/types/chat";
import ChatWindowHeader from "./ChatWindow/ChatWindowHeader";
import MessagesWindow from "./ChatWindow/MessagesWindow";
import ChatInputWithButton from "./ChatWindow/ChatInputWithButton";
import { useEffect, useState } from "react";
import type { Message } from "@/types/message";

export interface ChatWindowProps {
  chat: ChatPreview | null;
  onBack: () => void;
}

// const messages = [
//   // 🗓️ June 15, 2025
//   {
//     id: 1,
//     senderId: "user_1",
//     text: "Hey there!",
//     createdAt: "2025-06-15T09:02:00Z",
//   },
//   {
//     id: 2,
//     senderId: "user_2",
//     text: "Hi! How’s your weekend?",
//     createdAt: "2025-06-15T09:03:10Z",
//   },

//   // 🗓️ June 16, 2025
//   {
//     id: 3,
//     senderId: "user_1",
//     text: "Pretty good. You?",
//     createdAt: "2025-06-16T14:12:00Z",
//   },
//   {
//     id: 4,
//     senderId: "user_2",
//     text: "Just got back from a trip.",
//     createdAt: "2025-06-16T14:13:22Z",
//   },
//   {
//     id: 5,
//     senderId: "user_2",
//     text: "Lots to catch up on.",
//     createdAt: "2025-06-16T14:14:01Z",
//   },

//   // 🗓️ June 17, 2025
//   {
//     id: 6,
//     senderId: "user_1",
//     text: "Want to call later?",
//     createdAt: "2025-06-17T18:45:00Z",
//   },
//   {
//     id: 7,
//     senderId: "user_2",
//     text: "Sure, around 8?",
//     createdAt: "2025-06-17T18:47:00Z",
//   },

//   // 🗓️ June 18, 2025
//   {
//     id: 8,
//     senderId: "user_1",
//     text: "Thanks for the talk last night.",
//     createdAt: "2025-06-18T08:30:00Z",
//   },
//   {
//     id: 9,
//     senderId: "user_2",
//     text: "It really helped me.",
//     createdAt: "2025-06-18T08:31:30Z",
//   },
//   {
//     id: 10,
//     senderId: "user_1",
//     text: "Glad to hear ❤️",
//     createdAt: "2025-06-18T08:33:00Z",
//   },
// ];

const currentUserId = "user_1";

export default function ChatWindow({ chat, onBack }: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      chatId: "1",
      senderId: "user_2",
      text: "Hey!",
      createdAt: new Date().toISOString(),
    },
  ]);

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
          text: "This is a fake reply!",
          createdAt: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, botReply]);
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [messages]);

  if (!chat) return null;

  return (
    <div className="h-screen flex flex-col items-center z-10">
      {/* Header with status */}
      <ChatWindowHeader chat={chat} onBack={onBack} />

      {/* message window */}
      <MessagesWindow messages={messages} />

      {/* chat window input with send button */}
      <ChatInputWithButton setMessages={setMessages} />
    </div>
  );
}
