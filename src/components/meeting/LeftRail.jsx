import { Search, BookOpen, AudioLines, MessageSquare, Bookmark } from "lucide-react";
import IconButton from "../ui/IconButton";
import { cn } from "../../lib/utils";

export const RAIL_ITEMS = [
  { key: "search", label: "Smart search", icon: Search },
  { key: "notes", label: "Notes & index", icon: BookOpen },
  { key: "soundbites", label: "Soundbites", icon: AudioLines },
  { key: "comments", label: "Comments", icon: MessageSquare },
  { key: "bookmarks", label: "Bookmarks", icon: Bookmark },
];

// Real <nav> with real buttons => keyboard operable. Clicking an active item
// toggles the panel closed, so the rail never shifts the layout on its own.
export default function LeftRail({ active, onSelect }) {
  return (
    <nav
      aria-label="Meeting panels"
      className="flex w-14 shrink-0 flex-col items-center gap-1 border-r border-line bg-surface py-2"
    >
      {RAIL_ITEMS.map(({ key, label, icon: Icon }) => (
        <IconButton
          key={key}
          label={label}
          side="right"
          active={active === key}
          aria-current={active === key ? "true" : undefined}
          onClick={() => onSelect(active === key ? null : key)}
        >
          <Icon size={19} aria-hidden className={cn(active === key && "text-brand")} />
        </IconButton>
      ))}
    </nav>
  );
}
