import { X } from "lucide-react";
import { Search } from "lucide-react";
import Input from "../ui/Input";
import Badge from "../ui/Badge";
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
      className={`${PANEL_WIDTH} flex shrink-0 flex-col border-r border-line bg-surface-subtle`}
    >
      <div className="flex h-12 shrink-0 items-center justify-between border-b border-line px-4">
        <h2 className="text-label font-semibold uppercase tracking-wide text-ink-muted">{title}</h2>
        <IconButton label="Close panel" size="sm" onClick={onClose}>
          <X size={15} aria-hidden />
        </IconButton>
      </div>
      <div className="scroll-thin flex-1 overflow-y-auto p-4">{children}</div>
    </aside>
  );
}

function Section({ title, children }) {
  return (
    <section className="mb-6 last:mb-0">
      <h3 className="mb-2.5 text-caption font-semibold uppercase tracking-wide text-ink-muted">{title}</h3>
      {children}
    </section>
  );
}

function Overview() {
  return (
    <>
      <Input leadingIcon={Search} placeholder="Search this meeting" aria-label="Search this meeting" className="mb-6" />

      <Section title="Filters">
        <div className="grid grid-cols-2 gap-2">
          {insights.filters.map((f) => (
            <Card key={f.label} interactive className="flex items-center justify-between p-2.5">
              <span className="text-caption text-ink-secondary">{f.label}</span>
              <span className="text-body-sm font-semibold text-ink">{f.count}</span>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="Sentiment">
        <div className="flex flex-col gap-2">
          {insights.sentiments.map((s) => (
            <div key={s.label} className="flex items-center justify-between">
              <Badge tone={s.tone} dot>
                {s.label}
              </Badge>
              <span className="text-caption font-medium text-ink-secondary">{s.value}%</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Talk time">
        <div className="flex flex-col gap-3">
          {insights.talktime.map((t) => (
            <div key={t.name} className="flex items-center gap-2.5">
              <Avatar name={t.name} size="sm" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-caption font-medium text-ink">{t.name}</p>
                <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-surface-muted">
                  <div className="h-full rounded-full bg-brand" style={{ width: `${t.pct}%` }} />
                </div>
              </div>
              <span className="w-9 text-right text-caption tabular-nums text-ink-muted">{t.pct}%</span>
            </div>
          ))}
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
