import { ArrowUp } from "lucide-react";
import Avatar from "@components/ui/Avatar";
import IconButton from "@components/ui/IconButton";
import Typography from "@components/ui/Typography";
import { comments, getParticipantImage } from "@data/meeting";

const CommentsView = () => (
  <div className="flex flex-col h-full">
    <div className="flex-1 px-4 py-4 space-y-6">
      {comments.map((c) => (
        <div key={c.id} className="flex gap-3">
          {c.avatar === "F" ? (
            <div className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded bg-success text-caption font-medium text-ink-inverse shadow-subtle">
              F
            </div>
          ) : (
            <Avatar name={c.author} imageUrl={getParticipantImage(c.author)} size="xs" />
          )}
          <div className="flex flex-col gap-1.5 w-full min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <Typography as="span" variant="label" tone="text-ink" className="font-semibold">{c.author}</Typography>
              <span className="text-caption text-ink-muted">&bull;</span>
              <span className="text-caption text-info hover:underline cursor-pointer">{c.time}</span>
              <span className="text-caption text-ink-muted">&bull; {c.relativeTime}</span>
            </div>
            <Typography as="p" variant="label" tone="text-ink" className="whitespace-pre-wrap leading-relaxed break-words pr-2">
              {c.content}
            </Typography>
            {c.footer && (
              <Typography as="div" variant="caption" className="mt-2 border-l-2 border-line pl-3 py-1 pr-2">
                {c.footer}
              </Typography>
            )}
          </div>
        </div>
      ))}
    </div>

    <div className="sticky bottom-0 z-10 shrink-0 border-t border-line bg-surface p-4">
      <div className="flex items-start gap-2.5 rounded-md border border-line bg-surface-subtle p-2 shadow-subtle focus-within:border-brand-soft transition-colors">
        <Avatar name="Philson Philip" imageUrl={getParticipantImage("Philson Philip")} size="sm" />
        <textarea
          aria-label="Add a comment"
          className="max-h-32 min-h-[20px] w-full bg-transparent text-label text-ink placeholder:text-ink-muted focus:outline-none"
          placeholder="Comment..."
          rows={2}
        />
        <IconButton
          label="Send comment"
          size="sm"
          variant="brand"
          className="h-8 w-8 shrink-0 rounded-md bg-brand-soft text-brand hover:opacity-80"
        >
          <ArrowUp size={16} strokeWidth={2.5} />
        </IconButton>
      </div>
    </div>
  </div>
);

export default CommentsView;
