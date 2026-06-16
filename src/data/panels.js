import { Search, BookOpen, AudioLines, MessageSquare, Bookmark } from "lucide-react";

export const RAIL_ITEMS = [
  { key: "search", label: "Smart search", icon: Search, shortcut: "F" },
  { key: "notes", label: "Index", icon: BookOpen, shortcut: "I" },
  { key: "soundbites", label: "Soundbites", icon: AudioLines, shortcut: "S" },
  { key: "comments", label: "Comments", icon: MessageSquare, shortcut: "C" },
  { key: "bookmarks", label: "Bookmarks", icon: Bookmark, shortcut: "B" },
];
