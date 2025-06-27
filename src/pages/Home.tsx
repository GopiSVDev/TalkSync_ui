import SidebarContent from "@/components/Main/SidebarContent";
import ChatWindow from "@/components/Main/ChatWindow";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import type { ChatListType } from "@/types/chat";
import { useState } from "react";

const mockChats: ChatListType[] = [
  {
    id: "1",
    displayName: "Alice",
    username: "alice",
    lastMessage: "Hey, how are you?",
    avatarUrl: "",
    time: "10:24 AM",
  },
  {
    id: "2",
    displayName: "Bob",
    username: "bob",
    lastMessage: "Got the file, thanks!",
    avatarUrl: "",
    time: "9:15 AM",
  },
  {
    id: "3",
    displayName: "Charlie",
    username: "charlie",
    lastMessage: "Let's catch up tomorrow.",
    avatarUrl: "",
    time: "Yesterday",
  },
];

const Home = () => {
  const [chats, setChats] = useState<ChatListType[]>(mockChats);

  const [selectedChat, setSelectedChat] = useState<ChatListType | null>(null);

  const [sidebarMode, setSidebarMode] = useState<
    "chats" | "profile" | "settings" | "search"
  >("chats");

  return (
    <>
      <div className="h-screen w-full hidden md:flex flex-row overflow-hidden chat-bg">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel
            defaultSize={30}
            minSize={20}
            maxSize={30}
            className="border-r bg-white dark:bg-[#212121] z-10"
          >
            {/* Side bar contents */}
            <SidebarContent
              mode={sidebarMode}
              setMode={setSidebarMode}
              chats={chats}
              onSelect={setSelectedChat}
              selectedChat={selectedChat}
            />
          </ResizablePanel>

          <ResizableHandle className="bg-border" />

          <ResizablePanel>
            <div
              className={` flex-1 ${
                !selectedChat ? "hidden md:flex" : "flex"
              } flex-col`}
            >
              <ChatWindow
                chat={selectedChat}
                onBack={() => setSelectedChat(null)}
              />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
      <div className="chat-bg h-screen w-full flex flex-col md:hidden">
        {!selectedChat ? (
          <SidebarContent
            mode={sidebarMode}
            setMode={setSidebarMode}
            chats={chats}
            onSelect={setSelectedChat}
            selectedChat={selectedChat}
          />
        ) : (
          <ChatWindow
            chat={selectedChat}
            onBack={() => setSelectedChat(null)}
          />
        )}
      </div>
    </>
  );
};

export default Home;
