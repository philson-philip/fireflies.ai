import { AudioLines, Sparkles } from "lucide-react";
import Button from "../../../ui/Button";
import Typography from "../../../ui/Typography";

const SoundbitesView = () => (
  <div className="flex h-full flex-col items-center gap-6 text-center pt-10 px-4">
    <div className="flex h-[72px] w-[240px] items-center gap-4 rounded-xl border border-line bg-surface-subtle p-3 shadow-subtle">
      <div className="h-full w-14 rounded-md bg-surface shadow-subtle border border-line" />
      <div className="flex flex-1 flex-col gap-2">
        <div className="h-2.5 w-full rounded-sm bg-line" />
        <div className="h-2.5 w-1/2 rounded-sm bg-success-soft" />
      </div>
    </div>

    <div className="flex flex-col gap-2">
      <Typography as="h3" variant="body" tone="text-ink" className="font-medium">Clip out important moments</Typography>
      <Typography as="p" variant="label" tone="text-ink-muted" className="leading-relaxed">
        Pick your transcript or let Fireflies AI create it for you.
      </Typography>
    </div>

    <div className="mt-2 flex w-full flex-col gap-3">
      <Button className="w-full flex items-center justify-center gap-2">
        <AudioLines size={16} /> Create Soundbite
      </Button>
      <Button variant="secondary" className="w-full bg-brand-soft text-brand hover:bg-brand-soft flex items-center justify-center gap-2">
        <Sparkles size={16} /> AI Soundbite
      </Button>
    </div>
  </div>
);

export default SoundbitesView;
