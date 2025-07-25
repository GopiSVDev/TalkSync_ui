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
    if (!msg.createdAt) return;

    let date: Date;
    try {
      date = parseISO(msg.createdAt);
      if (isNaN(date.getTime())) return;
    } catch {
      return;
    }

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

  const utcDate = parseISO(lastSeen);
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const localDate = toZonedTime(utcDate, userTimeZone);

  const minutesAgo = differenceInMinutes(new Date(), localDate);

  if (minutesAgo < 1) {
    return "last seen just now";
  } else if (minutesAgo < 60) {
    return `last seen ${formatDistanceToNow(localDate)} ago`;
  } else if (isToday(localDate)) {
    return `last seen today at ${format(localDate, "HH:mm")}`;
  } else if (isYesterday(localDate)) {
    return `last seen yesterday at ${format(localDate, "HH:mm")}`;
  } else {
    return `last seen on ${format(localDate, "d MMM yyyy 'at' HH:mm")}`;
  }
}

export const formatToUserLocalTime = (isoTimestamp: string) => {
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const date = new Date(isoTimestamp);
  const zonedDate = toZonedTime(date, userTimeZone);

  return formatTZ(zonedDate, "h:mm a", { timeZone: userTimeZone });
};
