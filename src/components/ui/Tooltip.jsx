import { useId, useRef, useState, useLayoutEffect } from "react";
import { cn } from "../../lib/utils";

const SIDE = {
  top: "bottom-full left-1/2 -translate-x-1/2 mb-[8.5px]",
  bottom: "top-full left-1/2 -translate-x-1/2 mt-[8.5px]",
  left: "right-full top-1/2 -translate-y-1/2 mr-[8.5px]",
  right: "left-full top-1/2 -translate-y-1/2 ml-[8.5px]",
};

const Tooltip = ({ label, shortcut, action, side = "auto", children, className, style, onMouseEnter, onMouseLeave, ...props }) => {
  const [open, setOpen] = useState(false);
  const [computedSide, setComputedSide] = useState(side === "auto" ? "top" : side);
  const timer = useRef(null);
  const hideTimer = useRef(null);
  const tooltipRef = useRef(null);
  const id = useId();

  const [nudge, setNudge] = useState({ x: 0, y: 0 });

  useLayoutEffect(() => {
    if (open && tooltipRef.current) {
      // Temporarily remove transform to measure true bounds
      const actualSide = side === "auto" ? computedSide : side;
      if (actualSide === "top" || actualSide === "bottom") {
        tooltipRef.current.style.setProperty("--tw-translate-x", "-50%");
      } else {
        tooltipRef.current.style.setProperty("--tw-translate-y", "-50%");
      }

      const rect = tooltipRef.current.getBoundingClientRect();
      let x = 0;
      let y = 0;
      
      if (rect.left < 8) {
        x = 8 - rect.left;
      } else if (rect.right > window.innerWidth - 8) {
        x = (window.innerWidth - 8) - rect.right;
      }
      
      if (rect.top < 8) {
        y = 8 - rect.top;
      } else if (rect.bottom > window.innerHeight - 8) {
        y = (window.innerHeight - 8) - rect.bottom;
      }

      setNudge({ x, y });
    } else {
      setNudge({ x: 0, y: 0 });
    }
  }, [open, computedSide, side]);

  const show = (e) => {
    if (side === "auto" && e.currentTarget) {
      const rect = e.currentTarget.getBoundingClientRect();
      if (rect.top > window.innerHeight / 2) {
        setComputedSide("top");
      } else {
        setComputedSide("bottom");
      }
    }
    clearTimeout(hideTimer.current);
    timer.current = setTimeout(() => setOpen(true), 120);
  };

  const hide = () => {
    clearTimeout(timer.current);
    // Add a delay to hide if there's an action, so the user can hover the tooltip itself
    hideTimer.current = setTimeout(() => setOpen(false), action ? 300 : 0);
  };

  const handleMouseEnter = (e) => {
    show(e);
    onMouseEnter?.(e);
  };

  const handleMouseLeave = (e) => {
    hide(e);
    onMouseLeave?.(e);
  };

  if (!label) return children;

  const hasExplicitPosition = className && (className.includes("absolute") || className.includes("relative") || className.includes("fixed"));
  const actualSide = side === "auto" ? computedSide : side;

  return (
    <span
      className={cn(hasExplicitPosition ? "" : "relative", "inline-flex", className)}
      style={style}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocusCapture={show}
      onBlurCapture={hide}
      onKeyDown={(e) => {
        if (e.key === "Escape") hide();
      }}
      {...props}
    >
      {children}
      <span
        ref={tooltipRef}
        role="tooltip"
        id={id}
        className={cn(
          "absolute z-50 flex items-center gap-2 whitespace-nowrap rounded-md bg-surface border border-line px-2.5 py-1.5 text-caption font-normal text-ink shadow-lifted transition duration-150 ease-out-soft",
          action && open ? "pointer-events-auto" : "pointer-events-none",
          SIDE[side === "auto" ? computedSide : side],
          open ? "opacity-100 visible" : "opacity-0 invisible"
        )}
        style={{
          "--tw-translate-x":
            actualSide === "top" || actualSide === "bottom" ? `calc(-50% + ${nudge.x}px)` : `${nudge.x}px`,
          "--tw-translate-y":
            actualSide === "left" || actualSide === "right" ? `calc(-50% + ${nudge.y}px)` : `${nudge.y}px`,
        }}
      >
        <span>{label}</span>
        {shortcut && (
          <kbd className="flex h-5 min-w-[20px] items-center justify-center rounded border border-line bg-transparent px-1 font-sans text-caption text-ink-muted">
            {shortcut}
          </kbd>
        )}
        {action && (
          <div className="flex items-center">
            {action}
          </div>
        )}
        <div
          className={cn(
            "absolute w-2 h-2 bg-surface rotate-45 pointer-events-none",
            actualSide === "top" && "bottom-[-4.5px] left-1/2 -translate-x-1/2 border-b border-r border-line",
            actualSide === "bottom" && "top-[-4.5px] left-1/2 -translate-x-1/2 border-t border-l border-line",
            actualSide === "left" && "right-[-4.5px] top-1/2 -translate-y-1/2 border-t border-r border-line",
            actualSide === "right" && "left-[-4.5px] top-1/2 -translate-y-1/2 border-b border-l border-line"
          )}
          style={{
            "--tw-translate-x":
              actualSide === "top" || actualSide === "bottom" ? `calc(-50% - ${nudge.x}px)` : `calc(0px - ${nudge.x}px)`,
            "--tw-translate-y":
              actualSide === "left" || actualSide === "right" ? `calc(-50% - ${nudge.y}px)` : `calc(0px - ${nudge.y}px)`,
          }}
        />
      </span>
    </span>
  );
};

export default Tooltip;
