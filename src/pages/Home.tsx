import SidebarContent from "@/components/Main/SidebarContent";
import ChatWindow from "@/components/Main/ChatWindow";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import type { ChatUser } from "@/types/chat";
import { useState } from "react";
import { useChatStore } from "@/store/useChatStore";

// const mockChats: ChatUser[] = [
//   {
//     id: "1",
//     displayName: "Alice",
//     username: "alice",
//     lastMessage: "Hey, how are you?",
//     avatarUrl:
//       "https://cdn.pixabay.com/photo/2021/02/25/19/20/wojak-6049880_1280.png",
//     time: "10:24 AM",
//   },
//   {
//     id: "2",
//     displayName: "Bob",
//     username: "bob",
//     lastMessage: "Got the file, thanks!",
//     avatarUrl: "",
//     time: "9:15 AM",
//   },
//   {
//     id: "3",
//     displayName: "Charlie",
//     username: "charlie",
//     lastMessage: "Let's catch up tomorrow.",
//     avatarUrl: "",
//     time: "Yesterday",
//   },
// ];

const Home = () => {
  const [chats, setChats] = useState<ChatUser[]>([]);
  const selectedChat = useChatStore((state) => state.selectedChat);

  const [sidebarMode, setSidebarMode] = useState<
    "chats" | "profile" | "settings" | "search"
  >("chats");

  return (
    <>
      <div className="h-screen w-full hidden md:flex flex-row overflow-hidden chat-bg">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel
            defaultSize={25}
            minSize={20}
            maxSize={30}
            className="border-r bg-white dark:bg-[#212121] z-10"
          >
            <SidebarContent
              mode={sidebarMode}
              setMode={setSidebarMode}
              chats={chats}
            />
          </ResizablePanel>

          <ResizableHandle className="bg-border" />

          <ResizablePanel>
            <div
              className={` flex-1 ${
                !selectedChat ? "hidden md:flex" : "flex"
              } flex-col`}
            >
              <ChatWindow chat={selectedChat} />
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
          />
        ) : (
          <ChatWindow chat={selectedChat} />
        )}
      </div>
    </>
  );
};

export default Home;
