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
    <div className="h-screen flex flex-col items-center z-10">
      {/* Header with status */}
      <ChatWindowHeader setSidebarMode={setSidebarMode} />

      {/* message window */}
      <MessagesWindow />

      {/* chat window input with send button */}
      <ChatInputWithButton />
    </div>
  );
}
