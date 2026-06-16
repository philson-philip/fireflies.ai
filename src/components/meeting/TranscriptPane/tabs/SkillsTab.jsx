import { Sparkles } from "lucide-react";
import Card from "@components/ui/Card";
import Typography from "@components/ui/Typography";

const SKILLS = [
  { label: "Candidate scorecard", tone: "brand" },
  { label: "Interview questions", tone: "info" },
  { label: "Candidate insights", tone: "success" },
  { label: "Interview screening", tone: "info" },
  { label: "Behavioral questions", tone: "brand" },
  { label: "Sales call", tone: "success" },
];

const TONE_CLASS = {
  brand: "bg-brand-soft text-brand",
  info: "bg-info-soft text-info",
  success: "bg-success-soft text-success",
};

const SkillsTab = () => (
  <div className="scroll-thin flex-1 overflow-y-auto p-4">
    <div className="mb-3 flex items-center justify-between">
      <Typography as="p" variant="body-sm" className="font-medium">Extract insights from this meeting</Typography>
      <Typography as="span" variant="caption">Uses AI credits</Typography>
    </div>
    <div className="grid grid-cols-2 gap-2">
      {SKILLS.map((s) => (
        <Card key={s.label} interactive className="flex items-center gap-2.5 p-3">
          <span
            className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md ${TONE_CLASS[s.tone]}`}
          >
            <Sparkles size={15} aria-hidden />
          </span>
          <Typography as="span" variant="body-sm" tone="text-ink" className="font-medium">{s.label}</Typography>
        </Card>
      ))}
    </div>
  </div>
);

export default SkillsTab;
