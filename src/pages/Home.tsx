import SidebarContent from "@/components/Main/SidebarContent";
import ChatWindow from "@/components/Main/ChatWindow";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useState } from "react";
import { useChatStore } from "@/store/useChatStore";

const Home = () => {
  const selectedChat = useChatStore((state) => state.selectedChat);

  const [sidebarMode, setSidebarMode] = useState<
    "chats" | "profile" | "settings" | "search"
  >("chats");

  return (
    <>
      <div className="[height:calc(var(--vh)_*_100)] w-full hidden md:flex flex-row overflow-hidden chat-bg">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel
            defaultSize={25}
            minSize={20}
            maxSize={30}
            className="border-r bg-white dark:bg-[#212121] z-10"
          >
            <SidebarContent mode={sidebarMode} setMode={setSidebarMode} />
          </ResizablePanel>

          <ResizableHandle className="bg-border" />

          <ResizablePanel>
            <div
              className={` flex-1 ${
                !selectedChat ? "hidden md:flex" : "flex"
              } flex-col`}
            >
              <ChatWindow setSidebarMode={setSidebarMode} />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
      <div className="chat-bg [height:calc(var(--vh)_*_100)] w-full flex flex-col md:hidden">
        {!selectedChat ? (
          <SidebarContent mode={sidebarMode} setMode={setSidebarMode} />
        ) : (
          <ChatWindow setSidebarMode={setSidebarMode} />
        )}
      </div>
    </>
  );
};

export default Home;
