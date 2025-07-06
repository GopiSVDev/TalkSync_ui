import { ArrowLeft } from "lucide-react";
import { getAvatarColor } from "@/utils/avatarColor";
import { useChatStore } from "@/store/useChatStore";
import { formatLastSeen } from "@/utils/utility";

const ChatWindowHeader = () => {
  const selectedChat = useChatStore((store) => store.selectedChat);
  const setSelectedChat = useChatStore((store) => store.setSelectedChat);

  if (!selectedChat) return;

  return (
    <div className="w-full p-4 border-b flex items-center gap-4 bg-white dark:bg-[#212121]">
      <ArrowLeft
        onClick={() => setSelectedChat(null)}
        className="shrink-0 md:hidden cursor-pointer rounded-3xl hover:bg-[rgba(244,244,245)] dark:hover:bg-[rgba(44,44,44)]"
        size={30}
      />
      <div
        className={`w-[40px] h-[40px] rounded-full shrink-0 flex items-center justify-center text-lg font-medium text-white overflow-hidden ${getAvatarColor(
          selectedChat.name
        )}`}
      >
        {selectedChat.avatarUrl ? (
          <img src={selectedChat.avatarUrl} />
        ) : (
          selectedChat.name[0]
        )}
      </div>

      <div className="w-full flex flex-col min-w-0">
        <div className="truncate text-[16px] font-semibold">
          {selectedChat.name}
        </div>
        <div
          className={`text-sm font-medium ${
            selectedChat.isOnline ? "text-emerald-500" : "text-muted-foreground"
          }`}
        >
          {selectedChat.isOnline
            ? "Online"
            : selectedChat.lastSeen
            ? formatLastSeen(selectedChat.lastSeen)
            : "last seen unknown"}
        </div>
      </div>
    </div>
  );
};

export default ChatWindowHeader;
