import type { Message } from "@/types/message";
import { format, isToday, isYesterday, parseISO } from "date-fns";

export function groupMessagesByDate(messages: Message[]) {
  const grouped: Record<string, Message[]> = {};

  messages.forEach((msg) => {
    const date = parseISO(msg.createdAt);

    let key;
    if (isToday(date)) key = "Today";
    else if (isYesterday(date)) key = "Yesterday";
    else key = format(date, "MMMM d, yyyy");

    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(msg);
  });

  return grouped;
}
