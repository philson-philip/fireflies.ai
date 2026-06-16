import { useEffect, useState } from "react";
import { Copy, Maximize2, Minimize2 } from "lucide-react";
import askFredIconUrl from "@assets/brand/ask-fred.svg";
import IconButton from "@components/ui/IconButton";
import { useToast } from "@components/ui/Toast";
import { cn } from "@lib/utils";
import { transcript } from "@data/meeting";
import TranscriptTab from "@components/meeting/TranscriptPane/tabs/TranscriptTab";
import AskFredTab from "@components/meeting/TranscriptPane/tabs/AskFredTab";
import SkillsTab from "@components/meeting/TranscriptPane/tabs/SkillsTab";

const TABS = [
  { key: "transcript", label: "Transcript" },
  { key: "askfred", label: "AskFred", customIcon: askFredIconUrl },
  { key: "skills", label: "AI Skills" },
];

const TranscriptPane = ({ currentSeconds, onSeek, isExpanded, onToggleExpand }) => {
  const [tab, setTab] = useState("transcript");
  const toast = useToast();

  const handleCopy = async () => {
    const text = transcript
      .map((line) => `${line.speaker} (${line.at})\n${line.text}`)
      .join("\n\n");
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: "Transcript copied", description: `${transcript.length} lines copied to clipboard.`, variant: "success" });
    } catch {
      toast({ title: "Unable to copy", description: "Your browser blocked clipboard access.", variant: "danger" });
    }
  };

  return (
    <section
      aria-label="Transcript and AI tools"
      className="flex h-full min-w-0 flex-1 flex-col bg-surface"
    >
      <div className={cn("border-b border-line", isExpanded ? "px-4" : "")}>
        <div className={cn("mx-auto flex h-14 shrink-0 items-center justify-between gap-2 w-full", isExpanded ? "max-w-3xl" : "pl-2 pr-3")}>
          <div role="tablist" aria-label="Transcript views" className="flex h-full">
            {TABS.map((t) => {
              const isActive = tab === t.key;
              return (
                <button
                  key={t.key}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setTab(t.key)}
                  className={cn(
                    "relative flex shrink-0 items-center gap-1.5 px-3 h-full text-body-sm font-medium whitespace-nowrap transition-colors",
                    isActive ? "text-brand" : "text-ink-muted hover:text-ink"
                  )}
                >
                  {t.customIcon && <img src={t.customIcon} alt="" className="h-6 w-6" />}
                  <span>{t.label}</span>
                  {isActive && <span className="absolute inset-x-2 -bottom-px h-[2px] bg-brand" aria-hidden />}
                </button>
              );
            })}
          </div>
          <div className="flex items-center gap-0.5">
            <IconButton label="Copy transcript" size="sm" side="left" onClick={handleCopy}>
              <Copy size={15} aria-hidden />
            </IconButton>
            <IconButton
              label={isExpanded ? "Collapse" : "Expand"}
              size="sm"
              side="left"
              onClick={onToggleExpand}
            >
              {isExpanded ? <Minimize2 size={15} aria-hidden /> : <Maximize2 size={15} aria-hidden />}
            </IconButton>
          </div>
        </div>
      </div>

      {tab === "transcript" && <TranscriptTab currentSeconds={currentSeconds} onSeek={onSeek} />}
      {tab === "askfred" && <AskFredTab />}
      {tab === "skills" && <SkillsTab />}
    </section>
  );
};

export default TranscriptPane;
