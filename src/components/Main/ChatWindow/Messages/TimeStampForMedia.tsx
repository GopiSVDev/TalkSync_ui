import { format } from "date-fns";
import { Check } from "lucide-react";

const TimeStampForMedia = ({
  createdAt,
  isSender,
  isSeen,
}: {
  createdAt: string;
  isSender: boolean;
  isSeen: boolean;
}) => {
  return (
    <div className="mt-1 flex justify-end pr-1 text-xs font-medium text-white items-center gap-1">
      {format(new Date(createdAt), "h:mm a")}
      {isSender && (
        <span className="inline-flex items-center ml-1 text-white">
          {isSeen ? (
            <span className="flex items-center gap-[1px] ">
              <Check className="w-4 h-4" />
              <Check className="w-4 h-4 -ml-2" />
            </span>
          ) : (
            <Check className="w-4 h-4 text-muted-foreground" />
          )}
        </span>
      )}
    </div>
  );
};

export default TimeStampForMedia;
