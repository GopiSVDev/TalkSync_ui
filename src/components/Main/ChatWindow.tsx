import ChatWindowHeader from "./ChatWindow/ChatWindowHeader";
import MessagesWindow from "./ChatWindow/MessagesWindow";
import ChatInputWithButton from "./ChatWindow/ChatInputWithButton";

export default function ChatWindow({
  setSidebarMode,
}: {
  setSidebarMode: React.Dispatch<
    React.SetStateAction<"chats" | "settings" | "profile" | "search">
  >;
}) {
  return (
    <div className="relative [height:calc(var(--vh)_*_100)] flex flex-col items-center z-10">
      {/* Header with status */}
      <div className="w-full">
        <ChatWindowHeader setSidebarMode={setSidebarMode} />
      </div>

      <div className="relative w-full flex flex-col max-w-[700px] flex-1">
        {/* message window */}
        <div className="flex-1 overflow-y-auto pt-[60px] pb-[72px]">
          <MessagesWindow />
        </div>

        {/* chat window input with send button */}
        <div className="absolute bottom-0 left-0 w-full px-4 pb-2 z-20">
          <ChatInputWithButton />
        </div>
      </div>
    </div>
  );
}
