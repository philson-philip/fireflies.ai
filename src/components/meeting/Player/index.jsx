import { useState } from "react";
import { Play, Pause, RotateCcw, RotateCw, Star, CheckSquare, ThumbsUp, ThumbsDown, MoreHorizontal } from "lucide-react";
import IconButton from "@components/ui/IconButton";
import Tooltip from "@components/ui/Tooltip";
import ProgressBar from "./ProgressBar";
import { formatClock, clamp } from "@lib/utils";
import { meeting } from "@data/meeting";

const MARKER_TYPES = [
  { type: "important", label: "Important", shortcut: "1", icon: Star },
  { type: "action", label: "Action", shortcut: "2", icon: CheckSquare },
  { type: "like", label: "Like", shortcut: "3", icon: ThumbsUp },
  { type: "dislike", label: "Dislike", shortcut: "4", icon: ThumbsDown },
];

const PlayerBar = ({ playing, onTogglePlay, currentSeconds, onScrub, markers, onAddMarker, onDeleteMarker }) => {
  const total = meeting.durationSeconds;
  const [isFooterHovered, setIsFooterHovered] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <footer
      className="relative z-30 flex h-16 shrink-0 items-center gap-3 bg-surface px-3 sm:px-5"
      onMouseEnter={() => setIsFooterHovered(true)}
      onMouseLeave={() => setIsFooterHovered(false)}
    >
      <div className="flex flex-1 sm:flex-none sm:w-32 shrink-0 items-center text-caption tabular-nums">
        <span className="text-ink font-medium">{formatClock(currentSeconds)}</span>
        <span className="text-ink-muted font-medium hidden sm:inline">&nbsp;/ {meeting.duration}</span>
      </div>

      <div className="flex shrink-0 sm:flex-1 items-center justify-center gap-1 sm:gap-2">
        <span className="mr-1 hidden text-caption font-medium text-ink-muted sm:inline">1×</span>
        <IconButton label="Skip 5 seconds backward" shortcut="←" onClick={() => onScrub(clamp(currentSeconds - 5, 0, total))}>
          <RotateCcw size={17} aria-hidden />
        </IconButton>
        <Tooltip label={playing ? "Pause" : "Play"} shortcut="Space">
          <button
            type="button"
            aria-label={playing ? "Pause" : "Play"}
            onClick={onTogglePlay}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-brand text-ink-inverse shadow-subtle transition-colors hover:bg-brand-hover active:bg-brand-active focus-visible:rounded-full"
          >
            {playing ? <Pause size={20} aria-hidden /> : <Play size={20} aria-hidden className="ml-0.5" />}
          </button>
        </Tooltip>
        <IconButton label="Skip 5 seconds forward" shortcut="→" onClick={() => onScrub(clamp(currentSeconds + 5, 0, total))}>
          <RotateCw size={17} aria-hidden />
        </IconButton>
      </div>

      <div className="flex flex-1 sm:flex-none shrink-0 items-center justify-end gap-0.5 relative">
        {MARKER_TYPES.map(({ type, label, shortcut, icon: Icon }) => (
          <IconButton
            key={type}
            label={label}
            shortcut={shortcut}
            side="left"
            className="hidden sm:inline-flex"
            onClick={() => onAddMarker(type)}
          >
            <Icon size={16} aria-hidden />
          </IconButton>
        ))}

        {/* Mobile Dropdown Menu */}
        <div className="relative sm:hidden">
          <IconButton label="More Actions" onClick={() => setShowMobileMenu(!showMobileMenu)}>
            <MoreHorizontal size={16} aria-hidden />
          </IconButton>

          {showMobileMenu && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowMobileMenu(false)} />
              <div className="absolute bottom-full right-0 mb-2 w-40 rounded-md bg-surface border border-line shadow-lifted z-50 flex flex-col py-1 animate-in fade-in zoom-in-95 duration-100">
                {MARKER_TYPES.map(({ type, label, icon: Icon }) => (
                  <button
                    key={type}
                    className="flex items-center gap-3 px-3 py-2 text-sm text-ink hover:bg-surface-subtle transition-colors"
                    onClick={() => { onAddMarker(type); setShowMobileMenu(false); }}
                  >
                    <Icon size={16} className="text-ink-muted" /> {label}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <ProgressBar
        currentSeconds={currentSeconds}
        totalSeconds={total}
        onScrub={onScrub}
        markers={markers}
        onDeleteMarker={onDeleteMarker}
        isFooterHovered={isFooterHovered}
      />
    </footer>
  );
};

export default PlayerBar;
