import type { Chat } from "@/types/Chat";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";

interface ChatWindowProps {
  chat: Chat | null;
  onBack: () => void;
}

export default function ChatWindow({ chat, onBack }: ChatWindowProps) {
  if (!chat) return null;

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="md:hidden"
        >
          <ArrowLeft />
        </Button>
        <div className="text-lg font-semibold">{chat.name}</div>
      </div>

      <div className="flex-1 p-4 overflow-y-auto text-muted-foreground">
        <p>
          This is a chat with <strong>{chat.name}</strong>.
        </p>
        <p className="mt-2 italic">[Message list will go here]</p>
      </div>

      <div className="p-4 border-t">
        <Input placeholder="Type a message..." />
      </div>
    </div>
  );
}
