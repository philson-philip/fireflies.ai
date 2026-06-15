import { useEffect, useRef, useState } from "react";
import { FileText, AlignLeft } from "lucide-react";
import TopBar from "./TopBar";
import LeftRail from "./LeftRail";
import CommandPanel from "./CommandPanel";
import SummaryPane from "./SummaryPane";
import TranscriptPane from "./TranscriptPane";
import PlayerBar from "./PlayerBar";
import ResizeHandle from "./ResizeHandle";
import { cn } from "../../lib/utils";
import { meeting } from "../../data/meeting";

const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(
    () => typeof window !== "undefined" && window.matchMedia(query).matches
  );
  useEffect(() => {
    const mq = window.matchMedia(query);
    const handler = (e) => setMatches(e.matches);
    mq.addEventListener("change", handler);
    setMatches(mq.matches);
    return () => mq.removeEventListener("change", handler);
  }, [query]);
  return matches;
};

const MIN_W = 360;
const MAX_W = 720;

const MeetingDetail = () => {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const [activePanel, setActivePanel] = useState(null);
  const [transcriptWidth, setTranscriptWidth] = useState(460);
  const [playing, setPlaying] = useState(false);
  const [seconds, setSeconds] = useState(8);
  const [mobileTab, setMobileTab] = useState("summary");
  const timer = useRef(null);

  useEffect(() => {
    if (!playing) return;
    timer.current = setInterval(() => {
      setSeconds((s) => (s >= meeting.durationSeconds ? 0 : s + 1));
    }, 1000);
    return () => clearInterval(timer.current);
  }, [playing]);

  const resize = (delta) =>
    setTranscriptWidth((w) => Math.min(MAX_W, Math.max(MIN_W, w - delta)));

  return (
    <div className="flex h-full flex-col bg-canvas text-ink overflow-hidden">
      <TopBar />

      <div className="flex min-h-0 flex-1 overflow-hidden">
        {isDesktop ? (
          <>
            <LeftRail active={activePanel} onSelect={setActivePanel} />
            {activePanel && <CommandPanel active={activePanel} onClose={() => setActivePanel(null)} />}
            <SummaryPane />
            <ResizeHandle onResize={resize} />
            <div style={{ width: transcriptWidth }} className="flex min-w-0">
              <TranscriptPane currentSeconds={seconds} onSeek={setSeconds} onExpand={() => {}} />
            </div>
          </>
        ) : (
          <div className="flex min-h-0 w-full flex-col">
            <div
              role="tablist"
              aria-label="Meeting view"
              className="flex shrink-0 gap-1 border-b border-line bg-surface p-2"
            >
              {[
                { key: "summary", label: "Summary", icon: AlignLeft },
                { key: "transcript", label: "Transcript", icon: FileText },
              ].map((t) => (
                <button
                  key={t.key}
                  role="tab"
                  aria-selected={mobileTab === t.key}
                  onClick={() => setMobileTab(t.key)}
                  className={cn(
                    "flex flex-1 items-center justify-center gap-1.5 rounded-md py-2 text-body-sm font-medium transition-colors",
                    mobileTab === t.key ? "bg-brand-soft text-brand" : "text-ink-muted hover:bg-surface-subtle"
                  )}
                >
                  <t.icon size={15} aria-hidden /> {t.label}
                </button>
              ))}
            </div>
            <div className="min-h-0 flex-1">
              {mobileTab === "summary" ? (
                <SummaryPane />
              ) : (
                <TranscriptPane currentSeconds={seconds} onSeek={setSeconds} onExpand={() => {}} />
              )}
            </div>
          </div>
        )}
      </div>

      <PlayerBar
        playing={playing}
        onTogglePlay={() => setPlaying((p) => !p)}
        currentSeconds={seconds}
        onScrub={setSeconds}
      />
    </div>
  );
};

export default MeetingDetail;
