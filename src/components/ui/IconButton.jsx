import { cn } from "../../lib/utils";
import Tooltip from "./Tooltip";

const SIZES = {
  sm: "h-8 w-8",
  md: "h-9 w-9",
  lg: "h-10 w-10",
};

// Every icon control routes through here, so it is guaranteed to have an
// accessible name (aria-label) and a tooltip. This is the system-level fix
// for "icon buttons have no label / no tooltip" from the audit.
export default function IconButton({
  label,
  shortcut,
  side = "auto",
  size = "md",
  active = false,
  className,
  children,
  ...props
}) {
  return (
    <Tooltip label={label} shortcut={shortcut} side={side}>
      <button
        type="button"
        aria-label={label}
        aria-pressed={active || undefined}
        className={cn(
          "inline-flex items-center justify-center rounded-md text-ink-secondary transition-colors duration-150 ease-out-soft",
          "hover:bg-surface-subtle hover:text-ink active:bg-surface-muted",
          active && "bg-brand-soft text-brand hover:bg-brand-soft hover:text-brand",
          SIZES[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    </Tooltip>
  );
}
