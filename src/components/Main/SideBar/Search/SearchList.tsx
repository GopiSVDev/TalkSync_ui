import type { ChatUser } from "@/types/chat";
import SearchCard from "./SearchCard";

const SearchList = ({
  chats,
  setSelectedChat,
}: {
  chats: ChatUser[];
  setSelectedChat: (chat: ChatUser) => void;
}) => {
  return (
    <div>
      {chats.length > 0 && (
        <h2 className="px-4 py-1 md:px-6 font-bold text-[#707579] dark:text-[#AAAAAA]">
          Global Search
        </h2>
      )}
      {chats.length > 0 ? (
        chats.map((chat) => (
          <SearchCard
            key={chat.id}
            chat={chat}
            setSelectedChat={setSelectedChat}
          />
        ))
      ) : (
        <div className="w-full h-full flex flex-col items-center px-4 pt-10">
          <h1 className="text-2xl font-medium">No Search Results</h1>
          <h3 className="text-center">
            Use the search bar above to find people and start chatting.
          </h3>
        </div>
      )}
    </div>
  );
};

export default SearchList;
