import { useState } from "react";
import { Check, Plus } from "lucide-react";
import Card from "@components/ui/Card";
import Avatar from "@components/ui/Avatar";
import Typography from "@components/ui/Typography";
import { cn } from "@lib/utils";
import { insights, getParticipantImage } from "@data/meeting";
import Section from "@components/meeting/CommandPanel/Section";

const SELECTED_STYLES = {
  neutral: "!bg-surface-muted !text-ink-secondary",
  brand: "!bg-brand-soft !text-brand-active",
  success: "!bg-success-soft !text-success",
  warning: "!bg-warning-soft !text-warning",
  danger: "!bg-danger-soft !text-danger",
  info: "!bg-info-soft !text-info",
};

const TEXT_STYLES = {
  neutral: "text-ink-secondary",
  brand: "text-brand-active",
  success: "text-success",
  warning: "text-warning",
  danger: "text-danger",
  info: "text-info",
};

const ToggleCard = ({ item, selected, onToggle, value }) => (
  <Card
    as="button"
    type="button"
    interactive
    aria-pressed={selected}
    className={cn(
      "!rounded-md shadow-subtle flex items-center justify-between !p-3 text-left w-full !border-0",
      selected ? SELECTED_STYLES[item.tone] : "bg-surface",
      TEXT_STYLES[item.tone]
    )}
    onClick={onToggle}
  >
    <div className="flex items-center gap-2">
      {selected && <Check size={14} className={TEXT_STYLES[item.tone]} />}
      <span className="text-caption font-medium">{item.label}</span>
    </div>
    <span className="text-body-sm font-semibold">{value}</span>
  </Card>
);

const Overview = () => {
  const [selectedFilters, setSelectedFilters] = useState(() =>
    insights.filters.length > 0 ? { [insights.filters[0].label]: true } : {}
  );
  const [selectedSentiments, setSelectedSentiments] = useState(() =>
    insights.sentiments.length > 0 ? { [insights.sentiments[0].label]: true } : {}
  );

  const toggleFilter = (label) =>
    setSelectedFilters((prev) => ({ ...prev, [label]: !prev[label] }));

  const toggleSentiment = (label) =>
    setSelectedSentiments((prev) => ({ ...prev, [label]: !prev[label] }));

  return (
    <div className="flex flex-col p-4">
      <Section title="AI Filters">
        <div className="grid grid-cols-2 gap-2">
          {insights.filters.map((f) => (
            <ToggleCard
              key={f.label}
              item={f}
              selected={selectedFilters[f.label]}
              onToggle={() => toggleFilter(f.label)}
              value={f.count}
            />
          ))}
        </div>
      </Section>

      <Section title="Sentiments">
        <div className="flex flex-col gap-2">
          {insights.sentiments.map((s) => (
            <ToggleCard
              key={s.label}
              item={s}
              selected={selectedSentiments[s.label]}
              onToggle={() => toggleSentiment(s.label)}
              value={`${s.value}%`}
            />
          ))}
        </div>
      </Section>

      <Section title="Speaker Talktime" defaultOpen={false}>
        <div className="flex items-center justify-between pb-2 pt-1">
          <Typography as="span" variant="caption" className="font-medium uppercase tracking-wide w-1/2">Speakers</Typography>
          <Typography as="span" variant="caption" className="font-medium uppercase tracking-wide w-[20%]">WPM</Typography>
          <Typography as="span" variant="caption" className="font-medium uppercase tracking-wide w-[30%] text-right">Talktime</Typography>
        </div>
        <div className="flex flex-col gap-2">
          {insights.talktime.map((t) => (
            <Card key={t.name} className="!rounded-md !border-0 shadow-subtle flex items-center justify-between !p-3 bg-surface">
              <div className="flex items-center gap-3 w-1/2 min-w-0">
                <Avatar name={t.name} imageUrl={getParticipantImage(t.name)} size="xs" />
                <Typography as="p" variant="caption" tone="text-ink" className="truncate">{t.name}</Typography>
              </div>
              <div className="flex items-center gap-2 w-[20%]">
                <span className="h-1.5 w-1.5 rounded-full bg-warning-soft border border-warning/30" aria-hidden />
                <Typography as="span" variant="caption" tone="text-ink-secondary" className="tabular-nums">{t.wpm}</Typography>
              </div>
              <div className="flex items-center gap-2 w-[30%] justify-end">
                <svg width="20" height="20" viewBox="0 0 24 24" className="text-brand-soft">
                  <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="4" />
                  <circle cx="12" cy="12" r="8" fill="none" stroke="var(--brand)" strokeWidth="4" strokeDasharray={`${(t.pct / 100) * 50.26} 50.26`} strokeDashoffset="0" transform="rotate(-90 12 12)" />
                </svg>
                <Typography as="span" variant="caption" tone="text-ink-secondary" className="tabular-nums">{t.pct}%</Typography>
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
          <Typography as="p" variant="body-sm" tone="text-ink" className="font-medium">No topic tracker</Typography>
          <Typography as="p" variant="caption" tone="text-ink-secondary" className="mt-1.5 leading-relaxed">
            This meeting is not transcribed yet to show keywords mentioned in the meeting.
          </Typography>
        </div>
      </Section>
    </div>
  );
};

export default Overview;
