import type { UserBase } from "@/types/user";
import SearchCard from "./SearchCard";

const SearchList = ({ results }: { results: UserBase[] }) => {
  return (
    <div>
      {results.length > 0 && (
        <h2 className="px-4 py-1 md:px-6 font-bold text-[#707579] dark:text-[#AAAAAA]">
          Global Search
        </h2>
      )}
      {results.length > 0 ? (
        results.map((result) => <SearchCard key={result.id} user={result} />)
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
