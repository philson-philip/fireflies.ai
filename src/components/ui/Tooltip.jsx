import { useId, useRef, useState } from "react";
import { cn } from "../../lib/utils";

const SIDE = {
  top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
  bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
  left: "right-full top-1/2 -translate-y-1/2 mr-2",
  right: "left-full top-1/2 -translate-y-1/2 ml-2",
};

// Lightweight tooltip. Appears on hover AND keyboard focus (a11y), with a
// short, responsive delay — the live app's tooltips feel laggy, so this
// opens in 120ms and closes immediately.
export default function Tooltip({ label, side = "bottom", children, className }) {
  const [open, setOpen] = useState(false);
  const timer = useRef(null);
  const id = useId();

  const show = () => {
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
          "pointer-events-none absolute z-50 whitespace-nowrap rounded-md bg-ink px-2 py-1 text-caption font-medium text-ink-inverse shadow-lifted transition duration-150 ease-out-soft",
          SIDE[side],
          open ? "opacity-100" : "opacity-0"
        )}
      >
        {label}
      </span>
    </span>
  );
}
