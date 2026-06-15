import { useState, useRef, useCallback, useEffect } from "react";
import { cn, formatClock } from "../../lib/utils";

const STEP = 5;

const ProgressBar = ({ currentSeconds, totalSeconds, onScrub }) => {
  const [isHovering, setIsHovering] = useState(false);
  const [hoverX, setHoverX] = useState(0);
  const [hoverTime, setHoverTime] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const trackRef = useRef(null);

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
      onPointerEnter={() => setIsHovering(true)}
      onPointerLeave={() => setIsHovering(false)}
      onPointerDown={handlePointerDown}
    >
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

      <div
        className={cn(
          "absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand shadow-subtle transition-opacity duration-150 group-focus-visible:opacity-100",
          isHovering || isDragging ? "opacity-100" : "opacity-0",
          isDragging ? "transition-none" : "transition-[left]"
        )}
        style={{ left: `${pct}%` }}
      />

      {isHovering && !isDragging && (
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
