import { cn } from "../../lib/utils";

const VARIANTS = {
  display: "font-display text-display font-semibold tracking-tight",
  h1: "font-display text-h1 font-semibold",
  h2: "font-display text-h2 font-semibold",
  h3: "font-display text-h3 font-semibold",
  h4: "text-h4 font-medium",
  body: "text-body",
  "body-sm": "text-body-sm",
  label: "text-label font-medium",
  caption: "text-caption",
};

const DEFAULT_TONE = {
  display: "text-ink",
  h1: "text-ink",
  h2: "text-ink",
  h3: "text-ink",
  h4: "text-ink",
  body: "text-ink-secondary",
  "body-sm": "text-ink-secondary",
  label: "text-ink-secondary",
  caption: "text-ink-muted",
};

const DEFAULT_TAGS = {
  display: "h1",
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  body: "p",
  "body-sm": "p",
  label: "span",
  caption: "span",
};

const Typography = ({ as, variant = "body", tone, className, children, ...props }) => {
  const Tag = as || DEFAULT_TAGS[variant] || "p";
  return (
    <Tag className={cn(VARIANTS[variant], tone || DEFAULT_TONE[variant], className)} {...props}>
      {children}
    </Tag>
  );
};

export default Typography;
