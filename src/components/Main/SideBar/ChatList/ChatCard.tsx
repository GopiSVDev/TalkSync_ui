import type { ChatUser } from "@/types/chat";
import { Card } from "../../../ui/card";
import { useRef } from "react";
import { getAvatarColor } from "@/utils/avatarColor";
import { useChatStore } from "@/store/useChatStore";

const ChatCard = ({ chat }: { chat: ChatUser }) => {
  const selectedChat = useChatStore((state) => state.selectedChat);
  const setSelectedChat = useChatStore((state) => state.setSelectedChat);

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

  if (!chat) return;

  return (
    <Card
      key={chat.id}
      className={`relative overflow-hidden px-4 py-2 cursor-pointer border-none h-[84px] bg-white dark:bg-[#212121] ${
        selectedChat?.id === chat.id
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
          <div
            className={`w-[56px] h-[56px] rounded-full shrink-0 flex items-center justify-center text-lg font-medium text-white overflow-hidden ${getAvatarColor(
              chat.displayName
            )}`}
          >
            {chat.avatarUrl ? (
              <img src={chat.avatarUrl} />
            ) : (
              chat.displayName[0]
            )}
          </div>

          {/* Chat Info */}
          <div className="flex flex-col flex-1 min-w-0">
            <div className="text-[16px] font-semibold text-foreground truncate flex justify-between items-center gap-3">
              <p
                className={`${selectedChat?.id == chat.id ? "text-white" : ""}`}
              >
                {chat.displayName}
              </p>
              <p
                className={`truncate text-[12px] font-light ${
                  selectedChat?.id == chat.id ? "text-white" : ""
                }`}
              >
                {chat.time}
              </p>
            </div>
            {chat.lastMessage && (
              <div
                className={`text-sm text-muted-foreground truncate ${
                  selectedChat?.id == chat.id ? "text-white" : ""
                }`}
              >
                {chat.lastMessage}
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ChatCard;
