import type { Message } from "@/types/message";
import { groupMessagesByDate } from "@/utils/utility";
import { useEffect, useMemo, useRef } from "react";
import AudioMessage from "./Messages/AudioMessage";
import FileMessage from "./Messages/FileMessage";
import TextMessage from "./Messages/TextMessage";
import TimeStampForMedia from "./Messages/TimeStampForMedia";
import ImageMessage from "./Messages/ImageMessage";
import VideoMessage from "./Messages/VideoMessage";
import { useMessageStore } from "@/store/useMessageStore";
import { useChatStore } from "@/store/useChatStore";
import { getMessages } from "@/api/messagesApi";
import { toast } from "sonner";
import { useAuthStore } from "@/store/useAuthStore";

const MessagesWindow = () => {
  const selectedChatId = useChatStore((state) => state.selectedChat?.chatId);
  const messagesByChat = useMessageStore((state) => state.messagesByChat);
  const setMessages = useMessageStore((state) => state.setMessages);
  const authUser = useAuthStore((state) => state.user);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedChatId) return;

      try {
        const messages = await getMessages(selectedChatId);
        console.log(messages);

        setMessages(selectedChatId, messages);
      } catch (e) {
        toast.error("failed to fetch messages");
        console.log(e);
      }
    };

    fetchMessages();
  }, [selectedChatId, setMessages]);

  const messages = useMemo(() => {
    return messagesByChat[selectedChatId ?? ""] ?? [];
  }, [messagesByChat, selectedChatId]);

  const chatContainerRef = useRef(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sortedMessages = useMemo(() => {
    return [...messages].sort(
      (a: Message, b: Message) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
  }, [messages]);

  const groupedMessages = groupMessagesByDate(sortedMessages);
  const currentUserId = authUser?.id;

  return (
    <div
      ref={chatContainerRef}
      className="flex-1 w-full max-w-[700px] p-4 text-muted-foreground overflow-y-auto scrollbar-hide"
    >
      {Object.entries(groupedMessages).map(([date, msgs]) => {
        const messages = msgs as Message[];

        return (
          <div key={date}>
            {/* Date Divider */}
            <div className="text-center text-xs text-gray-500 my-4">{date}</div>

            {messages.map((msg: Message) => {
              const isSender = msg.senderId === currentUserId;

              const isSeen = true;

              // msg.seenBy.some((seen) => seen.userId !== currentUserId);

              return (
                <div
                  key={msg.id}
                  className={`flex ${
                    isSender ? "justify-end" : "justify-start"
                  } mb-2`}
                >
                  <div className="max-w-xs space-y-2">
                    {msg.mediaType && (
                      <div
                        className={`rounded-xl overflow-hidden ${
                          msg.mediaType === "image" || msg.mediaType === "video"
                            ? "max-w-[250px]"
                            : "bg-gray-100 dark:bg-[#2c2c2c] p-2"
                        }`}
                      >
                        {msg.mediaType === "image" && msg.mediaUrl && (
                          <ImageMessage mediaUrl={msg.mediaUrl} />
                        )}

                        {msg.mediaType === "video" && msg.mediaUrl && (
                          <VideoMessage src={msg.mediaUrl} />
                        )}

                        {msg.mediaType === "audio" && msg.mediaUrl && (
                          <AudioMessage src={msg.mediaUrl} />
                        )}

                        {msg.mediaType === "file" && msg.mediaUrl && (
                          <FileMessage src={msg.mediaUrl} />
                        )}
                      </div>
                    )}

                    {/* Text */}
                    {msg.content && (
                      <TextMessage
                        msg={msg}
                        isSeen={isSeen}
                        isSender={isSender}
                      />
                    )}

                    {/* Timestamp for media */}
                    {!msg.content && (
                      <TimeStampForMedia
                        createdAt={msg.createdAt}
                        isSender={isSender}
                        isSeen={isSeen}
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}

      <div ref={bottomRef} />
    </div>
  );
};

export default MessagesWindow;
