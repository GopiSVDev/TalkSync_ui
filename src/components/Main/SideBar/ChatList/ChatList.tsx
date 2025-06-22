import type { ChatListProps } from "@/types/chat";
import ChatCard from "./ChatCard";

const ChatList = ({ chats, onSelect, selectedChat }: ChatListProps) => {
  return (
    <>
      {chats.map((chat) => (
        <ChatCard
          key={chat.id}
          chat={chat}
          selectedChat={selectedChat}
          onSelect={onSelect}
        />
      ))}
    </>
  );
};

export default ChatList;
