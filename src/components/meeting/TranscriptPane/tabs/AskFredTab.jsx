import { Sparkles, ChevronRight, Send } from "lucide-react";
import Card from "@components/ui/Card";
import Input from "@components/ui/Input";
import Button from "@components/ui/Button";
import Typography from "@components/ui/Typography";

const AskFredTab = () => {
  const suggestions = [
    "How does Philson approach the designer-engineer bridge?",
    "What did he build at BigBinary, and what was the impact?",
    "How does he use AI tools in his workflow?",
  ];
  return (
    <div className="flex flex-1 flex-col overflow-hidden px-4 pb-4 pt-3">
      <div className="scroll-thin flex-1 overflow-y-auto">
        <div className="mb-5 flex items-center gap-2">
          <Sparkles size={18} className="text-brand" aria-hidden />
          <Typography as="p" variant="h4">Ask anything about this meeting</Typography>
        </div>
        <div className="flex flex-col gap-2">
          {suggestions.map((s) => (
            <Card key={s} interactive className="flex items-center justify-between gap-2 p-3">
              <Typography as="span" variant="body-sm">{s}</Typography>
              <ChevronRight size={15} className="shrink-0 text-ink-muted" aria-hidden />
            </Card>
          ))}
        </div>
      </div>
      <div className="mt-3 flex items-center gap-2">
        <Input placeholder="Ask anything…" aria-label="Ask Fred a question" className="flex-1" />
        <Button aria-label="Send" className="h-10 w-10 p-0">
          <Send size={16} aria-hidden />
        </Button>
      </div>
    </div>
  );
};

export default AskFredTab;
