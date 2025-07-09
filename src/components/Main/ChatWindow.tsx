import ChatWindowHeader from "./ChatWindow/ChatWindowHeader";
import MessagesWindow from "./ChatWindow/MessagesWindow";
import ChatInputWithButton from "./ChatWindow/ChatInputWithButton";

export default function ChatWindow() {
  return (
    <div className="h-screen flex flex-col items-center z-10">
      {/* Header with status */}
      <ChatWindowHeader />

      {/* message window */}
      <MessagesWindow />

      {/* chat window input with send button */}
      <ChatInputWithButton />
    </div>
  );
}
