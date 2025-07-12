import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import type { Message } from "@/types/message";
import { useStompStore } from "@/store/useStompStore";

interface Props {
  message: Message;
  chatId?: string;
  children: React.ReactNode;
}

export const SeenMessageWrapper = ({ message, chatId, children }: Props) => {
  const { ref, inView } = useInView({ threshold: 1, triggerOnce: true });
  const currentUserId = useAuthStore((s) => s.user?.id);
  const client = useStompStore((s) => s.client);

  useEffect(() => {
    if (
      !client?.connected ||
      !chatId ||
      !currentUserId ||
      message.senderId === currentUserId
    ) {
      return;
    }

    const alreadySeen = message.seenBy.some(
      (seen) => seen.userId === currentUserId
    );

    if (inView && !alreadySeen) {
      client.publish({
        destination: "/app/chat.seen",
        body: JSON.stringify({
          chatId,
          userId: currentUserId,
          messageIds: [message.id],
        }),
      });
    }
  }, [inView, chatId, client?.connected, currentUserId, message]);

  return <div ref={ref}>{children}</div>;
};
