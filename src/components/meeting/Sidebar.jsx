import { useCallback, useEffect, useRef, useState } from "react";
import { Smile } from "lucide-react";
import IconButton from "@components/ui/IconButton";
import FeedbackModal from "./FeedbackModal";
import { RAIL_ITEMS } from "@data/panels";
import { cn, isTypingTarget } from "@lib/utils";

const Sidebar = ({ active, onSelect }) => {
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const activeRef = useRef(active);
  const closeFeedback = useCallback(() => setIsFeedbackOpen(false), []);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (isTypingTarget(e.target)) return;

      const key = e.key.toUpperCase();
      const matched = RAIL_ITEMS.find((item) => item.shortcut === key);
      if (matched) {
        e.preventDefault();
        onSelect(activeRef.current === matched.key ? null : matched.key);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onSelect]);

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
      {isFeedbackOpen && <FeedbackModal onClose={closeFeedback} />}
    </>
  );
};

export default Sidebar;
