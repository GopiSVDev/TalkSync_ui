import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SendHorizonal, Smile } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { useTheme } from "@/hooks/use-theme";
import type { EmojiPickerEmoji } from "@/types/emoji";
import { useStompClient } from "@/hooks/useStompClient";
import { useChatStore } from "@/store/useChatStore";
import { useAuthStore } from "@/store/useAuthStore";

const ChatInputWithButton = () => {
  const { theme } = useTheme();
  const [msg, setMsg] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const client = useStompClient();

  const selectedChat = useChatStore((state) => state.selectedChat);
  const authUser = useAuthStore.getState().user;

  const typingTimeout = useRef<NodeJS.Timeout | null>(null);

  const sendTypingStatus = (isTyping: boolean) => {
    if (!authUser?.id || !selectedChat?.chatId || !client || !client.connected)
      return;

    client.publish({
      destination: "/app/typing",
      body: JSON.stringify({
        chatId: selectedChat.chatId,
        userId: authUser.id,
        typing: isTyping,
      }),
    });
  };

  const insertEmojiAtCursor = (emoji: EmojiPickerEmoji) => {
    const emojiChar = emoji.native;
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const newValue = msg.slice(0, start) + emojiChar + msg.slice(end);

    setMsg(newValue);

    setTimeout(() => {
      textarea.focus();
      textarea.selectionStart = textarea.selectionEnd =
        start + emojiChar.length;
    }, 0);
  };

  useEffect(() => {
    return () => {
      if (typingTimeout.current) clearTimeout(typingTimeout.current);
    };
  }, []);

  if (!selectedChat) return;

  const sendMessage = () => {
    if (!selectedChat || !authUser || !client || !client.connected) return;

    client.publish({
      destination: "/app/chat.send",
      body: JSON.stringify({
        chatId: selectedChat.chatId,
        senderId: authUser.id,
        content: msg.trim(),
      }),
    });

    setMsg("");
  };

  return (
    <div className="w-full flex gap-2 items-center">
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
                theme={theme === "dark" ? "dark" : "light"}
                skinTonePosition="none"
                previewPosition="none"
              />
            </div>
          )}
        </div>
        <Textarea
          rows={1}
          ref={textareaRef}
          className="w-full py-2 px-3 h-fit border-none active:border-none resize-none overflow-y-auto max-h-40 break-words dark:bg-[#212121] text-[16px]"
          placeholder="Message"
          value={msg}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              if (msg.trim()) sendMessage();
              setMsg("");
            }
          }}
          onChange={(e) => {
            setMsg(e.target.value);

            sendTypingStatus(true);

            if (typingTimeout.current) clearTimeout(typingTimeout.current);

            typingTimeout.current = setTimeout(() => {
              sendTypingStatus(false);
            }, 1000);

            const el = textareaRef.current;
            if (el) {
              el.style.height = "auto";
              el.style.height = `${el.scrollHeight}px`;
            }
          }}
          style={{
            minHeight: "48px",
            fontSize: "16px",
          }}
        />
      </div>
      <Button
        disabled={msg.trim() == ""}
        onClick={sendMessage}
        className="group cursor-pointer bg-white hover:bg-[#3390ec] dark:hover:bg-[#766ac8] dark:bg-[#212121] rounded-4xl h-[52px] w-[52px] overflow-hidden"
      >
        <SendHorizonal className="!h-5 !w-5 text-[#3390ec] fill-[#3390ec] group-hover:text-white group-hover:fill-white dark:text-[#766ac8] dark:fill-[#766ac8] dark:group-hover:text-white dark:group-hover:fill-white transition-colors duration-300" />
      </Button>
    </div>
  );
};

export default ChatInputWithButton;
