import { useEffect, useRef, useState } from "react";
import { FileText, AlignLeft } from "lucide-react";
import TopBar from "@components/meeting/TopBar";
import LeftRail from "@components/meeting/LeftRail";
import CommandPanel from "@components/meeting/CommandPanel";
import SummaryPane from "@components/meeting/SummaryPane";
import TranscriptPane from "@components/meeting/TranscriptPane";
import PlayerBar from "@components/meeting/PlayerBar";
import ResizeHandle from "@components/meeting/ResizeHandle";
import { cn } from "@lib/utils";
import { meeting } from "@data/meeting";

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
  const [markers, setMarkers] = useState([
    { id: 1, type: "like", seconds: 120 },
    { id: 2, type: "important", seconds: 480 },
    { id: 3, type: "action", seconds: 1080 },
    { id: 4, type: "dislike", seconds: 1680 },
  ]);
  const timer = useRef(null);
  const secondsRef = useRef(seconds);

  useEffect(() => {
    secondsRef.current = seconds;
  }, [seconds]);

  const handleAddMarker = (type) => {
    const currentSecs = secondsRef.current;
    setMarkers((prev) => {
      if (prev.some((m) => m.type === type && m.seconds === currentSecs)) {
        return prev;
      }
      return [
        ...prev,
        { id: Date.now() + Math.random(), type, seconds: currentSecs },
      ].sort((a, b) => a.seconds - b.seconds);
    });
  };

  const handleDeleteMarker = (id) => {
    setMarkers((prev) => prev.filter((m) => m.id !== id));
  };

  const handleAddMarkerRef = useRef(null);
  handleAddMarkerRef.current = handleAddMarker;

  useEffect(() => {
    if (!playing) return;
    timer.current = setInterval(() => {
      setSeconds((s) => (s >= meeting.durationSeconds ? 0 : s + 1));
    }, 1000);
    return () => clearInterval(timer.current);
  }, [playing]);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const el = e.target;
      const tag = el?.tagName;
      const role = el?.getAttribute?.("role");
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || el?.isContentEditable) return;

      if (e.key === " ") {
        if (tag === "BUTTON" || tag === "A" || role === "button") return;
        e.preventDefault();
        setPlaying((p) => !p);
      } else if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        if (role === "slider" || role === "separator") return;
        e.preventDefault();
        const delta = e.key === "ArrowLeft" ? -5 : 5;
        setSeconds((s) => Math.min(meeting.durationSeconds, Math.max(0, s + delta)));
      } else if (e.key === "1") {
        e.preventDefault();
        handleAddMarkerRef.current?.("important");
      } else if (e.key === "2") {
        e.preventDefault();
        handleAddMarkerRef.current?.("action");
      } else if (e.key === "3") {
        e.preventDefault();
        handleAddMarkerRef.current?.("like");
      } else if (e.key === "4") {
        e.preventDefault();
        handleAddMarkerRef.current?.("dislike");
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const resize = (delta) =>
    setTranscriptWidth((w) => Math.min(MAX_W, Math.max(MIN_W, w - delta)));

  return (
    <div className="flex h-full flex-col bg-canvas text-ink overflow-hidden">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-3 focus:z-[200] focus:rounded-md focus:border focus:border-line focus:bg-surface focus:px-4 focus:py-2 focus:text-body-sm focus:font-medium focus:text-brand focus:shadow-floating"
      >
        Skip to content
      </a>
      <TopBar />

      <div className="flex min-h-0 flex-1 overflow-hidden">
        {isDesktop ? (
          <>
            <LeftRail active={activePanel} onSelect={setActivePanel} />
            {activePanel && <CommandPanel active={activePanel} onClose={() => setActivePanel(null)} />}
            <main id="main-content" tabIndex={-1} className="flex min-w-0 flex-1 focus:outline-none">
              <SummaryPane onSeek={setSeconds} />
              <ResizeHandle onResize={resize} value={transcriptWidth} min={MIN_W} max={MAX_W} />
              <div style={{ width: transcriptWidth }} className="flex min-w-0">
                <TranscriptPane currentSeconds={seconds} onSeek={setSeconds} onExpand={() => {}} />
              </div>
            </main>
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
                    mobileTab === t.key ? "bg-brand-soft text-brand-active" : "text-ink-muted hover:bg-surface-subtle"
                  )}
                >
                  <t.icon size={15} aria-hidden /> {t.label}
                </button>
              ))}
            </div>
            <main id="main-content" tabIndex={-1} className="min-h-0 flex-1 focus:outline-none">
              {mobileTab === "summary" ? (
                <SummaryPane onSeek={setSeconds} />
              ) : (
                <TranscriptPane currentSeconds={seconds} onSeek={setSeconds} onExpand={() => {}} />
              )}
            </main>
          </div>
        )}
      </div>

      <PlayerBar
        playing={playing}
        onTogglePlay={() => setPlaying((p) => !p)}
        currentSeconds={seconds}
        onScrub={setSeconds}
        markers={markers}
        onAddMarker={handleAddMarker}
        onDeleteMarker={handleDeleteMarker}
      />
    </div>
  );
};

export default MeetingDetail;
