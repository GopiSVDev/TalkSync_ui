import { Card } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

const ChatCardSkeleton = () => {
  return (
    <Card className="relative overflow-hidden px-4 py-2 h-[84px] bg-white dark:bg-[#212121] border-none">
      <div className="flex items-center gap-4 h-full">
        <div className="relative">
          <Skeleton className="w-[56px] h-[56px] rounded-full shrink-0" />
          <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white bg-gray-300 dark:bg-gray-600" />
        </div>

        <div className="flex flex-col flex-1 min-w-0">
          <div className="flex justify-between items-center gap-3 mb-1">
            <Skeleton className="h-[16px] w-[60%] rounded-sm" />
          </div>
          <div className="flex justify-between items-center gap-3">
            <Skeleton className="h-[12px] w-[40%] rounded-sm" />
            <Skeleton className="h-[12px] w-[20%] rounded-sm" />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ChatCardSkeleton;
