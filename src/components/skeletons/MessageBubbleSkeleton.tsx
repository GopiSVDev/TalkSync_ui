import { Skeleton } from "../ui/skeleton";

const MessageBubbleSkeleton = ({ isSender }: { isSender: boolean }) => {
  return (
    <div
      className={`w-full px-4 py-2 rounded-2xl ${
        isSender
          ? "bg-[#EEFFDE] dark:bg-[#8373d3] rounded-br-none ml-auto"
          : "bg-gray-100 dark:bg-[#212121] rounded-bl-none mr-auto"
      }`}
    >
      <Skeleton className="h-4 w-20" />
    </div>
  );
};

export default MessageBubbleSkeleton;
