import { ArrowLeft } from "lucide-react";
import { getAvatarColor } from "@/lib/avatarColor";
import { useChatStore } from "@/store/useChatStore";
import type { ChatUser } from "@/types/chat";

const ChatWindowHeader = ({ chat }: { chat: ChatUser }) => {
  const setSelectedChat = useChatStore((store) => store.setSelectedChat);
  if (!chat) return;

  return (
    <div className="w-full p-4 border-b flex items-center gap-4 bg-white dark:bg-[#212121]">
      <ArrowLeft
        onClick={() => setSelectedChat(null)}
        className="shrink-0 md:hidden cursor-pointer rounded-3xl hover:bg-[rgba(244,244,245)] dark:hover:bg-[rgba(44,44,44)]"
        size={30}
      />
      <div
        className={`w-[40px] h-[40px] rounded-full shrink-0 flex items-center justify-center text-lg font-medium text-white overflow-hidden ${getAvatarColor(
          chat.displayName
        )}`}
      >
        {chat.avatarUrl ? <img src={chat.avatarUrl} /> : chat.displayName[0]}
      </div>

      <div className="w-full flex flex-col min-w-0">
        <div className="truncate text-[16px] font-semibold">
          {chat.displayName}
        </div>
        <div className="text-sm font-normal text-muted-foreground">
          last seen recently
        </div>
      </div>
    </div>
  );
};

export default ChatWindowHeader;
