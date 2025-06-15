import { Card } from "@/components/ui/card";
import type { Chat } from "@/types/Chat";
import { DropDownMenu } from "./ChatListHeader/DropDownMenu";

interface ChatListProps {
  chats: Chat[];
  onSelect: (chat: Chat) => void;
}

export default function ChatList({ chats, onSelect }: ChatListProps) {
  return (
    <div className="h-full flex flex-col">
      <div className="p-4 font-semibold text-lg border-b">
        <DropDownMenu />
      </div>
      <div className="flex-1 overflow-y-auto">
        {chats.map((chat) => (
          <Card
            key={chat.id}
            className="p-4 cursor-pointer hover:bg-muted/50 border-b"
            onClick={() => onSelect(chat)}
          >
            {chat.name}
          </Card>
        ))}
      </div>
    </div>
  );
}
