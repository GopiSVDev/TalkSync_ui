import type { Message } from "@/types/message";
import { groupMessagesByDate } from "@/utils/utility";
import { format } from "date-fns";
import { useEffect, useRef } from "react";

const MessagesWindow = ({ messages }: { messages: Message[] }) => {
  const chatContainerRef = useRef(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sortedMessages = [...messages].sort(
    (a: Message, b: Message) =>
      new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  const groupedMessages = groupMessagesByDate(sortedMessages);
  const currentUserId = "user_1";

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

              return (
                <div
                  key={msg.id}
                  className={`flex ${
                    isSender ? "justify-end" : "justify-start"
                  } mb-2`}
                >
                  <div
                    className={`inline-block max-w-xs px-4 py-2 rounded-2xl text-sm break-words whitespace-pre-wrap ${
                      isSender
                        ? "bg-[#EEFFDE] dark:bg-[#8373d3] text-black dark:text-white rounded-br-none"
                        : "bg-gray-100 dark:bg-[#212121] text-gray-800 dark:text-white rounded-bl-none"
                    }`}
                  >
                    <div className="relative space-x-2">
                      <span className="block break-words pr-12 text-[16px]">
                        {msg.content}
                      </span>
                      <span className="absolute bottom-0 right-0 text-xs text-gray-400">
                        {format(new Date(msg.createdAt), "h:mm a")}
                      </span>
                    </div>
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
