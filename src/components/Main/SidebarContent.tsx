import { DropDownMenu } from "./SideBar/DropDownMenu";
import ChatList from "./SideBar/ChatList/ChatList";
import type { ChatUser } from "@/types/chat";
import Settings from "./SideBar/Settings";
import Profile from "./SideBar/Profile";
import { useEffect, useState, type JSX } from "react";
import { ArrowLeft } from "lucide-react";
import SearchBar from "./SideBar/Search/SearchBar";
import { searchUsers } from "@/api/userApi";
import SearchList from "./SideBar/Search/SearchList";
import { useChatStore } from "@/store/useChatStore";

export default function SidebarContent({
  mode,
  setMode,
  chats,
}: {
  mode: string;
  setMode: React.Dispatch<
    React.SetStateAction<"chats" | "settings" | "profile" | "search">
  >;
  chats: ChatUser[];
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<ChatUser[]>([]);
  const setSelectedChat = useChatStore((state) => state.setSelectedChat);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await searchUsers(searchQuery);
        setSearchResults(data);
      } catch (e) {
        console.log(e);
      }
    };

    if (searchQuery.trim()) {
      fetch();
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const components: Record<string, JSX.Element> = {
    chats: <ChatList chats={chats} />,
    settings: <Settings setMode={setMode} />,
    profile: <Profile setMode={setMode} />,
    search: (
      <SearchList chats={searchResults} setSelectedChat={setSelectedChat} />
    ),
  };

  return (
    <div className="h-full flex flex-col gap-2 bg-white dark:bg-[#212121] z-10">
      <div className="p-4 font-semibold text-lg">
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
      <div className="flex-1 overflow-y-auto">{components[mode]}</div>
    </div>
  );
}
