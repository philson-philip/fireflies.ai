import { useMemo, useState } from "react";
import { Search, Maximize2, Copy, Sparkles, Send, ChevronRight } from "lucide-react";
import Avatar from "../ui/Avatar";
import Card from "../ui/Card";
import IconButton from "../ui/IconButton";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { cn, toSeconds } from "../../lib/utils";
import { transcript } from "../../data/meeting";

const TABS = [
  { key: "transcript", label: "Transcript" },
  { key: "askfred", label: "AskFred" },
  { key: "skills", label: "AI Skills" },
];

// Group consecutive turns by the same speaker so the header isn't repeated.
function groupTurns(turns) {
  const groups = [];
  for (const t of turns) {
    const last = groups[groups.length - 1];
    if (last && last.speaker === t.speaker) last.lines.push(t);
    else groups.push({ speaker: t.speaker, lines: [t] });
  }
  return groups;
}

// Highlight query matches without dangerouslySetInnerHTML.
function withMatches(text, query) {
  if (!query) return text;
  const parts = text.split(new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "ig"));
  return parts.map((p, i) =>
    p.toLowerCase() === query.toLowerCase() ? (
      <mark key={i} className="rounded bg-warning-soft px-0.5 text-ink">
        {p}
      </mark>
    ) : (
      <span key={i}>{p}</span>
    )
  );
}

function TranscriptTab({ currentSeconds, onSeek }) {
  const [query, setQuery] = useState("");
  const groups = useMemo(() => groupTurns(transcript), []);

  // The active line is the last line whose timestamp is at or before the
  // playhead — exactly one line, the one being spoken now.
  const activeId = useMemo(() => {
    if (currentSeconds == null) return null;
    let id = null;
    for (const t of transcript) {
      if (toSeconds(t.at) <= currentSeconds) id = t.id;
      else break;
    }
    return id;
  }, [currentSeconds]);

  return (
    <>
      <div className="shrink-0 px-4 pb-3 pt-3">
        <Input
          leadingIcon={Search}
          placeholder="Find in transcript"
          aria-label="Find in transcript"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <div className="scroll-thin flex-1 overflow-y-auto px-4 pb-6">
        {groups.map((group, gi) => (
          <div key={gi} className="mb-5">
            <div className="mb-1.5 flex items-center gap-2">
              <Avatar name={group.speaker} size="sm" />
              <span className="text-body-sm font-semibold text-ink">{group.speaker}</span>
            </div>
            {/* min-w-0 + normal wrapping = text never clips, and re-justifies
                automatically when the pane is resized. */}
            <div className="ml-9 flex min-w-0 flex-col gap-1.5">
              {group.lines.map((line) => {
                const active = line.id === activeId;
                return (
                  <div
                    key={line.id}
                    className={cn(
                      "group/line -ml-3 flex gap-2.5 rounded-md py-1 pl-3 pr-2 transition-colors",
                      active ? "bg-playing" : "hover:bg-surface-subtle"
                    )}
                  >
                    <button
                      type="button"
                      onClick={() => onSeek?.(toSeconds(line.at))}
                      className={cn(
                        "shrink-0 pt-0.5 text-caption font-medium tabular-nums",
                        active ? "text-brand" : "text-ink-muted hover:text-brand"
                      )}
                    >
                      {line.at}
                    </button>
                    <p className="min-w-0 text-body text-ink-secondary">
                      {withMatches(line.text, query)}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function AskFredTab() {
  const suggestions = [
    "How does Philson approach the designer-engineer bridge?",
    "What did he build at BigBinary, and what was the impact?",
    "How does he use AI tools in his workflow?",
  ];
  return (
    <div className="flex flex-1 flex-col overflow-hidden px-4 pb-4 pt-3">
      <div className="scroll-thin flex-1 overflow-y-auto">
        <div className="mb-5 flex items-center gap-2">
          <Sparkles size={18} className="text-brand" aria-hidden />
          <p className="text-h4 font-medium text-ink">Ask anything about this meeting</p>
        </div>
        <div className="flex flex-col gap-2">
          {suggestions.map((s) => (
            <Card key={s} interactive className="flex items-center justify-between gap-2 p-3">
              <span className="text-body-sm text-ink-secondary">{s}</span>
              <ChevronRight size={15} className="shrink-0 text-ink-muted" aria-hidden />
            </Card>
          ))}
        </div>
      </div>
      <div className="mt-3 flex items-center gap-2">
        <Input placeholder="Ask anything…" aria-label="Ask Fred a question" className="flex-1" />
        <Button aria-label="Send" className="h-10 w-10 p-0">
          <Send size={16} aria-hidden />
        </Button>
      </div>
    </div>
  );
}

function SkillsTab() {
  const skills = [
    { label: "Candidate scorecard", tone: "brand" },
    { label: "Interview questions", tone: "info" },
    { label: "Candidate insights", tone: "success" },
    { label: "Interview screening", tone: "info" },
    { label: "Behavioral questions", tone: "brand" },
    { label: "Sales call", tone: "success" },
  ];
  return (
    <div className="scroll-thin flex-1 overflow-y-auto p-4">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-body-sm font-medium text-ink-secondary">Extract insights from this meeting</p>
        <span className="text-caption text-ink-muted">Uses AI credits</span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {skills.map((s) => (
          <Card key={s.label} interactive className="flex items-center gap-2.5 p-3">
            <span
              className={cn(
                "flex h-7 w-7 shrink-0 items-center justify-center rounded-md",
                s.tone === "brand" && "bg-brand-soft text-brand",
                s.tone === "info" && "bg-info-soft text-info",
                s.tone === "success" && "bg-success-soft text-success"
              )}
            >
              <Sparkles size={15} aria-hidden />
            </span>
            <span className="text-body-sm font-medium text-ink">{s.label}</span>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default function TranscriptPane({ currentSeconds, onSeek, onExpand }) {
  const [tab, setTab] = useState("transcript");

  return (
    <section
      aria-label="Transcript and AI tools"
      className="flex h-full min-w-0 flex-1 flex-col border-l border-line bg-surface"
    >
      <div className="flex h-14 shrink-0 items-center justify-between gap-2 border-b border-line pl-2 pr-3">
        <div role="tablist" aria-label="Transcript views" className="flex items-center">
          {TABS.map((t) => (
            <button
              key={t.key}
              role="tab"
              aria-selected={tab === t.key}
              onClick={() => setTab(t.key)}
              className={cn(
                "relative px-3 py-2 text-body-sm font-medium transition-colors",
                tab === t.key ? "text-brand" : "text-ink-muted hover:text-ink"
              )}
            >
              {t.label}
              {tab === t.key && (
                <span className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-brand" aria-hidden />
              )}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-0.5">
          <IconButton label="Copy transcript" size="sm">
            <Copy size={15} aria-hidden />
          </IconButton>
          <IconButton label="Expand" size="sm" onClick={onExpand}>
            <Maximize2 size={15} aria-hidden />
          </IconButton>
        </div>
      </div>

      {tab === "transcript" && <TranscriptTab currentSeconds={currentSeconds} onSeek={onSeek} />}
      {tab === "askfred" && <AskFredTab />}
      {tab === "skills" && <SkillsTab />}
    </section>
  );
}
