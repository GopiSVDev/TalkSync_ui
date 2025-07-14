import { Card } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

const SearchCardSkeleton = () => {
  return (
    <Card className="relative overflow-hidden px-4 py-2 h-[84px] border-none bg-white dark:bg-[#212121]">
      <div className="flex items-center gap-4 h-full">
        {/* Avatar Skeleton */}
        <div className="relative">
          <Skeleton className="w-[56px] h-[56px] rounded-full" />
          <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white bg-gray-300 dark:bg-gray-500" />
        </div>

        {/* Text Skeleton */}
        <div className="flex flex-col flex-1 min-w-0 gap-1">
          <Skeleton className="h-[16px] w-3/4" />
          <Skeleton className="h-[14px] w-1/2" />
        </div>
      </div>
    </Card>
  );
};

export default SearchCardSkeleton;
