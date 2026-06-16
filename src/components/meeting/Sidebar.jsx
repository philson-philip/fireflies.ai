import { useState, useEffect } from "react";
import { Search, BookOpen, AudioLines, MessageSquare, Bookmark, Smile } from "lucide-react";
import IconButton from "@components/ui/IconButton";
import FeedbackModal from "./FeedbackModal";
import { cn } from "@lib/utils";

export const RAIL_ITEMS = [
  { key: "search", label: "Smart search", icon: Search, shortcut: "F" },
  { key: "notes", label: "Index", icon: BookOpen, shortcut: "I" },
  { key: "soundbites", label: "Soundbites", icon: AudioLines, shortcut: "S" },
  { key: "comments", label: "Comments", icon: MessageSquare, shortcut: "C" },
  { key: "bookmarks", label: "Bookmarks", icon: Bookmark, shortcut: "B" },
];

const Sidebar = ({ active, onSelect }) => {
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  useEffect(() => {
    const handleKeyDown = (e) => {
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
    <>
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

      <div className="mt-auto">
        <IconButton
          label="Leave feedback"
          side="right"
          size="md"
          onClick={() => setIsFeedbackOpen(true)}
        >
          <Smile size={24} aria-hidden strokeWidth={1.5} />
        </IconButton>
      </div>
    </nav>
    <FeedbackModal isOpen={isFeedbackOpen} onClose={() => setIsFeedbackOpen(false)} />
    </>
  );
};

export default Sidebar;
