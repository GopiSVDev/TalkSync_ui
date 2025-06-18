import { ArrowLeft } from "lucide-react";
import type { ChatWindowProps } from "../ChatWindow";
import { getAvatarColor } from "@/lib/avatarColor";

const ChatWindowHeader = ({ chat, onBack }: ChatWindowProps) => {
  return (
    <div className="w-full p-4 border-b flex items-center gap-4 bg-white dark:bg-[#212121]">
      <ArrowLeft
        onClick={onBack}
        className="md:hidden cursor-pointer rounded-3xl hover:bg-[rgba(244,244,245)] dark:hover:bg-[rgba(44,44,44)]"
        size={30}
      />
      <div
        className={`w-[40px] h-[40px] rounded-full shrink-0 flex items-center justify-center text-lg font-medium text-white ${getAvatarColor(
          chat.name
        )}`}
      >
        {chat.name[0]}
      </div>
      <div className="flex flex-col">
        <div className="text-[16px] font-semibold">{chat.name}</div>
        <div className="text-sm font-normal text-muted-foreground">
          last seen recently
        </div>
      </div>
    </div>
  );
};

export default ChatWindowHeader;
