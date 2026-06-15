import { cn } from "../../lib/utils";
import Tooltip from "./Tooltip";

const SIZES = {
  sm: "h-7 w-7 p-1.5",
  md: "h-8 w-8 p-1.5",
  lg: "h-10 w-10 p-2",
};

const IconButton = ({ label, shortcut, side = "auto", size = "md", active = false, className, children, ...props }) => (
  <Tooltip label={label} shortcut={shortcut} side={side}>
    <button
      type="button"
      aria-label={label}
      aria-pressed={active || undefined}
      className={cn(
        "inline-flex items-center justify-center rounded-[5px] text-ink-secondary transition-colors duration-150 ease-out-soft",
        "hover:bg-surface-secondary hover:text-ink active:bg-surface-muted",
        active && "bg-brand-soft text-brand hover:text-brand",
        SIZES[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  </Tooltip>
);

export default IconButton;
