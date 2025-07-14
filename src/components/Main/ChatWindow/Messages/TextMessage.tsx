import type { Message } from "@/types/message";
import { Check } from "lucide-react";
import { format } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { useInView } from "react-intersection-observer";
import { useAuthStore } from "@/store/useAuthStore";
import { useStompStore } from "@/store/useStompStore";
import { useEffect } from "react";
import { useChatStore } from "@/store/useChatStore";

const TextMessage = ({
  msg,
  isSender,
  isSeen,
}: {
  msg: Message;
  isSender: boolean;
  isSeen: boolean;
}) => {
  const { ref, inView } = useInView({ threshold: 0.5, triggerOnce: true });
  const currentUserId = useAuthStore((s) => s.user?.id);
  const client = useStompStore((s) => s.client);
  const chatId = useChatStore((s) => s.selectedChat?.chatId);
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const zonedDate = toZonedTime(msg.createdAt, timeZone);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (
        !client?.connected ||
        !chatId ||
        !currentUserId ||
        msg.senderId === currentUserId
      ) {
        return;
      }

      const alreadySeen = msg.seenBy.some(
        (seen) => seen.userId === currentUserId
      );

      if (inView && !alreadySeen) {
        client.publish({
          destination: "/app/chat.seen",
          body: JSON.stringify({
            chatId,
            userId: currentUserId,
            messageIds: [msg.id],
          }),
        });
      }
    }, 1000);

    return () => clearTimeout(timeout);
  }, [inView, chatId, client?.connected, currentUserId, msg]);

  return (
    <div
      ref={ref}
      className={`inline-block px-4 py-2 rounded-2xl text-sm break-words whitespace-pre-wrap relative ${
        isSender
          ? "bg-[#EEFFDE] dark:bg-[#8373d3] text-black dark:text-white rounded-br-none"
          : "bg-gray-100 dark:bg-[#212121] text-gray-800 dark:text-white rounded-bl-none"
      }`}
    >
      <span className="block break-words pr-20 text-[16px]">{msg.content}</span>

      <span className="absolute bottom-0 right-2 flex items-center gap-[2px] text-xs text-gray-400  dark:text-white">
        {format(zonedDate, "h:mm a")}
        {isSender && (
          <>
            {isSeen ? (
              <span className="flex items-center">
                <Check className="w-4 h-4" />
                <Check className="w-4 h-4 -ml-2" />
              </span>
            ) : (
              <span>
                <Check className="w-4 h-4" />
              </span>
            )}
          </>
        )}
      </span>
    </div>
  );
};

export default TextMessage;
