import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SendHorizonal, Smile } from "lucide-react";
import { useRef, useState } from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

const ChatInputWithButton = ({ setMessages }) => {
  const [msg, setMsg] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const insertEmojiAtCursor = (emoji: any) => {
    const emojiChar = emoji.native;
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const newValue = msg.slice(0, start) + emojiChar + msg.slice(end);

    setMsg(newValue);

    // update cursor position after emoji
    setTimeout(() => {
      textarea.focus();
      textarea.selectionStart = textarea.selectionEnd =
        start + emojiChar.length;
    }, 0);
  };

  const currentUserId = "user_1";

  function sendMessage(text) {
    const newMessage = {
      id: Date.now(),
      senderId: currentUserId,
      text,
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setMsg("");
  }

  return (
    <div className="w-full items-center max-w-[700px] py-2 px-4 flex gap-2 h-auto">
      <div className="bg-white dark:bg-[#212121] w-full flex items-center gap-1 px-4 rounded-3xl min-w-0">
        <div className="relative">
          <Smile
            onClick={() => setShowPicker((prev) => !prev)}
            className="text-gray-500 cursor-pointer"
          />

          {showPicker && (
            <div
              className="absolute bottom-10 left-0 z-10"
              onMouseEnter={() => setShowPicker(true)}
              onMouseLeave={() => setShowPicker(false)}
            >
              <Picker
                data={data}
                onEmojiSelect={insertEmojiAtCursor}
                theme="light"
              />
            </div>
          )}
        </div>
        <Textarea
          ref={textareaRef}
          className="w-full py-4 px-3 h-fit border-none active:border-none resize-none overflow-y-auto max-h-40 break-words text-base dark:bg-[#212121]"
          placeholder="Message"
          value={msg}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              if (msg.trim()) sendMessage(msg);
              setMsg("");
            }
          }}
          onChange={(e) => setMsg(e.target.value)}
        />
      </div>
      <Button
        disabled={msg.trim() == ""}
        onClick={() => sendMessage(msg)}
        className="group cursor-pointer bg-white hover:bg-[#3390ec] dark:hover:bg-[#766ac8] dark:bg-[#212121] rounded-4xl h-[52px] w-[52px] overflow-hidden"
      >
        <SendHorizonal className="!h-5 !w-5 text-[#3390ec] fill-[#3390ec] group-hover:text-white group-hover:fill-white dark:text-[#766ac8] dark:fill-[#766ac8] dark:group-hover:text-white dark:group-hover:fill-white transition-colors duration-300" />
      </Button>
    </div>
  );
};

export default ChatInputWithButton;
