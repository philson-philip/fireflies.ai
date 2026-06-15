import { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import Typography from "@components/ui/Typography";

const Section = ({ title, defaultOpen = true, extraAction, children }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <section className="border-b border-line last:border-b-0 py-5 first:pt-0">
      <div className="flex w-full items-center justify-between group">
        <button
          type="button"
          className="flex-1 text-left"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
        >
          <Typography variant="caption" as="h3" className="font-semibold uppercase tracking-wide">{title}</Typography>
        </button>
        <div className="flex items-center gap-4">
          {extraAction && (
            <button type="button" className="text-ink-muted hover:text-ink" aria-label={`Add ${title}`}>
              {extraAction}
            </button>
          )}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="text-ink-muted transition-colors hover:text-ink"
            aria-label={isOpen ? "Collapse section" : "Expand section"}
          >
            {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>
      </div>
      {isOpen && <div className="mt-4">{children}</div>}
    </section>
  );
};

export default Section;
