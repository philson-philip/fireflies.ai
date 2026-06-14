import { Video, Sparkles, Copy, Plus, Globe, Calendar } from "lucide-react";
import Button from "../ui/Button";
import Avatar from "../ui/Avatar";
import IconButton from "../ui/IconButton";
import { useToast } from "../ui/Toast";
import { meeting, participants, summary, notes } from "../../data/meeting";

// Center column: a calm, scannable digest. min-w-0 lets it shrink without
// pushing the transcript, and the metadata row wraps gracefully instead of
// collapsing into cramped columns on narrow widths.
export default function SummaryPane() {
  const toast = useToast();

  return (
    <div className="scroll-thin h-full min-w-0 flex-1 overflow-y-auto">
      <div className="mx-auto max-w-2xl px-5 py-6 sm:px-8">
        {/* Title + meta */}
        <div className="flex items-start justify-between gap-4">
          <h1 className="font-display text-h1 font-semibold text-ink">{meeting.title}</h1>
          <Button variant="secondary" size="sm" className="hidden shrink-0 sm:inline-flex">
            <Video size={15} aria-hidden /> Video
          </Button>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-caption text-ink-muted">
          <span className="inline-flex items-center gap-1.5">
            <Avatar name={meeting.host.name} size="xs" />
            {meeting.host.name}
            <span className="rounded bg-surface-muted px-1.5 py-0.5 font-medium text-ink-secondary">
              +{meeting.otherCount}
            </span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Calendar size={13} aria-hidden /> {meeting.date}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Globe size={13} aria-hidden /> {meeting.language}
          </span>
        </div>

        {/* Summary */}
        <div className="mt-7 flex items-center justify-between">
          <span className="inline-flex items-center gap-2 text-h4 font-medium text-ink-secondary">
            <Sparkles size={16} className="text-brand" aria-hidden /> General summary
          </span>
          <div className="flex items-center gap-1">
            <IconButton
              label="Copy summary"
              size="sm"
              onClick={() => toast({ title: "Summary copied", variant: "success" })}
            >
              <Copy size={15} aria-hidden />
            </IconButton>
            <Button variant="ghost" size="sm">
              <Plus size={15} aria-hidden /> AI Skills
            </Button>
          </div>
        </div>

        <dl className="mt-4 space-y-3.5">
          {summary.map((row) => (
            <div key={row.label} className="grid grid-cols-1 gap-0.5 sm:grid-cols-[160px_1fr] sm:gap-4">
              <dt className="text-body-sm font-semibold text-ink">{row.label}</dt>
              <dd className="text-body text-ink-secondary">{row.text}</dd>
            </div>
          ))}
        </dl>

        {/* Notes */}
        <div className="mt-9 border-t border-line pt-7">
          <h2 className="font-display text-h3 font-semibold text-ink">Notes</h2>
          {notes.map((group) => (
            <section key={group.heading} className="mt-5">
              <h3 className="text-body-sm font-semibold text-ink">{group.heading}</h3>
              <ul className="mt-2.5 space-y-2">
                {group.items.map((item, i) => (
                  <li key={i} className="flex items-baseline gap-2 text-body text-ink-secondary">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ink-muted" aria-hidden />
                    <span>
                      {item.text}{" "}
                      <button
                        type="button"
                        className="rounded font-medium text-brand tabular-nums hover:underline"
                      >
                        {item.at}
                      </button>
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
