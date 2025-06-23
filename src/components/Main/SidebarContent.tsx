import { DropDownMenu } from "./SideBar/DropDownMenu";
import ChatList from "./SideBar/ChatList/ChatList";
import type { ChatPreview } from "@/types/chat";
import Settings from "./SideBar/Settings";
import Profile from "./SideBar/Profile";
import type { JSX } from "react";
import { ArrowLeft } from "lucide-react";

export default function SidebarContent({
  mode,
  setMode,
  chats,
  onSelect,
  selectedChat,
}: {
  mode: string;
  setMode: React.Dispatch<
    React.SetStateAction<"chats" | "settings" | "profile">
  >;
  chats: ChatPreview[];
  onSelect: (chat: ChatPreview) => void;
  selectedChat: ChatPreview | null;
}) {
  const components: Record<string, JSX.Element> = {
    chats: (
      <ChatList chats={chats} onSelect={onSelect} selectedChat={selectedChat} />
    ),
    settings: <Settings />,
    profile: <Profile setMode={setMode} />,
  };

  return (
    <div className="h-full flex flex-col gap-2 bg-white dark:bg-[#212121] z-10">
      <div className="p-4 font-semibold text-lg">
        {mode === "chats" ? (
          <DropDownMenu setMode={setMode} />
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
