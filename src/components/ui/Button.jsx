import { cn } from "../../lib/utils";

const VARIANTS = {
  primary:
    "bg-brand text-ink-inverse shadow-subtle enabled:hover:bg-brand-hover enabled:active:bg-brand-active disabled:bg-line disabled:text-ink-muted",
  secondary:
    "bg-surface text-ink border border-line shadow-subtle enabled:hover:bg-surface-subtle enabled:active:bg-surface-muted disabled:text-ink-muted",
  ghost:
    "bg-transparent text-ink-secondary enabled:hover:bg-surface-subtle enabled:hover:text-ink enabled:active:bg-surface-muted disabled:text-ink-muted",
};

const SIZES = {
  sm: "h-8 px-2.5 text-label gap-1.5",
  md: "h-9 px-3.5 text-body-sm gap-2",
  lg: "h-11 px-5 text-body gap-2",
};

const Button = ({ variant = "primary", size = "md", className, children, ...props }) => (
  <button
    className={cn(
      "inline-flex items-center justify-center rounded-[5px] font-display font-medium transition-colors duration-150 ease-out-soft",
      "disabled:cursor-not-allowed disabled:shadow-none",
      VARIANTS[variant],
      SIZES[size],
      className
    )}
    {...props}
  >
    {children}
  </button>
);

export default Button;
