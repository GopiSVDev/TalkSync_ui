import type { UserBase } from "@/types/user";
import SearchCard from "./SearchCard";
import { useEffect, useState } from "react";
import { useRealTimeStore } from "@/store/useRealtimeStore";
import { searchUsers } from "@/api/userApi";
import SearchCardSkeleton from "@/components/skeletons/SearchCardSkeleton";

const SearchList = ({ searchQuery }: { searchQuery: string }) => {
  const [searchResults, setSearchResults] = useState<UserBase[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const onlineUsers = useRealTimeStore((state) => state.onlineUsers);
  const results = searchResults.map((user) => ({
    ...user,
    isOnline: onlineUsers[user.id] ?? user.isOnline ?? false,
  }));

  useEffect(() => {
    setIsLoading(true);

    const fetch = async () => {
      try {
        const data = await searchUsers(searchQuery);
        setSearchResults(data);
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    };

    const trimmedQuery = searchQuery.trim();

    if (!trimmedQuery) {
      setSearchResults([]);
      return;
    }

    const debounceTimeOut = setTimeout(() => {
      fetch();
    }, 500);

    return () => clearTimeout(debounceTimeOut);
  }, [searchQuery]);

  return (
    <div>
      {searchQuery && isLoading ? (
        <>
          <h2 className="px-4 py-1 md:px-6 font-bold text-[#707579] dark:text-[#AAAAAA]">
            Global Search
          </h2>
          {[1, 2, 3].map(() => (
            <SearchCardSkeleton />
          ))}
        </>
      ) : results.length > 0 ? (
        <>
          <h2 className="px-4 py-1 md:px-6 font-bold text-[#707579] dark:text-[#AAAAAA]">
            Global Search
          </h2>
          {results.map((result) => (
            <SearchCard key={result.id} user={result} />
          ))}
        </>
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
