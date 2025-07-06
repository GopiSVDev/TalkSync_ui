import { Card } from "../../../ui/card";
import { getAvatarColor } from "@/utils/avatarColor";
import { useChatStore } from "@/store/useChatStore";
import { useAuthStore } from "@/store/useAuthStore";
import type { UserBase } from "@/types/user";
import { getOrCreatePrivateChat } from "@/api/chatApi";

const SearchCard = ({ user }: { user: UserBase }) => {
  const authUser = useAuthStore((state) => state.user);
  const setSelectedChat = useChatStore((state) => state.setSelectedChat);

  const handleClick = async () => {
    if (!authUser?.id) return;

    try {
      const chat = await getOrCreatePrivateChat(authUser.id, user.id);
      setSelectedChat(chat);
    } catch (error) {
      console.error("Failed to get or create chat", error);
    }
  };

  if (!user) return;

  const displayName = user.displayName;

  return (
    <Card
      className={`relative overflow-hidden px-4 py-2 cursor-pointer border-none h-[84px] bg-white dark:bg-[#212121] hover:bg-[rgb(244,244,245)] dark:hover:bg-[rgba(44,44,44)]`}
      onClick={handleClick}
    >
      <div onClick={handleClick}>
        <div className="flex items-center gap-4 h-full">
          {/* Avatar / Logo */}

          <div className="relative">
            <div
              className={`w-[56px] h-[56px] rounded-full shrink-0 flex items-center justify-center text-lg font-medium text-white overflow-hidden ${getAvatarColor(
                displayName
              )}`}
            >
              {user.avatarUrl ? (
                <img src={user.avatarUrl} />
              ) : (
                displayName[0]?.toUpperCase() || "?"
              )}

              <span
                className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                  user.isOnline ? "bg-green-500" : "bg-gray-400"
                }`}
              ></span>
            </div>
          </div>

          {/* Chat Info */}
          <div className="flex flex-col flex-1 min-w-0">
            <p className="truncate font-bold">{displayName}</p>
            <p className="truncate text-blue-600 dark:text-purple-600">
              @{user.username.toLowerCase()}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default SearchCard;
