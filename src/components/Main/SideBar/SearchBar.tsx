import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";

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
  return (
    <div className="w-full h-12 flex items-center gap-1 rounded-3xl bg-[#f4f4f5] dark:bg-[#2c2c2c] px-4">
      <Search className="text-[#aaa]" />
      <Input
        placeholder="Search..."
        className="border-none shadow-none dark:bg-[#2c2c2c] text-[16px] font-normal"
        onSelect={() => setMode("search")}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <X
        className="text-[#aaa] cursor-pointer"
        onClick={() => setMode("chats")}
      />
    </div>
  );
};

export default SearchBar;
