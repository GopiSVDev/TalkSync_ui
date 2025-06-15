import ChatList from "@/components/Chat/ChatList";
import ChatWindow from "@/components/Chat/ChatWindow";
import type { Chat } from "@/types/Chat";
import { useState } from "react";

const mockChats: Chat[] = [
  { id: "1", name: "Alice" },
  { id: "2", name: "Bob" },
  { id: "3", name: "Charlie" },
];

export default function App() {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);

  return (
    <div className="h-screen flex flex-col md:flex-row">
      {/* Chat List (Hidden on mobile if a chat is open) */}
      <div
        className={`w-full md:w-1/3 lg:w-1/4 border-r ${
          selectedChat ? "hidden md:block" : "block"
        }`}
      >
        <ChatList chats={mockChats} onSelect={setSelectedChat} />
      </div>

      {/* Chat Window (Hidden on mobile if no chat is selected) */}
      <div
        className={`chat-bg flex-1 ${
          !selectedChat ? "hidden md:flex" : "flex"
        } flex-col `}
      >
        <ChatWindow chat={selectedChat} onBack={() => setSelectedChat(null)} />
      </div>
    </div>
  );
}
