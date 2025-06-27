import type { ChatListType } from "@/types/chat";
import SearchCard from "./SearchCard";

const SearchList = ({
  chats,
  onSelect,
}: {
  chats: ChatListType[];
  onSelect: (chat: ChatListType) => void;
}) => {
  return (
    <>
      {chats.length > 0 ? (
        chats.map((chat) => (
          <SearchCard key={chat.id} chat={chat} onSelect={onSelect} />
        ))
      ) : (
        <div className="w-full h-full flex flex-col items-center px-4 pt-10">
          <h1 className="text-2xl font-medium">No Search Results</h1>
          <h3 className="text-center">
            Use the search bar above to find people and start chatting.
          </h3>
        </div>
      )}
    </>
  );
};

export default SearchList;
