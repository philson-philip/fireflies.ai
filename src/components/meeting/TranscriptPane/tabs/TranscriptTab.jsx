import { useMemo, useState } from "react";
import { Search, X, Link2 } from "lucide-react";
import Avatar from "@components/ui/Avatar";
import Input from "@components/ui/Input";
import IconButton from "@components/ui/IconButton";
import Typography from "@components/ui/Typography";
import { cn, toSeconds, escapeRegExp } from "@lib/utils";
import { transcript, getParticipantImage } from "@data/meeting";

const withMatches = (text, query) => {
  if (!query) return text;
  const normalized = query.toLowerCase();
  const parts = text.split(new RegExp(`(${escapeRegExp(query)})`, "ig"));
  return parts.map((p, i) =>
    p.toLowerCase() === normalized ? (
      <mark key={i} className="rounded bg-warning-soft px-0.5 text-ink">
        {p}
      </mark>
    ) : (
      <span key={i}>{p}</span>
    )
  );
};

const TranscriptTab = ({ currentSeconds, onSeek }) => {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);

  const activeId = useMemo(() => {
    if (currentSeconds == null) return null;
    let id = null;
    for (const t of transcript) {
      if (toSeconds(t.at) <= currentSeconds) id = t.id;
      else break;
    }
    return id;
  }, [currentSeconds]);

  const speakerImages = useMemo(() => {
    const map = {};
    for (const line of transcript) {
      if (!map[line.speaker]) {
        map[line.speaker] = getParticipantImage(line.speaker);
      }
    }
    return map;
  }, []);

  const renderedTranscript = useMemo(() => {
    const trimmed = query.trim();
    return transcript.map((line) => ({
      ...line,
      content: trimmed ? withMatches(line.text, trimmed) : line.text,
    }));
  }, [query]);

  return (
    <>
      <div className="shrink-0 px-4 pb-3 pt-3">
        <Input
          leadingIcon={Search}
          placeholder="Find or Replace"
          aria-label="Find or Replace"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          trailingAction={
            focused || query ? (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="flex h-6 w-6 items-center justify-center rounded text-ink-muted transition-colors hover:text-ink"
                aria-label="Clear search"
              >
                <X size={16} aria-hidden />
              </button>
            ) : null
          }
        />
      </div>
      <div className="scroll-thin flex-1 overflow-y-auto px-4 pb-6 pt-2">
        {renderedTranscript.map((line) => {
          const active = line.id === activeId;
          return (
            <div
              key={line.id}
              aria-current={active ? "true" : undefined}
              className="group/chat mb-3 flex gap-2.5 rounded-md p-2 -mx-2 transition-colors hover:bg-surface-subtle"
            >
              <Avatar name={line.speaker} imageUrl={speakerImages[line.speaker]} size="xs" className="shrink-0 mt-0.5" />
              <div className="min-w-0 flex-1">
                <div className="mb-1 flex items-center gap-2">
                  <Typography as="span" variant="body-sm" tone="text-ink" className="font-semibold">
                    {line.speaker}
                  </Typography>
                  <span className="text-caption text-ink-muted">·</span>
                  <button
                    type="button"
                    onClick={() => onSeek?.(toSeconds(line.at))}
                    className={cn(
                      "text-body-sm tabular-nums transition-colors",
                      active ? "text-brand-active" : "text-info hover:underline"
                    )}
                  >
                    {line.at}
                  </button>
                  <IconButton
                    label="Copy link"
                    size="sm"
                    className="opacity-0 group-hover/chat:opacity-100 focus-visible:opacity-100 transition-opacity h-6 w-6"
                  >
                    <Link2 size={14} aria-hidden />
                  </IconButton>
                </div>
                <Typography
                  as="p"
                  variant="body"
                  className="min-w-0 transition-colors"
                  tone={active ? "text-brand-active" : undefined}
                >
                  {line.content}
                </Typography>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default TranscriptTab;
