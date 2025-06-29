import type { ChatUser } from "@/types/chat";
import ChatCard from "./ChatCard";

const ChatList = ({ chats }: { chats: ChatUser[] }) => {
  return (
    <>
      {chats.length > 0 ? (
        chats.map((chat) => <ChatCard key={chat.id} chat={chat} />)
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
