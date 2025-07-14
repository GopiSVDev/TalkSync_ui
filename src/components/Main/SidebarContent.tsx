import { DropDownMenu } from "./SideBar/DropDownMenu";
import ChatList from "./SideBar/ChatList/ChatList";
import Settings from "./SideBar/Settings";
import Profile from "./SideBar/Profile";
import { useState, type JSX } from "react";
import { ArrowLeft } from "lucide-react";
import SearchBar from "./SideBar/Search/SearchBar";
import SearchList from "./SideBar/Search/SearchList";

export default function SidebarContent({
  mode,
  setMode,
}: {
  mode: string;
  setMode: React.Dispatch<
    React.SetStateAction<"chats" | "settings" | "profile" | "search">
  >;
}) {
  const [searchQuery, setSearchQuery] = useState("");

  const components: Record<string, JSX.Element> = {
    chats: <ChatList />,
    settings: <Settings setMode={setMode} />,
    profile: <Profile setMode={setMode} />,
    search: <SearchList searchQuery={searchQuery} />,
  };

  return (
    <div className="h-full flex flex-col gap-2 bg-white dark:bg-[#212121] z-10">
      <div className="sticky top-0 z-10 bg-white dark:bg-[#212121] p-4 font-semibold text-lg transition-all duration-300">
        <div className="flex items-center gap-2">
          <div className="w-[40px] flex justify-center transition-all duration-300">
            {mode === "chats" ? (
              <DropDownMenu setMode={setMode} />
            ) : (
              <ArrowLeft
                className="cursor-pointer rounded-3xl hover:bg-[rgba(244,244,245)] dark:hover:bg-[rgba(44,44,44)]"
                size={30}
                onClick={() => setMode("chats")}
              />
            )}
          </div>

          <div className="flex-1 transition-all duration-300">
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              setMode={setMode}
            />
          </div>
        </div>
      </div>

      {/* Components page */}
      <div className="flex-1 overflow-y-auto overscroll-none h-full">
        {components[mode]}
      </div>
    </div>
  );
}
