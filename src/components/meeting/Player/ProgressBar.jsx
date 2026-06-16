import { useState, useRef, useCallback, useEffect } from "react";
import { Star, ThumbsUp, ThumbsDown, CheckSquare } from "lucide-react";
import Tooltip from "@components/ui/Tooltip";
import { useToast } from "@components/ui/Toast";
import { cn, formatClock, clamp } from "@lib/utils";

const STEP = 5;

const MARKER_ICONS = {
  important: Star,
  action: CheckSquare,
  like: ThumbsUp,
  dislike: ThumbsDown,
};

const Marker = ({ marker, totalSeconds, onDeleteMarker, onScrub, setHoveredMarkerId, isHovering }) => {
  const toast = useToast();
  const pct = totalSeconds ? (marker.seconds / totalSeconds) * 100 : 0;
  const Icon = MARKER_ICONS[marker.type] || Star;

  return (
    <Tooltip
      label={`Philson marked ${marker.type}`}
      side="top"
      positioned
      action={
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onDeleteMarker(marker.id);
            toast({ title: "Bookmark removed successfully", variant: "success" });
          }}
          className="text-ink-muted hover:text-danger ml-1 p-0.5 transition-colors cursor-pointer"
          aria-label={`Delete ${marker.type} marker`}
        >
          ✕
        </button>
      }
      className={cn(
        "absolute bottom-full mb-1 -translate-x-1/2 z-20 cursor-pointer group/marker transition-all duration-300",
        isHovering ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
      )}
      style={{ left: `${pct}%` }}
      onMouseEnter={() => {
        setHoveredMarkerId(marker.id);
      }}
      onMouseLeave={() => {
        setHoveredMarkerId(null);
      }}
      onClick={(e) => {
        e.stopPropagation();
        onScrub(marker.seconds);
      }}
      onPointerDown={(e) => {
        e.stopPropagation();
      }}
    >
      <div className="text-ink bg-surface rounded-sm hover:scale-110 transition-transform">
        <Icon size={18} strokeWidth={1.5} className="shrink-0" />
      </div>
    </Tooltip>
  );
};

const ProgressBar = ({ currentSeconds, totalSeconds, onScrub, markers = [], onDeleteMarker, isFooterHovered }) => {
  const [isProgressBarHovering, setIsProgressBarHovering] = useState(false);
  const [hoverX, setHoverX] = useState(0);
  const [hoverTime, setHoverTime] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [hoveredMarkerId, setHoveredMarkerId] = useState(null);
  const trackRef = useRef(null);
  const isDraggingRef = useRef(false);
  const capturedRef = useRef(null);

  const isHovering = isProgressBarHovering || isFooterHovered;
  const pct = totalSeconds ? clamp((currentSeconds / totalSeconds) * 100, 0, 100) : 0;

  useEffect(() => {
    isDraggingRef.current = isDragging;
  }, [isDragging]);

  const handlePointerMove = useCallback(
    (e, forceScrub = false) => {
      if (!trackRef.current) return;
      const rect = trackRef.current.getBoundingClientRect();
      const x = clamp(e.clientX - rect.left, 0, rect.width);
      const p = x / rect.width;
      setHoverX(p * 100);
      setHoverTime(p * totalSeconds);

      if (isDraggingRef.current || forceScrub) {
        onScrub(p * totalSeconds);
      }
    },
    [totalSeconds, onScrub]
  );

  const handlePointerDown = (e) => {
    if (!trackRef.current) return;
    setIsDragging(true);
    capturedRef.current = e.currentTarget;
    e.currentTarget.setPointerCapture(e.pointerId);
    handlePointerMove(e, true);
  };

  const handlePointerUp = useCallback((e) => {
    setIsDragging(false);
    capturedRef.current?.releasePointerCapture?.(e.pointerId);
    capturedRef.current = null;
  }, []);

  const handleKeyDown = (e) => {
    let next = null;
    if (e.key === "ArrowLeft" || e.key === "ArrowDown") next = Math.max(0, currentSeconds - STEP);
    else if (e.key === "ArrowRight" || e.key === "ArrowUp") next = Math.min(totalSeconds, currentSeconds + STEP);
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = totalSeconds;
    if (next != null) {
      e.preventDefault();
      onScrub(next);
    }
  };

  useEffect(() => {
    if (!isDragging) return;
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [isDragging, handlePointerMove, handlePointerUp]);

  return (
    <div
      ref={trackRef}
      role="slider"
      tabIndex={0}
      aria-label="Seek"
      aria-orientation="horizontal"
      aria-valuemin={0}
      aria-valuemax={Math.floor(totalSeconds)}
      aria-valuenow={Math.floor(currentSeconds)}
      aria-valuetext={`${formatClock(currentSeconds)} of ${formatClock(totalSeconds)}`}
      onKeyDown={handleKeyDown}
      className="absolute inset-x-0 -top-1 h-3 group cursor-pointer touch-none"
      onPointerEnter={() => setIsProgressBarHovering(true)}
      onPointerLeave={() => setIsProgressBarHovering(false)}
      onPointerDown={handlePointerDown}
    >
      {/* Transparent Hover Capture Bridge to retain hover context when moving up to markers */}
      {isHovering && (
        <div
          className="absolute left-0 w-full cursor-default"
          style={{
            top: "-100px",
            height: "105px",
            background: "transparent",
            zIndex: 10,
          }}
        />
      )}

      {/* Gradient Background Overlay */}
      <div
        className={cn(
          "pointer-events-none absolute left-0 w-full transition-opacity duration-300",
          isHovering ? "opacity-100" : "opacity-0"
        )}
        style={{
          top: "-40px",
          height: "45px",
          background: "linear-gradient(180deg, transparent 0%, color-mix(in srgb, var(--surface) 90%, transparent) 100%, var(--surface) 100%)",
        }}
      />

      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2">
        <div
          className={cn(
            "w-full bg-surface-muted transition-all duration-150 group-focus-visible:h-1",
            isHovering || isDragging ? "h-1" : "h-0.5"
          )}
        />
        <div
          className={cn(
            "absolute inset-y-0 left-0 bg-brand transition-all duration-150 group-focus-visible:h-1",
            isHovering || isDragging ? "h-1" : "h-0.5",
            isDragging ? "transition-none" : "transition-[width]"
          )}
          style={{ width: `${pct}%` }}
        />
      </div>

      {/* Render Markers above progress bar */}
      {markers.map((marker) => (
        <Marker
          key={marker.id}
          marker={marker}
          totalSeconds={totalSeconds}
          onDeleteMarker={onDeleteMarker}
          onScrub={onScrub}
          setHoveredMarkerId={setHoveredMarkerId}
          isHovering={isHovering}
        />
      ))}

      <div
        className={cn(
          "absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand shadow-subtle transition-opacity duration-150 group-focus-visible:opacity-100",
          isHovering || isDragging ? "opacity-100" : "opacity-0",
          isDragging ? "transition-none" : "transition-[left]"
        )}
        style={{ left: `${pct}%` }}
      />

      {isProgressBarHovering && !isDragging && hoveredMarkerId === null && (
        <div
          className="pointer-events-none absolute bottom-full mb-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-ink px-1.5 py-1 text-caption font-medium text-ink-inverse shadow-subtle"
          style={{ left: `${hoverX}%` }}
        >
          {formatClock(hoverTime)}
        </div>
      )}
    </div>
  );
};

export default ProgressBar;
