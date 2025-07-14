import type { Message } from "@/types/message";
import {
  format,
  isToday,
  isYesterday,
  parseISO,
  formatDistanceToNow,
  differenceInMinutes,
} from "date-fns";
import { format as formatTZ, toZonedTime } from "date-fns-tz";

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

export function formatLastSeen(lastSeen: string | undefined): string {
  if (!lastSeen) return "last seen recently";

  lastSeen = formatToUserLocalTime(lastSeen);

  const date = parseISO(lastSeen);
  const minutesAgo = differenceInMinutes(new Date(), date);

  if (minutesAgo < 1) {
    return "last seen just now";
  } else if (minutesAgo < 60) {
    return `last seen ${formatDistanceToNow(date)} ago`;
  } else if (isToday(date)) {
    return `last seen today at ${format(date, "HH:mm")}`;
  } else if (isYesterday(date)) {
    return `last seen yesterday at ${format(date, "HH:mm")}`;
  } else {
    return `last seen on ${format(date, "d MMM yyyy 'at' HH:mm")}`;
  }
}

export const formatToUserLocalTime = (isoTimestamp: string) => {
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const zonedDate = toZonedTime(isoTimestamp, userTimeZone);

  return formatTZ(zonedDate, "h:mm a", { timeZone: userTimeZone });
};
