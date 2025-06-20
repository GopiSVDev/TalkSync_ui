import { DropDownMenu } from "./ChatListHeader/DropDownMenu";
import ChatCard from "./ChatCard";
import type { ChatPreview } from "@/types/chat";

interface ChatListProps {
  chats: ChatPreview[];
  onSelect: (chat: ChatPreview) => void;
  selectedChat: ChatPreview | null;
}

export default function ChatList({
  chats,
  onSelect,
  selectedChat,
}: ChatListProps) {
  return (
    <div className="h-full flex flex-col gap-2 bg-white dark:bg-[#212121] z-10">
      <div className="p-4 font-semibold text-lg">
        <DropDownMenu />
      </div>
      <div className="flex-1 overflow-y-auto px-2">
        {chats.map((chat) => (
          <ChatCard
            key={chat.id}
            chat={chat}
            selectedChat={selectedChat}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
}
