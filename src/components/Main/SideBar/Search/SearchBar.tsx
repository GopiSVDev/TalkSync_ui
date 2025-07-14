import { Input } from "@/components/ui/input";
import clsx from "clsx";
import { Search, X } from "lucide-react";
import { useState } from "react";

const SearchBar = ({
  searchQuery,
  setSearchQuery,
  setMode,
}: {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  setMode: React.Dispatch<
    React.SetStateAction<"chats" | "settings" | "profile" | "search">
  >;
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div
      className={clsx(
        "w-full h-12 flex items-center gap-1 rounded-3xl px-4 transition-all",
        "bg-[#f4f4f5] dark:bg-[#2c2c2c]",
        isFocused && "ring-2 ring-[#3390ec] dark:ring-[#766ac8] shadow-md"
      )}
    >
      <Search
        className={clsx(
          "transition-colors",
          isFocused ? "text-[#3390ec] dark:text-[#766ac8]" : "text-[#aaa]"
        )}
      />

      <Input
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onSelect={() => setMode("search")}
        className="flex-1 border-none shadow-none bg-transparent dark:bg-transparent text-[16px] font-normal focus:outline-none"
      />

      {searchQuery && (
        <X
          className="text-[#aaa] cursor-pointer transition-opacity duration-150"
          onClick={() => setSearchQuery("")}
        />
      )}
    </div>
  );
};

export default SearchBar;
