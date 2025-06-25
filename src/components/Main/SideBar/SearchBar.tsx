import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";

const SearchBar = () => {
  return (
    <div className="w-full h-12 flex items-center gap-1 rounded-3xl bg-[#f4f4f5] dark:bg-[#2c2c2c] px-4">
      <Search className="text-[#aaa]" />
      <Input
        placeholder="Search..."
        className="border-none shadow-none dark:bg-[#2c2c2c] text-[16px] font-normal"
      />
      <X className="text-[#aaa] cursor-pointer" />
    </div>
  );
};

export default SearchBar;
