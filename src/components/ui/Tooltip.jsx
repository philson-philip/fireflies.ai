import { useId, useRef, useState } from "react";
import { cn } from "../../lib/utils";

const SIDE = {
  top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
  bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
  left: "right-full top-1/2 -translate-y-1/2 mr-2",
  right: "left-full top-1/2 -translate-y-1/2 ml-2",
};

const Tooltip = ({ label, shortcut, action, side = "auto", children, className, style, onMouseEnter, onMouseLeave, ...props }) => {
  const [open, setOpen] = useState(false);
  const [computedSide, setComputedSide] = useState(side === "auto" ? "top" : side);
  const timer = useRef(null);
  const hideTimer = useRef(null);
  const id = useId();

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
        role="tooltip"
        id={id}
        className={cn(
          "absolute z-50 flex items-center gap-2 whitespace-nowrap rounded-md bg-surface border border-line px-2.5 py-1.5 text-caption font-normal text-ink shadow-lifted transition duration-150 ease-out-soft",
          action && open ? "pointer-events-auto" : "pointer-events-none",
          SIDE[side === "auto" ? computedSide : side],
          open ? "opacity-100 visible" : "opacity-0 invisible"
        )}
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
      </span>
    </span>
  );
};

export default Tooltip;
