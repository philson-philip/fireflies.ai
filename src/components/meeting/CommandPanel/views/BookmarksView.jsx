import { Star, ThumbsUp, ThumbsDown, CheckSquare } from "lucide-react";
import Card from "../../../ui/Card";
import Typography from "../../../ui/Typography";
import { cn } from "../../../../lib/utils";
import { bookmarks } from "../../../../data/meeting";

const BOOKMARK_TONES = {
  info: { border: "border-l-[2px] border-t-0 border-b-0 border-r-0 !border-info", text: "text-info", Icon: Star },
  success: { border: "border-l-[2px] border-t-0 border-b-0 border-r-0 !border-success", text: "text-success", Icon: ThumbsUp },
  danger: { border: "border-l-[2px] border-t-0 border-b-0 border-r-0 !border-danger", text: "text-danger", Icon: ThumbsDown },
  warning: { border: "border-l-[2px] border-t-0 border-b-0 border-r-0 !border-warning", text: "text-warning", Icon: CheckSquare },
};

const BookmarksView = ({ }) => (
  <div className="flex flex-col gap-4 p-4">
    {bookmarks.map((b) => {
      const style = BOOKMARK_TONES[b.tone] || { border: "border-l-[2px] border-line", text: "text-ink-secondary", Icon: null };
      const Icon = style.Icon;
      return (
        <Card
          key={b.id}
          className={cn("!rounded-xl overflow-hidden flex flex-col gap-3 p-4 bg-surface shadow-subtle border-t border-r border-b border-line", style.border)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {Icon && <Icon size={14} className={style.text} />}
              <Typography as="span" variant="label" tone={style.text} className="font-medium">{b.type}</Typography>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Typography as="h4" variant="body-sm" tone="text-ink" className="font-medium">{b.title}</Typography>
            <Typography as="p" variant="label" className="leading-relaxed line-clamp-4">{b.content}</Typography>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-caption text-info border-b border-transparent hover:border-brand hover:text-brand transition-colors cursor-pointer">{b.time}</span>
            <span className="text-caption text-ink-muted">&bull;</span>
            <span className="text-caption text-ink-muted">{b.author}</span>
          </div>
        </Card>
      );
    })}
  </div>
);

export default BookmarksView;
