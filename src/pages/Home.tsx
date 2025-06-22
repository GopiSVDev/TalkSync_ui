import ChatList from "@/components/Chat/ChatList";
import ChatWindow from "@/components/Chat/ChatWindow";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import type { ChatPreview } from "@/types/chat";
import { useState } from "react";

const mockChats: ChatPreview[] = [
  {
    id: "1",
    name: "Alice",
    lastMessage: "Hey, how are you?",
    avatarUrl: "",
    time: "10:24 AM",
  },
  {
    id: "2",
    name: "Bob",
    lastMessage: "Got the file, thanks!",
    avatarUrl: "",
    time: "9:15 AM",
  },
  {
    id: "3",
    name: "Charlie",
    lastMessage: "Let's catch up tomorrow.",
    avatarUrl: "",
    time: "Yesterday",
  },
];

const Home = () => {
  const [selectedChat, setSelectedChat] = useState<ChatPreview | null>(null);

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
            <ChatList
              chats={mockChats}
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
          <ChatList
            chats={mockChats}
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
