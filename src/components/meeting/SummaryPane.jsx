import { Video, Sparkles, Copy, Plus, Globe, Calendar } from "lucide-react";
import Button from "../ui/Button";
import Avatar from "../ui/Avatar";
import IconButton from "../ui/IconButton";
import Typography from "../ui/Typography";
import { useToast } from "../ui/Toast";
import { toSeconds } from "../../lib/utils";
import { meeting, summary, notes } from "../../data/meeting";

const SummaryPane = ({ onSeek }) => {
  const toast = useToast();

  return (
    <div className="scroll-thin h-full min-w-0 flex-1 overflow-y-auto">
      <div className="mx-auto max-w-2xl p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <Typography variant="h1">{meeting.title}</Typography>
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

        <div className="mt-7 flex items-center justify-between">
          <Typography as="span" variant="h4" tone="text-ink-secondary" className="inline-flex items-center gap-2">
            <Sparkles size={16} className="text-brand" aria-hidden /> General summary
          </Typography>
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
              <Typography as="dt" variant="body-sm" tone="text-ink" className="font-semibold">
                {row.label}
              </Typography>
              <Typography as="dd" variant="body">
                {row.text}
              </Typography>
            </div>
          ))}
        </dl>

        <div className="mt-9 border-t border-line pt-7">
          <Typography variant="h3">Notes</Typography>
          {notes.map((group) => (
            <section key={group.heading} className="mt-5">
              <Typography variant="h4" as="h3" className="font-semibold">
                {group.heading}
              </Typography>
              <ul className="mt-2.5 space-y-2">
                {group.items.map((item, i) => (
                  <Typography as="li" variant="body" key={i} className="flex items-baseline gap-2">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ink-muted" aria-hidden />
                    <span>
                      {item.text}{" "}
                      <button
                        type="button"
                        onClick={() => onSeek?.(toSeconds(item.at))}
                        aria-label={`Jump to ${item.at}`}
                        className="rounded font-medium text-brand tabular-nums hover:underline"
                      >
                        {item.at}
                      </button>
                    </span>
                  </Typography>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SummaryPane;
