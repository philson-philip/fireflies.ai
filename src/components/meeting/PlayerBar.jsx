import { Play, Pause, RotateCcw, RotateCw, Star, ListChecks, ThumbsUp, ThumbsDown } from "lucide-react";
import IconButton from "../ui/IconButton";
import Tooltip from "../ui/Tooltip";
import ProgressBar from "./ProgressBar";
import { formatClock } from "../../lib/utils";
import { meeting } from "../../data/meeting";

const PlayerBar = ({ playing, onTogglePlay, currentSeconds, onScrub }) => {
  const total = meeting.durationSeconds;

  return (
    <footer className="relative z-30 flex h-16 shrink-0 items-center gap-3 bg-surface px-3 sm:px-5">
      <span className="hidden w-32 shrink-0 text-caption tabular-nums sm:block">
        <span className="text-ink font-medium">{formatClock(currentSeconds)}</span>
        <span className="text-ink-muted font-medium"> / {meeting.duration}</span>
      </span>

      <div className="flex flex-1 items-center justify-center gap-1 sm:gap-2">
        <span className="mr-1 hidden text-caption font-medium text-ink-muted sm:inline">1×</span>
        <IconButton label="Skip 5 seconds backward" shortcut="←" onClick={() => onScrub(Math.max(0, currentSeconds - 5))}>
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
        <IconButton label="Skip 5 seconds forward" shortcut="→" onClick={() => onScrub(Math.min(total, currentSeconds + 5))}>
          <RotateCw size={17} aria-hidden />
        </IconButton>
      </div>

      <div className="flex shrink-0 items-center gap-0.5">
        <IconButton label="Important" shortcut="1" side="left"><Star size={16} aria-hidden /></IconButton>
        <IconButton label="Action" shortcut="2" side="left" className="hidden sm:inline-flex"><ListChecks size={16} aria-hidden /></IconButton>
        <IconButton label="Like" shortcut="3" side="left" className="hidden sm:inline-flex"><ThumbsUp size={16} aria-hidden /></IconButton>
        <IconButton label="Dislike" shortcut="4" side="left" className="hidden sm:inline-flex"><ThumbsDown size={16} aria-hidden /></IconButton>
      </div>

      <ProgressBar currentSeconds={currentSeconds} totalSeconds={total} onScrub={onScrub} />
    </footer>
  );
};

export default PlayerBar;
