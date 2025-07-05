import type { ChatUser } from "@/types/chat";
import { Card } from "../../../ui/card";
import { getAvatarColor } from "@/utils/avatarColor";

const SearchCard = ({
  chat,
  setSelectedChat,
}: {
  chat: ChatUser;
  setSelectedChat: (chat: ChatUser) => void;
}) => {
  if (!chat) return;

  return (
    <Card
      key={chat.id}
      className={`relative overflow-hidden px-4 py-2 cursor-pointer border-none h-[84px] bg-white dark:bg-[#212121] hover:bg-[rgb(244,244,245)] dark:hover:bg-[rgba(44,44,44)]`}
      onClick={() => setSelectedChat(chat)}
    >
      <div onClick={() => setSelectedChat(chat)}>
        <div className="flex items-center gap-4 h-full">
          {/* Avatar / Logo */}
          <div
            className={`w-[56px] h-[56px] rounded-full shrink-0 flex items-center justify-center text-lg font-medium text-white overflow-hidden ${getAvatarColor(
              chat.displayName
            )}`}
          >
            {chat.avatarUrl ? (
              <img src={chat.avatarUrl} />
            ) : (
              chat.displayName[0]
            )}
          </div>

          {/* Chat Info */}
          <div className="flex flex-col flex-1 min-w-0">
            <p className="truncate font-bold">{chat.displayName}</p>
            <p className="truncate text-blue-600 dark:text-purple-600">
              @{chat.username.toLowerCase()}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default SearchCard;
