import type { Message } from "@/types/message";
import { Check } from "lucide-react";
import { format } from "date-fns";

const TextMessage = ({
  msg,
  isSender,
  isSeen,
}: {
  msg: Message;
  isSender: boolean;
  isSeen: boolean;
}) => {
  return (
    <div
      className={`inline-block px-4 py-2 rounded-2xl text-sm break-words whitespace-pre-wrap relative ${
        isSender
          ? "bg-[#EEFFDE] dark:bg-[#8373d3] text-black dark:text-white rounded-br-none"
          : "bg-gray-100 dark:bg-[#212121] text-gray-800 dark:text-white rounded-bl-none"
      }`}
    >
      <span className="block break-words pr-16 text-[16px]">{msg.content}</span>

      {/* Timestamp + Ticks */}
      <span className="absolute bottom-0 right-2 flex items-center gap-[2px] text-xs text-gray-400  dark:text-white">
        {format(new Date(msg.createdAt), "h:mm a")}
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
