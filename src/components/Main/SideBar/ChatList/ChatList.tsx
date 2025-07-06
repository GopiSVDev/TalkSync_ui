import ChatCard from "./ChatCard";
import { useEffect, useState } from "react";
import { getUserChats } from "@/api/chatApi";
import type { ChatDetail } from "@/types/chat";

const ChatList = () => {
  const [chats, setChats] = useState<ChatDetail[]>([]);

  useEffect(() => {
    const getChats = async () => {
      try {
        const chats = await getUserChats();
        setChats(chats);
      } catch (e) {
        console.log(e);
      }
    };

    getChats();
  }, []);

  return (
    <>
      {chats.length > 0 ? (
        chats.map((chat) => <ChatCard key={chat.chatId} chat={chat} />)
      ) : (
        <div className="w-full h-full flex flex-col items-center px-4 pt-10">
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
