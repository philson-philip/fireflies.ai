import { Star, ThumbsUp, ThumbsDown, CheckSquare, Trash2 } from "lucide-react";
import Card from "../../../ui/Card";
import Typography from "../../../ui/Typography";
import IconButton from "../../../ui/IconButton";
import { cn } from "../../../../lib/utils";
import { bookmarks } from "../../../../data/meeting";

const BOOKMARK_TONES = {
  info: { text: "text-info", Icon: Star },
  success: { text: "text-success", Icon: ThumbsUp },
  danger: { text: "text-danger", Icon: ThumbsDown },
  warning: { text: "text-warning", Icon: CheckSquare },
};

const BookmarksView = ({ }) => (
  <div className="flex flex-col gap-4 p-4">
    {bookmarks.map((b) => {
      const style = BOOKMARK_TONES[b.tone] || { text: "text-ink-secondary", Icon: null };
      const Icon = style.Icon;
      return (
        <Card
          key={b.id}
          className="relative group/bookmark !rounded-xl overflow-hidden flex flex-col gap-3 p-4 bg-surface shadow-subtle"
        >
          <div className="absolute right-2 top-2 opacity-0 group-hover/bookmark:opacity-100 transition-opacity duration-200 z-10">
            <IconButton label="Delete bookmark" side="left" variant="danger">
              <Trash2 size={15} aria-hidden />
            </IconButton>
          </div>
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
