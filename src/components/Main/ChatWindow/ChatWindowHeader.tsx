import { ArrowLeft, EllipsisVertical, Trash } from "lucide-react";
import { getAvatarColor } from "@/utils/avatarColor";
import { useChatStore } from "@/store/useChatStore";
import { formatLastSeen } from "@/utils/utility";
import { useRealTimeStore } from "@/store/useRealtimeStore";
import { useAuthStore } from "@/store/useAuthStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { deleteChat } from "@/api/chatApi";
import { toast } from "sonner";

const ChatWindowHeader = () => {
  const onlineUsers = useRealTimeStore((state) => state.onlineUsers);
  const typingStatus = useRealTimeStore((s) => s.typingStatus);

  const selectedChat = useChatStore((state) => state.selectedChat);
  const selectedChatId = selectedChat?.chatId;
  const setSelectedChat = useChatStore((state) => state.setSelectedChat);

  const { fetchChats } = useChatStore();

  const authUserId = useAuthStore((state) => state.user?.id);

  if (!selectedChat?.participants || selectedChat.participants.length === 0) {
    return null;
  }

  const otherUser = selectedChat?.participants?.find((p) => p.id != authUserId);

  const isOnline = otherUser
    ? onlineUsers[otherUser.id] ?? otherUser.isOnline ?? false
    : false;

  const typingUsers = typingStatus[selectedChatId ?? ""] || [];
  const othersTyping = typingUsers.filter((id: string) => id !== authUserId);

  const handleDelete = async () => {
    const confirm = window.confirm(
      "Are you sure you want to delete this chat?"
    );
    if (!confirm) return;

    try {
      await deleteChat(selectedChat.chatId);
      setSelectedChat(null);
      await fetchChats();
    } catch (err) {
      toast.error("Failed To Delete Chat");
      console.log(err);
    }
  };

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
            isOnline ? "text-emerald-500" : "text-muted-foreground"
          }`}
        >
          {othersTyping.length > 0
            ? "typing..."
            : isOnline
            ? "Online"
            : otherUser?.lastSeen
            ? formatLastSeen(otherUser.lastSeen)
            : "Last seen unknown"}
        </div>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild className="p-0">
          <Button
            className="cursor-pointer bg-white hover:bg-[rgba(244,244,245)] dark:bg-[#212121] dark:hover:bg-[rgba(44,44,44)] rounded-4xl p-0"
            variant="secondary"
          >
            <EllipsisVertical className="!h-5 !w-5" size={30} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-56 bg-white/70 dark:bg-[#212121]/80 backdrop-blur-sm border-none shadow-md space-y-1.5"
          align="start"
        >
          <DropdownMenuItem
            className="font-medium cursor-pointer data-[highlighted]:bg-gray-200/70 dark:hover:bg-black/30"
            onClick={handleDelete}
          >
            <Trash />
            Delete Chat
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ChatWindowHeader;
