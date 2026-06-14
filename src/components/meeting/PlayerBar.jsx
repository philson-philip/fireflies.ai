import { Play, Pause, RotateCcw, RotateCw, Download, Star, ListChecks, ThumbsUp, ThumbsDown } from "lucide-react";
import IconButton from "../ui/IconButton";
import { formatClock } from "../../lib/utils";
import { meeting } from "../../data/meeting";

export default function PlayerBar({ playing, onTogglePlay, currentSeconds, onScrub }) {
  const total = meeting.durationSeconds;
  const pct = Math.min(100, (currentSeconds / total) * 100);

  return (
    <footer className="relative z-30 flex h-16 shrink-0 items-center gap-3 border-t border-line bg-surface px-3 sm:px-5">
      <span className="hidden w-28 shrink-0 text-caption tabular-nums text-ink-muted sm:block">
        {formatClock(currentSeconds)} / {meeting.duration}
      </span>

      <div className="flex flex-1 items-center justify-center gap-1 sm:gap-2">
        <span className="mr-1 hidden text-caption font-medium text-ink-muted sm:inline">1×</span>
        <IconButton label="Back 15s" onClick={() => onScrub(Math.max(0, currentSeconds - 15))}>
          <RotateCcw size={17} aria-hidden />
        </IconButton>
        <button
          type="button"
          aria-label={playing ? "Pause" : "Play"}
          onClick={onTogglePlay}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-brand text-ink-inverse shadow-subtle transition-colors hover:bg-brand-hover active:bg-brand-active"
        >
          {playing ? <Pause size={20} aria-hidden /> : <Play size={20} aria-hidden className="ml-0.5" />}
        </button>
        <IconButton label="Forward 15s" onClick={() => onScrub(Math.min(total, currentSeconds + 15))}>
          <RotateCw size={17} aria-hidden />
        </IconButton>
        <IconButton label="Download" className="hidden sm:inline-flex">
          <Download size={17} aria-hidden />
        </IconButton>
      </div>

      <div className="flex shrink-0 items-center gap-0.5">
        <IconButton label="Star meeting"><Star size={16} aria-hidden /></IconButton>
        <IconButton label="Action items" className="hidden sm:inline-flex"><ListChecks size={16} aria-hidden /></IconButton>
        <IconButton label="Good summary" className="hidden sm:inline-flex"><ThumbsUp size={16} aria-hidden /></IconButton>
        <IconButton label="Needs work" className="hidden sm:inline-flex"><ThumbsDown size={16} aria-hidden /></IconButton>
      </div>

      {/* progress sits on the top border of the bar */}
      <div className="absolute inset-x-0 -top-px h-0.5 bg-line">
        <div className="h-full bg-brand transition-[width] duration-150" style={{ width: `${pct}%` }} />
      </div>
    </footer>
  );
}
