import ChatWindowHeader from "./ChatWindow/ChatWindowHeader";
import MessagesWindow from "./ChatWindow/MessagesWindow";
import ChatInputWithButton from "./ChatWindow/ChatInputWithButton";
import { useChatStore } from "@/store/useChatStore";

export default function ChatWindow({
  setSidebarMode,
}: {
  setSidebarMode: React.Dispatch<
    React.SetStateAction<"chats" | "settings" | "profile" | "search">
  >;
}) {
  const selectedChat = useChatStore((state) => state.selectedChat);

  if (selectedChat === null) return;

  return (
    <div className="flex flex-col flex-1 w-full items-center min-h-0">
      {/* Header with status */}

      <ChatWindowHeader setSidebarMode={setSidebarMode} />

      <div className="relative w-full max-w-[700px] flex flex-col flex-1 overflow-hidden">
        {/* message window */}

        <MessagesWindow />

        {/* chat window input with send button */}
        <div className="sticky bottom-0 w-full px-4 pb-2 z-20">
          <ChatInputWithButton />
        </div>
      </div>
    </div>
  );
}
