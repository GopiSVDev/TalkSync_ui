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
    <div className="[height:calc(var(--vh)_*_100)] flex flex-col gap-2 bg-white dark:bg-[#212121] z-10">
      <div className="sticky top-0 z-10 bg-white dark:bg-[#212121] p-4 font-semibold text-lg">
        {mode === "chats" ? (
          <div className="flex items-center gap-2">
            <DropDownMenu setMode={setMode} />
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              setMode={setMode}
            />
          </div>
        ) : mode == "search" ? (
          <div className="flex items-center gap-2">
            <ArrowLeft
              className="cursor-pointer rounded-3xl hover:bg-[rgba(244,244,245)] dark:hover:bg-[rgba(44,44,44)]"
              size={35}
              onClick={() => setMode("chats")}
            />
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              setMode={setMode}
            />
          </div>
        ) : (
          <div className="flex gap-4 items-center">
            <ArrowLeft
              className="cursor-pointer rounded-3xl hover:bg-[rgba(244,244,245)] dark:hover:bg-[rgba(44,44,44)]"
              size={30}
              onClick={() => setMode("chats")}
            />
            <p className="text-[20px]">
              {mode.substring(0, 1).toUpperCase() + mode.substring(1)}
            </p>
          </div>
        )}
      </div>
      <div className="flex-1 overflow-y-auto overscroll-contain">
        {components[mode]}
      </div>
    </div>
  );
}
