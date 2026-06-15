import { ChevronsLeft } from "lucide-react";
import IconButton from "../../ui/IconButton";
import Typography from "../../ui/Typography";

const PANEL_WIDTH = "w-80";

const PanelShell = ({ title, heading, action, onClose, children }) => {
  const display = heading || title;
  return (
    <aside
      aria-label={`${title} panel`}
      className={`${PANEL_WIDTH} group relative flex shrink-0 flex-col border-r border-line bg-surface-subtle`}
    >
      <div className="flex h-12 shrink-0 items-center justify-between border-b border-line px-4">
        {typeof display === "string" ? (
          <Typography variant="h4" as="h2" className="capitalize tracking-wide">{display}</Typography>
        ) : (
          <Typography as="div" variant="body" tone="text-ink" className="font-semibold capitalize tracking-wide">{display}</Typography>
        )}
        {action}
      </div>
      <div className="absolute -right-9 top-2 z-50 opacity-0 group-hover:opacity-100 transition-opacity">
        <IconButton label="Close panel" onClick={onClose} size="sm" className="border border-line bg-surface shadow-subtle hover:bg-surface-subtle">
          <ChevronsLeft size={20} aria-hidden />
        </IconButton>
      </div>
      <div className="scroll-thin flex-1 overflow-y-auto">{children}</div>
    </aside>
  );
};

export default PanelShell;
