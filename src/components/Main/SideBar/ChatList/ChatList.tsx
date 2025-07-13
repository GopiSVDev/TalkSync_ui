import ChatCard from "./ChatCard";
import { useEffect } from "react";
import { useChatStore } from "@/store/useChatStore";

const ChatList = () => {
  const chats = useChatStore((state) => state.chats);
  const fetchChats = useChatStore((state) => state.fetchChats);

  useEffect(() => {
    if (document.visibilityState === "visible") {
      fetchChats();
    }
  }, [fetchChats]);

  return (
    <>
      {chats.length > 0 ? (
        chats.map((chat) => <ChatCard key={chat.chatId} chat={chat} />)
      ) : (
        <div className="w-full flex flex-col items-center px-4 pt-10">
          <h1 className="text-2xl font-medium">No Chats Yet</h1>
          <h3 className="text-center">
            Use the search bar above to find people and start chatting.
          </h3>
        </div>
      )}
    </>
  );
};

export default ChatList;
