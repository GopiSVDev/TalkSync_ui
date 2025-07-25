import type { Message } from "@/types/message";
import { groupMessagesByDate } from "@/utils/utility";
import { useEffect, useMemo, useRef, useState } from "react";
import TextMessage from "./Messages/TextMessage";
import { useMessageStore } from "@/store/useMessageStore";
import { useChatStore } from "@/store/useChatStore";
import { getMessages } from "@/api/messagesApi";
import { toast } from "sonner";
import { useAuthStore } from "@/store/useAuthStore";
import MessageBubbleSkeleton from "@/components/skeletons/MessageBubbleSkeleton";
import { AnimatePresence, motion } from "motion/react";

const MessagesWindow = () => {
  const selectedChatId = useChatStore((state) => state.selectedChat?.chatId);
  const messagesByChat = useMessageStore((state) => state.messagesByChat);
  const setMessages = useMessageStore((state) => state.setMessages);
  const currentUserId = useAuthStore((state) => state.user?.id);

  const [page, setPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [shouldScrollToBottom, setShouldScrollToBottom] = useState(true);

  const chatContainerRef = useRef(null);

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedChatId) return;

      setIsLoading(true);
      setShouldScrollToBottom(true);
      try {
        const data = await getMessages(selectedChatId, 0);
        setMessages(selectedChatId, data.content);
        setPage(0);
        setIsLastPage(data.last);
      } catch (e) {
        toast.error("failed to fetch messages");
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMessages();
  }, [selectedChatId, setMessages]);

  const onScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (e.currentTarget.scrollTop === 0) {
      loadOlderMessages();
    }
  };

  const loadOlderMessages = async () => {
    if (isLastPage || !selectedChatId || !bottomRef.current) return;

    setShouldScrollToBottom(false);
    try {
      const nextPage = page + 1;
      const data = await getMessages(selectedChatId, nextPage);

      const currentMessages =
        useMessageStore.getState().messagesByChat[selectedChatId] || [];
      const newMessages = [...data.content, ...currentMessages];

      setMessages(selectedChatId, newMessages);
      setPage(nextPage);
      setIsLastPage(data.last);
    } catch (e) {
      toast.error("Failed to load more messages");
      console.error(e);
    }
  };

  const messages = useMemo(() => {
    return messagesByChat[selectedChatId ?? ""] ?? [];
  }, [messagesByChat, selectedChatId]);

  const sortedMessages = useMemo(() => {
    return [...messages].sort(
      (a: Message, b: Message) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
  }, [messages]);

  const groupedMessages = groupMessagesByDate(sortedMessages);

  useEffect(() => {
    if (!shouldScrollToBottom) return;
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, shouldScrollToBottom]);

  return (
    <div
      ref={chatContainerRef}
      onScroll={onScroll}
      className="flex flex-col flex-1 w-full px-4 text-muted-foreground overflow-y-auto scrollbar-hide min-h-0"
    >
      {isLoading ? (
        <div className="space-y-2 px-4 py-4">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`flex ${
                i % 2 === 0 ? "justify-end" : "justify-start"
              }`}
            >
              <div className="max-w-xs">
                <MessageBubbleSkeleton isSender={i % 2 === 0} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        Object.entries(groupedMessages).map(([date, msgs]) => {
          const messages = msgs as Message[];

          return (
            <div key={date}>
              {/* Date Divider */}
              <div className="text-center text-xs text-gray-500 my-4">
                {date}
              </div>
              <AnimatePresence initial={false}>
                {messages.map((msg: Message) => {
                  const isSender = msg.senderId === currentUserId;

                  const isSeen = msg.seenBy.some(
                    (seen) => seen.userId !== currentUserId
                  );

                  return (
                    <motion.div
                      key={msg.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                      className={`flex ${
                        isSender ? "justify-end" : "justify-start"
                      } mb-2`}
                    >
                      <div className="max-w-xs space-y-2">
                        {/* {msg.mediaType && (
                        <div
                          className={`rounded-xl overflow-hidden ${
                            msg.mediaType === "image" ||
                            msg.mediaType === "video"
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
                      )} */}

                        {/* Text */}
                        {msg.content && (
                          <TextMessage
                            msg={msg}
                            isSeen={isSeen}
                            isSender={isSender}
                          />
                        )}

                        {/* Timestamp for media */}
                        {/* {!msg.content && (
                        <TimeStampForMedia
                          createdAt={msg.createdAt}
                          isSender={isSender}
                          isSeen={isSeen}
                        />
                      )} */}
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          );
        })
      )}
      <div ref={bottomRef} />
    </div>
  );
};

export default MessagesWindow;
