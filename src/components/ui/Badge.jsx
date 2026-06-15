import { cn } from "@lib/utils";

export const TONES = {
  neutral: "bg-surface-muted text-ink-secondary",
  brand: "bg-brand-soft text-brand-active",
  success: "bg-success-soft text-success",
  warning: "bg-warning-soft text-warning",
  danger: "bg-danger-soft text-danger",
  info: "bg-info-soft text-info",
};

export const DOT = {
  neutral: "bg-ink-muted",
  brand: "bg-brand",
  success: "bg-success",
  warning: "bg-warning",
  danger: "bg-danger",
  info: "bg-info",
};

const Badge = ({ tone = "neutral", dot = false, className, children }) => (
  <span
    className={cn(
      "inline-flex items-center gap-1.5 rounded-2xl px-2.5 py-0.5 text-caption font-medium",
      TONES[tone],
      className
    )}
  >
    {dot && <span className={cn("h-1.5 w-1.5 rounded-full", DOT[tone])} aria-hidden />}
    {children}
  </span>
);

export default Badge;
