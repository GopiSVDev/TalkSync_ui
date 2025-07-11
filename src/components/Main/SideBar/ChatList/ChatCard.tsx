import { Card } from "../../../ui/card";
import { useRef } from "react";
import { getAvatarColor } from "@/utils/avatarColor";
import { useChatStore } from "@/store/useChatStore";
import type { ChatDetail } from "@/types/chat";
import { useRealTimeStore } from "@/store/useRealtimeStore";
import { useAuthStore } from "@/store/useAuthStore";
import { format } from "date-fns";

const ChatCard = ({ chat }: { chat: ChatDetail }) => {
  const selectedChat = useChatStore((state) => state.selectedChat);
  const setSelectedChat = useChatStore((state) => state.setSelectedChat);

  const authUser = useAuthStore((state) => state.user);
  const otherUser = chat.participants.find((p) => p.id != authUser?.id);
  const onlineUsers = useRealTimeStore((state) => state.onlineUsers);

  const isOnline = otherUser
    ? onlineUsers[otherUser.id] ?? otherUser.isOnline ?? false
    : false;

  const rippleRef = useRef<HTMLDivElement>(
    null
  ) as React.RefObject<HTMLDivElement>;

  const handleRipple = (
    e: React.MouseEvent<HTMLDivElement>,
    ref: React.RefObject<HTMLDivElement>
  ) => {
    const target = ref?.current;
    if (!target) return;

    const ripple = document.createElement("span");

    const diameter = Math.max(target.clientWidth, target.clientHeight);
    const radius = diameter / 2;

    ripple.style.width = ripple.style.height = `${diameter}px`;
    ripple.style.left = `${
      e.clientX - target.getBoundingClientRect().left - radius
    }px`;
    ripple.style.top = `${
      e.clientY - target.getBoundingClientRect().top - radius
    }px`;
    ripple.className =
      "absolute bg-black/30 rounded-full animate-ripple pointer-events-none";

    const existing = target.querySelector(".ripple-temp");
    if (existing) existing.remove();

    ripple.classList.add("ripple-temp");
    target.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
  };

  const isSelected = selectedChat?.chatId == chat.chatId;
  const displayName = chat.name;
  const avatarLetter = displayName[0]?.toUpperCase() || "?";

  if (!chat) return null;
  return (
    <Card
      className={`relative overflow-hidden px-4 py-2 cursor-pointer border-none h-[84px] bg-white dark:bg-[#212121] ${
        selectedChat?.chatId === chat.chatId
          ? "bg-[#3390ec] dark:bg-[#766ac8]"
          : "hover:bg-[rgb(244,244,245)] dark:hover:bg-[rgba(44,44,44)]"
      }`}
      onClick={() => setSelectedChat(chat)}
    >
      <div
        ref={rippleRef}
        onClick={(e) => {
          handleRipple(e, rippleRef);
          setSelectedChat(chat);
        }}
      >
        <div className="flex items-center gap-4 h-full">
          {/* Avatar / Logo */}
          <div className="relative">
            <div
              className={`w-[56px] h-[56px] rounded-full shrink-0 flex items-center justify-center text-lg font-medium text-white overflow-hidden ${getAvatarColor(
                displayName
              )}`}
            >
              {chat.avatarUrl ? <img src={chat.avatarUrl} /> : avatarLetter}
            </div>

            <span
              className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                isOnline ? "bg-green-500" : "bg-gray-400"
              }`}
            ></span>
          </div>

          {/* Chat Info */}
          <div className="flex flex-col flex-1 min-w-0">
            <div className="text-[16px] font-semibold text-foreground  flex justify-between items-center gap-3">
              <p className={`truncate ${isSelected ? "text-white" : ""}`}>
                {displayName}
              </p>
            </div>
            {chat.lastMessage && (
              <div
                className={`flex justify-between items-center text-sm text-muted-foreground truncate ${
                  selectedChat?.chatId == chat.chatId ? "text-white" : ""
                }`}
              >
                <p>{chat.lastMessage}</p>
                <p
                  className={`truncate text-[12px] font-light ${
                    isSelected ? "text-white" : ""
                  }`}
                >
                  {(chat.lastMessageTime &&
                    format(new Date(chat.lastMessageTime), "hh:mm a")) ||
                    ""}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ChatCard;
