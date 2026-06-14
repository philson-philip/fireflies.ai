import { cn } from "../../lib/utils";

const VARIANTS = {
  primary:
    "bg-brand text-ink-inverse shadow-subtle hover:bg-brand-hover active:bg-brand-active disabled:bg-line disabled:text-ink-muted",
  secondary:
    "bg-surface text-ink border border-line shadow-subtle hover:bg-surface-subtle active:bg-surface-muted disabled:text-ink-muted disabled:bg-surface",
  ghost:
    "bg-transparent text-ink-secondary hover:bg-surface-subtle hover:text-ink active:bg-surface-muted disabled:text-ink-muted",
};

const SIZES = {
  sm: "h-8 px-2.5 text-label gap-1.5",
  md: "h-9 px-3.5 text-body-sm gap-2",
  lg: "h-11 px-5 text-body gap-2",
};

export default function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md font-display font-medium transition-colors duration-150 ease-out-soft",
        "disabled:cursor-not-allowed",
        VARIANTS[variant],
        SIZES[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
