import { Card } from "@/components/ui/card";
import type { Chat } from "@/types/Chat";
import { DropDownMenu } from "./ChatListHeader/DropDownMenu";
import { getAvatarColor } from "@/lib/avatarColor";

interface ChatListProps {
  chats: Chat[];
  onSelect: (chat: Chat) => void;
  selectedChat: Chat;
}

export default function ChatList({
  chats,
  onSelect,
  selectedChat,
}: ChatListProps) {
  return (
    <div className="h-full flex flex-col gap-2">
      <div className="p-4 font-semibold text-lg border-b">
        <DropDownMenu />
      </div>
      <div className="flex-1 overflow-y-auto">
        {chats.map((chat) => (
          <Card
            key={chat.id}
            className={`px-4 py-2 cursor-pointer border-none h-[84px] bg-white dark:bg-[#212121] ${
              selectedChat?.id === chat.id
                ? "bg-[#3390ec] dark:bg-[#766ac8]"
                : "hover:bg-[rgba(244,244,245)] dark:hover:bg-[rgba(44,44,44)]"
            }`}
            onClick={() => onSelect(chat)}
          >
            <div className="flex items-center gap-4 h-full">
              {/* Avatar / Logo */}
              <div
                className={`w-[56px] h-[56px] rounded-full shrink-0 flex items-center justify-center text-lg font-medium text-white ${getAvatarColor(
                  chat.name
                )}`}
              >
                {chat.name[0]}
              </div>

              {/* Chat Info */}
              <div className="flex-1">
                <div className="text-[16px] font-semibold text-foreground truncate flex justify-between items-center">
                  <p
                    className={`${
                      selectedChat?.id == chat.id ? "text-white" : ""
                    }`}
                  >
                    {chat.name}
                  </p>
                  <p
                    className={`text-[12px] font-light ${
                      selectedChat?.id == chat.id ? "text-white" : ""
                    }`}
                  >
                    {chat.time}
                  </p>
                </div>
                <div
                  className={`text-sm text-muted-foreground truncate ${
                    selectedChat?.id == chat.id ? "text-white" : ""
                  }`}
                >
                  {chat.lastMessage || "No messages yet"}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
