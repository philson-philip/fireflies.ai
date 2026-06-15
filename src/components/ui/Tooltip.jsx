import { useId, useRef, useState } from "react";
import { cn } from "../../lib/utils";

const SIDE = {
  top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
  bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
  left: "right-full top-1/2 -translate-y-1/2 mr-2",
  right: "left-full top-1/2 -translate-y-1/2 ml-2",
};

const Tooltip = ({ label, shortcut, side = "auto", children, className }) => {
  const [open, setOpen] = useState(false);
  const [computedSide, setComputedSide] = useState(side === "auto" ? "top" : side);
  const timer = useRef(null);
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
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setOpen(true), 120);
  };

  const hide = () => {
    clearTimeout(timer.current);
    setOpen(false);
  };

  if (!label) return children;

  return (
    <span
      className={cn("relative inline-flex", className)}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocusCapture={show}
      onBlurCapture={hide}
    >
      {children}
      <span
        role="tooltip"
        id={id}
        className={cn(
          "pointer-events-none absolute z-50 flex items-center gap-2 whitespace-nowrap rounded-md bg-surface border border-line px-2.5 py-1.5 text-body-sm text-ink shadow-subtle transition duration-150 ease-out-soft",
          SIDE[side === "auto" ? computedSide : side],
          open ? "opacity-100" : "opacity-0"
        )}
      >
        <span>{label}</span>
        {shortcut && (
          <kbd className="flex h-5 min-w-[20px] items-center justify-center rounded border border-line bg-transparent px-1 font-sans text-caption text-ink-muted">
            {shortcut}
          </kbd>
        )}
      </span>
    </span>
  );
};

export default Tooltip;
