import type { Chat } from "@/types/Chat";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";
import { getAvatarColor } from "@/lib/avatarColor";

interface ChatWindowProps {
  chat: Chat | null;
  onBack: () => void;
}

export default function ChatWindow({ chat, onBack }: ChatWindowProps) {
  if (!chat) return null;

  return (
    <div className="h-full flex flex-col z-10">
      <div className="p-4 border-b flex items-center gap-4 bg-white dark:bg-[#212121]">
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

      <div className="flex-1 p-4 overflow-y-auto text-muted-foreground ">
        <p>
          This is a chat with <strong>{chat.name}</strong>.
        </p>
        <p className="mt-2 italic">[Message list will go here]</p>
      </div>

      <div className="p-4 border-t">
        <Input placeholder="Type a message..." />
      </div>
    </div>
  );
}
