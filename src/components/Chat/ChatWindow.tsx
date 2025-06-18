import type { Chat } from "@/types/Chat";
import { ArrowLeft, SendHorizonal, Smile } from "lucide-react";
import { getAvatarColor } from "@/lib/avatarColor";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

interface ChatWindowProps {
  chat: Chat | null;
  onBack: () => void;
}

const messages = [
  { id: 1, senderId: "user_123", text: "Hello!" },
  { id: 2, senderId: "user_456", text: "Hey there!" },
  { id: 3, senderId: "user_123", text: "How are you?" },
  { id: 4, senderId: "user_456", text: "I’m good, thanks!" },
  { id: 1, senderId: "user_123", text: "Hello!" },
  { id: 2, senderId: "user_456", text: "Hey there!" },
  { id: 3, senderId: "user_123", text: "How are you?" },
  { id: 4, senderId: "user_456", text: "I’m good, thanks!" },
  { id: 1, senderId: "user_123", text: "Hello!" },
  { id: 2, senderId: "user_456", text: "Hey there!" },
  { id: 3, senderId: "user_123", text: "How are you?" },
  { id: 4, senderId: "user_456", text: "I’m good, thanks!" },
  { id: 1, senderId: "user_123", text: "Hello!" },
  { id: 2, senderId: "user_456", text: "Hey there!" },
  { id: 3, senderId: "user_123", text: "How are you?" },
  { id: 4, senderId: "user_456", text: "I’m good, thanks!" },
  { id: 1, senderId: "user_123", text: "Hello!" },
  { id: 2, senderId: "user_456", text: "Hey there!" },
  { id: 3, senderId: "user_123", text: "How are you?" },
  { id: 4, senderId: "user_456", text: "I’m good, thanks!" },
];
const currentUserId = "user_456";

export default function ChatWindow({ chat, onBack }: ChatWindowProps) {
  if (!chat) return null;

  return (
    <div className="h-screen flex flex-col items-center z-10">
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

      {/* message window */}
      <div className="flex-1 w-full max-w-[700px] p-4 text-muted-foreground overflow-y-auto scrollbar-hide">
        {messages.map((msg) => {
          const isSender = msg.senderId === currentUserId;

          return (
            <div
              key={msg.id}
              className={`flex ${
                isSender ? "justify-end" : "justify-start"
              } mb-2`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-2xl text-sm ${
                  isSender
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-gray-100 text-gray-800 rounded-bl-none"
                }`}
              >
                {msg.text}
              </div>
            </div>
          );
        })}
      </div>

      {/* chat window input with send button */}
      <div className="w-full items-center max-w-[700px] py-2 px-4 flex gap-2 h-auto">
        <div className="bg-white dark:bg-[#212121] w-full flex items-center gap-1 px-4 rounded-3xl min-w-0">
          <Smile className="text-gray-500" />
          <Textarea
            className="w-full py-4 px-3 h-fit border-none active:border-none resize-none overflow-y-auto max-h-40 break-words text-base dark:bg-[#212121]"
            placeholder="Message"
          />
        </div>
        <Button className="group cursor-pointer bg-white hover:bg-[#3390ec] dark:hover:bg-[#766ac8] dark:bg-[#212121] rounded-4xl h-[52px] w-[52px] overflow-hidden">
          <SendHorizonal className="!h-5 !w-5 text-[#3390ec] fill-[#3390ec] group-hover:text-white group-hover:fill-white dark:text-[#766ac8] dark:fill-[#766ac8] dark:group-hover:text-white dark:group-hover:fill-white transition-colors duration-300" />
        </Button>
      </div>
    </div>
  );
}
