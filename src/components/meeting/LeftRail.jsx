import { useEffect } from "react";
import { Search, BookOpen, AudioLines, MessageSquare, Bookmark } from "lucide-react";
import IconButton from "../ui/IconButton";
import { cn } from "../../lib/utils";

export const RAIL_ITEMS = [
  { key: "search", label: "Smart search", icon: Search, shortcut: "F" },
  { key: "notes", label: "Index", icon: BookOpen, shortcut: "I" },
  { key: "soundbites", label: "Soundbites", icon: AudioLines, shortcut: "S" },
  { key: "comments", label: "Comments", icon: MessageSquare, shortcut: "C" },
  { key: "bookmarks", label: "Bookmarks", icon: Bookmark, shortcut: "B" },
];

// Real <nav> with real buttons => keyboard operable. Clicking an active item
// toggles the panel closed, so the rail never shifts the layout on its own.
export default function LeftRail({ active, onSelect }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Do not trigger shortcuts if the user is typing in an input
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA" || e.target.isContentEditable) {
        return;
      }

      const key = e.key.toUpperCase();
      const matched = RAIL_ITEMS.find((item) => item.shortcut === key);
      if (matched) {
        onSelect(active === matched.key ? null : matched.key);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [active, onSelect]);

  return (
    <nav
      aria-label="Meeting panels"
      className="flex w-14 shrink-0 flex-col items-center gap-3 border-r border-line bg-surface py-2"
    >
      {RAIL_ITEMS.map(({ key, label, icon: Icon, shortcut }) => (
        <IconButton
          key={key}
          label={label}
          shortcut={shortcut}
          side="right"
          size="md"
          active={active === key}
          aria-current={active === key ? "true" : undefined}
          onClick={() => onSelect(active === key ? null : key)}
        >
          <Icon size={24} aria-hidden strokeWidth={1.5} className={cn(active === key && "text-brand")} />
        </IconButton>
      ))}
    </nav>
  );
}
