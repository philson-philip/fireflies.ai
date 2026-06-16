import { ChevronDown, Plus, Copy } from "lucide-react";
import { RAIL_ITEMS } from "@data/panels";
import PanelShell from "@components/meeting/CommandPanel/PanelShell";
import Overview from "@components/meeting/CommandPanel/views/Overview";
import IndexView from "@components/meeting/CommandPanel/views/IndexView";
import SoundbitesView from "@components/meeting/CommandPanel/views/SoundbitesView";
import CommentsView from "@components/meeting/CommandPanel/views/CommentsView";
import BookmarksView from "@components/meeting/CommandPanel/views/BookmarksView";
import EmptyPanel from "@components/meeting/CommandPanel/views/EmptyPanel";

const PANEL_VIEWS = {
  search: Overview,
  notes: IndexView,
  soundbites: SoundbitesView,
  comments: CommentsView,
  bookmarks: BookmarksView,
};

const PANEL_HEADINGS = {
  comments: (
    <div className="flex items-center gap-1 cursor-pointer hover:text-ink">
      All <ChevronDown size={14} />
    </div>
  ),
  bookmarks: (
    <div className="flex items-center gap-1 cursor-pointer hover:text-ink">
      All Bookmarks <ChevronDown size={14} />
    </div>
  ),
};

const PANEL_ACTIONS = {
  notes: <Plus size={18} className="text-ink-muted hover:text-ink cursor-pointer" />,
  soundbites: <Plus size={18} className="text-ink-muted hover:text-ink cursor-pointer" />,
  bookmarks: (
    <div className="flex items-center gap-3">
      <Copy size={16} className="text-ink-muted hover:text-ink cursor-pointer" />
      <label className="flex items-center gap-1.5 cursor-pointer group">
        <input type="checkbox" className="rounded-sm border-line text-brand focus:ring-brand focus:ring-offset-0 w-3.5 h-3.5 cursor-pointer" />
        <span className="text-label font-medium text-ink-muted group-hover:text-ink select-none">By me</span>
      </label>
    </div>
  ),
};

const CommandPanel = ({ active, onClose }) => {
  const item = RAIL_ITEMS.find((i) => i.key === active);
  if (!item) return null;

  const View = PANEL_VIEWS[active] || (() => <EmptyPanel label={item.label} />);

  return (
    <PanelShell
      title={item.label}
      heading={PANEL_HEADINGS[active]}
      action={PANEL_ACTIONS[active]}
      onClose={onClose}
    >
      <View />
    </PanelShell>
  );
};

export default CommandPanel;
