import { Hash, ChevronRight, MoreHorizontal, Share2, Link2, Download, Plus, Bell } from "lucide-react";
import IconButton from "../ui/IconButton";
import Button from "../ui/Button";
import Avatar from "../ui/Avatar";
import Typography from "../ui/Typography";
import { useToast } from "../ui/Toast";
import { meeting } from "../../data/meeting";

const TopBar = ({ onCopyLink }) => {
  const toast = useToast();

  return (
    <header className="z-30 flex h-14 shrink-0 items-center justify-between gap-3 border-b border-line bg-surface px-3 sm:px-4">
      <nav aria-label="Breadcrumb" className="flex min-w-0 items-center gap-1.5">
        <a
          href="#"
          aria-label={meeting.channel}
          className="flex items-center gap-1.5 rounded-md px-1.5 py-1 text-body-sm font-medium text-ink-secondary hover:bg-surface-subtle hover:text-ink"
        >
          <Hash size={15} aria-hidden className="text-ink-muted" />
          <span className="hidden sm:inline">{meeting.channel}</span>
        </a>
        <ChevronRight size={14} className="shrink-0 text-ink-muted" aria-hidden />
        <Typography as="span" variant="body-sm" tone="text-ink" className="truncate font-semibold" title={meeting.title}>
          {meeting.title}
        </Typography>
        <IconButton label="Meeting options" size="sm" className="ml-0.5">
          <MoreHorizontal size={16} aria-hidden />
        </IconButton>
      </nav>

      <div className="flex shrink-0 items-center gap-1.5">
        <Button
          size="sm"
          className="hidden sm:inline-flex"
          onClick={() => toast({ title: "Share dialog", description: "Invite teammates or copy a public link.", variant: "info" })}
        >
          <Share2 size={15} aria-hidden /> Share
        </Button>
        <IconButton
          label="Copy link"
          onClick={() => {
            onCopyLink?.();
            toast({ title: "Link copied", description: "Anyone with access can open this meeting.", variant: "success" });
          }}
        >
          <Link2 size={16} aria-hidden />
        </IconButton>
        <IconButton label="Download">
          <Download size={16} aria-hidden />
        </IconButton>
        <span className="mx-1 hidden h-5 w-px bg-line sm:block" aria-hidden />
        <IconButton label="New meeting">
          <Plus size={18} aria-hidden />
        </IconButton>
        <IconButton label="Notifications">
          <Bell size={17} aria-hidden />
        </IconButton>
        <button
          type="button"
          aria-label="Account"
          className="ml-0.5 rounded-md focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-brand-ring"
        >
          <Avatar name="Philson Philip" size="sm" />
        </button>
      </div>
    </header>
  );
};

export default TopBar;
