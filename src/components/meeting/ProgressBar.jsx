import { useState, useRef, useCallback, useEffect } from "react";
import { Star, ThumbsUp, ThumbsDown, CheckSquare } from "lucide-react";
import Tooltip from "../ui/Tooltip";
import { useToast } from "../ui/Toast";
import { cn, formatClock } from "../../lib/utils";

const STEP = 5;

const Marker = ({ marker, totalSeconds, onDeleteMarker, onScrub, setHoveredMarkerId, isHovering }) => {
  const toast = useToast();
  const pct = totalSeconds ? (marker.seconds / totalSeconds) * 100 : 0;

  let Icon = Star;
  if (marker.type === "like") Icon = ThumbsUp;
  else if (marker.type === "action") Icon = CheckSquare;
  else if (marker.type === "dislike") Icon = ThumbsDown;

  return (
    <Tooltip
      label={`Philson marked ${marker.type}`}
      side="top"
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

  const isHovering = isProgressBarHovering || isFooterHovered;
  const pct = totalSeconds ? Math.min(100, Math.max(0, (currentSeconds / totalSeconds) * 100)) : 0;

  const handlePointerMove = useCallback(
    (e, forceScrub = false) => {
      if (!trackRef.current) return;
      const rect = trackRef.current.getBoundingClientRect();
      const x = Math.min(Math.max(0, e.clientX - rect.left), rect.width);
      const p = x / rect.width;
      setHoverX(p * 100);
      setHoverTime(p * totalSeconds);

      if (isDragging || forceScrub) {
        onScrub(p * totalSeconds);
      }
    },
    [isDragging, totalSeconds, onScrub]
  );

  const handlePointerDown = (e) => {
    if (!trackRef.current) return;
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    handlePointerMove(e, true);
  };

  const handlePointerUp = (e) => {
    setIsDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

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
    if (isDragging) {
      window.addEventListener("pointermove", handlePointerMove);
      window.addEventListener("pointerup", handlePointerUp);
    } else {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    }
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [isDragging, handlePointerMove]);

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
          background: "linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.9) 100%, var(--color-white) 100%)",
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
