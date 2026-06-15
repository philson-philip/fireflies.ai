import { useState } from "react";
import { ChevronsLeft, ChevronUp, ChevronDown, Plus, Check, MoreHorizontal, AudioLines, Sparkles, ArrowUp, Copy, Star, ThumbsUp, ThumbsDown } from "lucide-react";
import Badge, { TONES, DOT } from "../ui/Badge";
import Card from "../ui/Card";
import Avatar from "../ui/Avatar";
import IconButton from "../ui/IconButton";
import Button from "../ui/Button";
import { RAIL_ITEMS } from "./LeftRail";
import { insights, comments, bookmarks } from "../../data/meeting";

// IMPORTANT: this panel is a fixed 320px regardless of which rail item is
// active. In the live app each tab renders at its own width, so switching
// tabs visibly shifts the whole layout. One width = no jump.
const PANEL_WIDTH = "w-80";

function PanelShell({ title, heading, action, onClose, children }) {
  const display = heading || title;
  return (
    <aside
      aria-label={`${title} panel`}
      className={`${PANEL_WIDTH} group relative flex shrink-0 flex-col border-r border-line bg-surface-subtle`}
    >
      <div className="flex h-12 shrink-0 items-center justify-between border-b border-line px-4">
        {typeof display === "string" ? (
          <h2 className="text-[15px] font-semibold capitalize tracking-wide text-ink">{display}</h2>
        ) : (
          <div className="text-[15px] font-semibold capitalize tracking-wide text-ink">{display}</div>
        )}
        {action}
      </div>
      <div className="absolute -right-9 top-2 z-50 opacity-0 group-hover:opacity-100 transition-opacity">
        <IconButton label="Close panel" onClick={onClose} size="sm" className="border border-line bg-surface shadow-sm hover:bg-surface-subtle">
          <ChevronsLeft size={20} aria-hidden />
        </IconButton>
      </div>
      <div className="scroll-thin flex-1 overflow-y-auto">{children}</div>
    </aside>
  );
}

function Section({ title, defaultOpen = true, extraAction, children }) {
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
          <h3 className="text-caption font-semibold uppercase tracking-wide text-ink-muted">{title}</h3>
        </button>
        <div className="flex items-center gap-4">
          {extraAction && (
            <button
              type="button"
              className="text-ink-muted hover:text-ink"
              aria-label={`Add ${title}`}
            >
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
}

const SELECTED_STYLES = {
  neutral: "!bg-surface-muted !text-ink-secondary",
  brand: "!bg-brand-soft !text-brand",
  success: "!bg-success-soft !text-success",
  warning: "!bg-warning-soft !text-warning",
  danger: "!bg-danger-soft !text-danger",
  info: "!bg-info-soft !text-info",
};

const BORDER_STYLES = {
  neutral: "!border-ink-muted",
  brand: "!border-brand",
  success: "!border-success",
  warning: "!border-warning",
  danger: "!border-danger",
  info: "!border-info",
};

function Overview() {
  const [selectedFilters, setSelectedFilters] = useState(() =>
    insights.filters.length > 0 ? { [insights.filters[0].label]: true } : {}
  );
  const [selectedSentiments, setSelectedSentiments] = useState(() =>
    insights.sentiments.length > 0 ? { [insights.sentiments[0].label]: true } : {}
  );

  const toggleFilter = (label) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const toggleSentiment = (label) => {
    setSelectedSentiments((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  return (
    <div className="flex flex-col p-4">
      <Section title="AI Filters">
        <div className="grid grid-cols-2 gap-2">
          {insights.filters.map((f) => {
            const isSelected = selectedFilters[f.label];
            return (
              <Card
                key={f.label}
                interactive
                className={`!rounded-md !border-0 !border-l-2 shadow-subtle flex items-center justify-between !p-3 ${isSelected ? SELECTED_STYLES[f.tone] : 'bg-surface'} ${BORDER_STYLES[f.tone]}`}
                onClick={() => toggleFilter(f.label)}
              >
                <div className="flex items-center gap-2">
                  {isSelected && DOT[f.tone] && (
                    <Check size={14} className={DOT[f.tone].replace('bg-', 'text-')} />
                  )}
                  <span className={`text-caption ${isSelected ? '' : 'text-ink-secondary'}`}>{f.label}</span>
                </div>
                <span className={`text-body-sm font-semibold ${isSelected ? '' : 'text-ink-muted'}`}>{f.count}</span>
              </Card>
            );
          })}
        </div>
      </Section>

      <Section title="Sentiments">
        <div className="flex flex-col gap-2">
          {insights.sentiments.map((s) => {
            const isSelected = selectedSentiments[s.label];
            return (
              <Card
                key={s.label}
                interactive
                className={`!rounded-md !border-0 !border-l-2 shadow-subtle flex items-center justify-between !p-3 ${isSelected ? SELECTED_STYLES[s.tone] : 'bg-surface'} ${BORDER_STYLES[s.tone]}`}
                onClick={() => toggleSentiment(s.label)}
              >
                <div className="flex items-center gap-2">
                  {isSelected && DOT[s.tone] && (
                    <Check size={14} className={DOT[s.tone].replace('bg-', 'text-')} />
                  )}
                  <span className={`text-caption ${isSelected ? '' : 'text-ink-secondary'}`}>{s.label}</span>
                </div>
                <span className={`text-body-sm font-semibold ${isSelected ? '' : 'text-ink-muted'}`}>{s.value}%</span>
              </Card>
            );
          })}
        </div>
      </Section>

      <Section title="Speaker Talktime" defaultOpen={false}>
        <div className="flex items-center justify-between pb-2 pt-1">
          <span className="text-[12px] font-medium uppercase tracking-wide text-[#98a2b3] w-1/2">Speakers</span>
          <span className="text-[12px] font-medium uppercase tracking-wide text-[#98a2b3] w-[20%]">WPM</span>
          <span className="text-[12px] font-medium uppercase tracking-wide text-[#98a2b3] w-[30%] text-right">Talktime</span>
        </div>
        <div className="flex flex-col gap-2">
          {insights.talktime.map((t) => (
            <Card key={t.name} className="!rounded-md !border-0 shadow-subtle flex items-center justify-between !p-3 bg-surface">
              <div className="flex items-center gap-3 w-1/2 min-w-0">
                <Avatar name={t.name} size="xs" />
                <p className="truncate text-[12px] text-[#344054]">{t.name}</p>
              </div>
              <div className="flex items-center gap-2 w-[20%]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#fca5a5]" aria-hidden />
                <span className="text-[12px] text-[#475467] tabular-nums">{t.wpm}</span>
              </div>
              <div className="flex items-center gap-2 w-[30%] justify-end">
                <svg width="20" height="20" viewBox="0 0 24 24" className="text-brand-soft">
                  <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="4" />
                  <circle cx="12" cy="12" r="8" fill="none" stroke="var(--brand)" strokeWidth="4" strokeDasharray={`${(t.pct / 100) * 50.26} 50.26`} strokeDashoffset="0" transform="rotate(-90 12 12)" />
                </svg>
                <span className="text-[12px] text-[#475467] tabular-nums">{t.pct}%</span>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="Topic Trackers" extraAction={<Plus size={16} />}>
        <div className="flex flex-col items-center justify-center py-2 text-center">
          <div className="mb-3 flex h-8 w-8 items-center justify-center rounded border border-line bg-surface">
            <span className="text-warning text-body-sm">#</span>
          </div>
          <p className="text-body-sm font-medium text-ink">No topic tracker</p>
          <p className="mt-1.5 text-caption text-ink-secondary leading-relaxed">This meeting is not transcribed yet to show keywords mentioned in the meeting.</p>
        </div>
      </Section>
    </div>
  );
}

function EmptyPanel({ label }) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-1 px-6 text-center">
      <p className="text-body-sm font-medium text-ink-secondary">Nothing here yet</p>
      <p className="text-caption text-ink-muted">{label} for this meeting will show up here.</p>
    </div>
  );
}

function IndexView() {
  const items = [
    { label: "Key Takeaways", hasMore: true },
    { label: "Notes", hasMore: false },
    { label: "Action items", hasMore: false },
  ];

  return (
    <div className="flex flex-col p-4">
      {items.map((item, i) => (
        <div key={i} className="flex h-12 items-center justify-between px-4 hover:bg-surface-secondary cursor-pointer group rounded-lg">
          <span className="text-[14px] text-ink">{item.label}</span>
          {item.hasMore && (
            <span className="text-ink-muted transition-opacity">
              <MoreHorizontal size={18} />
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

function SoundbitesView() {
  return (
    <div className="flex h-full flex-col items-center gap-6 text-center pt-10 px-4">
      {/* Graphic placeholder */}
      <div className="flex h-[72px] w-[240px] items-center gap-4 rounded-[10px] border border-line bg-surface-subtle p-3 shadow-sm">
        <div className="h-full w-14 rounded-md bg-white shadow-subtle border border-[#f2f4f7]" />
        <div className="flex flex-1 flex-col gap-2">
          <div className="h-2.5 w-full rounded-sm bg-[#eaecf0]" />
          <div className="h-2.5 w-1/2 rounded-sm bg-[#e4f9f2]" />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-[15px] font-medium text-ink">Clip out important moments</h3>
        <p className="text-[13px] text-[#667085] leading-relaxed">Pick your transcript or let Fireflies AI create it for you.</p>
      </div>

      <div className="mt-2 flex w-full flex-col gap-3">
        <Button className="w-full bg-brand hover:bg-[#603ade] text-white flex items-center justify-center gap-2">
          <AudioLines size={16} /> Create Soundbite
        </Button>
        <Button className="w-full bg-[#f4f1ff] !text-brand hover:bg-[#f4f1ff] flex items-center justify-center gap-2">
          <Sparkles size={16} /> AI Soundbite
        </Button>
      </div>
    </div>
  );
}

function CommentsView() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 px-4 py-4 space-y-6">
        {comments.map((c) => (
          <div key={c.id} className="flex gap-3">
            {c.avatar === "F" ? (
              <div className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded bg-[#00826b] text-[11px] font-medium text-white shadow-sm">
                F
              </div>
            ) : (
              <Avatar name={c.author} size="xs" />
            )}
            <div className="flex flex-col gap-1.5 w-full min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[13px] font-semibold text-ink">{c.author}</span>
                <span className="text-[12px] text-ink-muted">&bull;</span>
                <span className="text-[12px] text-info hover:underline cursor-pointer">{c.time}</span>
                <span className="text-[12px] text-ink-muted">&bull; {c.relativeTime}</span>
              </div>
              <p className="text-[13px] text-ink whitespace-pre-wrap leading-relaxed break-words pr-2">{c.content}</p>
              {c.footer && (
                <div className="mt-2 text-[12px] text-ink-muted border-l-2 border-line pl-3 py-1 pr-2">
                  {c.footer}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Sticky footer input */}
      <div className="sticky bottom-0 z-10 shrink-0 border-t border-line bg-surface p-4">
        <div className="flex items-end gap-2.5 rounded-md border border-line bg-surface-subtle p-2 shadow-subtle focus-within:border-brand-soft transition-colors">
          <Avatar name="Philson Philip" size="sm" />
          <textarea
            className="max-h-32 min-h-[20px] w-full bg-transparent text-[13px] text-ink placeholder:text-ink-muted focus:outline-none"
            placeholder="Comment..."
            rows={3}
          />
          <button className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[5px] bg-[#e6ddfe] text-brand hover:bg-[#d9ccfd] transition-colors">
            <ArrowUp size={16} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  );
}

const BOOKMARK_TONES = {
  info: { border: "border-l-[2px] border-t-0 border-b-0 border-r-0 !border-info", text: "text-info", Icon: Star },
  success: { border: "border-l-[2px] border-t-0 border-b-0 border-r-0 !border-success", text: "text-success", Icon: ThumbsUp },
  danger: { border: "border-l-[2px] border-t-0 border-b-0 border-r-0 !border-danger", text: "text-danger", Icon: ThumbsDown },
};

function BookmarksView() {
  return (
    <div className="flex flex-col gap-4 p-4">
      {bookmarks.map((b) => {
        const style = BOOKMARK_TONES[b.tone] || { border: "border-l-[2px] border-line", text: "text-ink-secondary", Icon: null };
        const Icon = style.Icon;
        return (
          <Card key={b.id} className={`!rounded-[10px] overflow-hidden flex flex-col gap-3 p-4 bg-surface ${style.border} shadow-subtle border-t border-r border-b border-line`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {Icon && <Icon size={14} className={style.text} />}
                <span className={`text-[13px] font-medium ${style.text}`}>{b.type}</span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="text-[14px] font-medium text-ink">{b.title}</h4>
              <p className="text-[13px] text-[#475467] leading-relaxed line-clamp-4">{b.content}</p>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[12px] text-info border-b border-transparent hover:border-brand hover:text-brand transition-colors cursor-pointer">{b.time}</span>
              <span className="text-[12px] text-ink-muted">&bull;</span>
              <span className="text-[12px] text-[#98a2b3]">{b.author}</span>
            </div>
          </Card>
        );
      })}
    </div>
  );
}

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
        <input type="checkbox" className="rounded-[4px] border-line text-brand focus:ring-brand focus:ring-offset-0 w-3.5 h-3.5 cursor-pointer" />
        <span className="text-[13px] font-medium text-ink-muted group-hover:text-ink select-none">By me</span>
      </label>
    </div>
  ),
};

export default function CommandPanel({ active, onClose }) {
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
}
