import { useState } from "react";
import { ChevronsLeft, ChevronUp, ChevronDown, Plus, Check } from "lucide-react";
import Badge, { TONES, DOT } from "../ui/Badge";
import Card from "../ui/Card";
import Avatar from "../ui/Avatar";
import IconButton from "../ui/IconButton";
import { RAIL_ITEMS } from "./LeftRail";
import { insights } from "../../data/meeting";

// IMPORTANT: this panel is a fixed 320px regardless of which rail item is
// active. In the live app each tab renders at its own width, so switching
// tabs visibly shifts the whole layout. One width = no jump.
const PANEL_WIDTH = "w-80";

function PanelShell({ title, onClose, children }) {
  return (
    <aside
      aria-label={`${title} panel`}
      className={`${PANEL_WIDTH} group flex shrink-0 flex-col border-r border-line bg-surface-subtle`}
    >
      <div className="flex h-12 shrink-0 items-center justify-between border-b border-line px-4">
        <h2 className="text-[15px] font-medium capitalize tracking-wide text-ink-muted">{title}</h2>
        <IconButton label="Close panel" size="sm" onClick={onClose} className="opacity-0 group-hover:opacity-100 transition-opacity">
          <ChevronsLeft size={18} aria-hidden />
        </IconButton>
      </div>
      <div className="scroll-thin flex-1 overflow-y-auto p-4">{children}</div>
    </aside>
  );
}

function Section({ title, defaultOpen = true, extraAction, children }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <section className="border-b border-line last:border-b-0 py-5 first:pt-0">
      <button
        type="button"
        className="flex w-full items-center justify-between group"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <h3 className="text-caption font-semibold uppercase tracking-wide text-ink-muted">{title}</h3>
        <div className="flex items-center gap-4">
          {extraAction && (
            <div
              className="text-ink-muted hover:text-ink"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              {extraAction}
            </div>
          )}
          <span className="text-ink-muted transition-colors hover:text-ink">
            {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </span>
        </div>
      </button>
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
  const [selectedFilters, setSelectedFilters] = useState({});

  const toggleFilter = (label) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  return (
    <>
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
                  {isSelected && (
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
          {insights.sentiments.map((s) => (
            <Card 
              key={s.label} 
              interactive 
              className={`!rounded-md !border-0 !border-l-2 shadow-subtle flex items-center justify-between !p-3 bg-surface ${BORDER_STYLES[s.tone]}`}
            >
              <div className="flex items-center gap-2">
                <span className="text-caption text-ink-secondary">{s.label}</span>
              </div>
              <span className="text-body-sm font-semibold text-ink-muted">{s.value}%</span>
            </Card>
          ))}
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
    </>
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

export default function CommandPanel({ active, onClose }) {
  const item = RAIL_ITEMS.find((i) => i.key === active);
  if (!item) return null;

  return (
    <PanelShell title={item.label} onClose={onClose}>
      {active === "search" ? <Overview /> : <EmptyPanel label={item.label} />}
    </PanelShell>
  );
}
