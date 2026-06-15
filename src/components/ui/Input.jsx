import { useId } from "react";
import { AlertCircle } from "lucide-react";
import { cn } from "@lib/utils";
import Typography from "@components/ui/Typography";

const Input = ({ label, helper, error, id, leadingIcon: Leading, trailingAction, className, inputClassName, ...props }) => {
  const reactId = useId();
  const inputId = id || reactId;
  const describedBy = error ? `${inputId}-err` : helper ? `${inputId}-help` : undefined;

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label && (
        <Typography as="label" variant="label" htmlFor={inputId}>
          {label}
        </Typography>
      )}
      <div
        className={cn(
          "flex items-center gap-2 rounded-md border bg-surface-subtle px-3 transition-colors duration-150",
          "focus-within:border-brand focus-within:ring-[3px] focus-within:ring-brand-ring hover:focus-within:border-brand",
          error ? "border-danger" : "border-line hover:border-line-strong"
        )}
      >
        {Leading && <Leading size={16} className="shrink-0 text-ink-muted" aria-hidden />}
        <input
          id={inputId}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={cn(
            "h-10 w-full bg-transparent text-body-sm text-ink outline-none focus:outline-none focus:ring-0 focus-visible:outline-none placeholder:text-ink-muted",
            inputClassName
          )}
          {...props}
        />
        {trailingAction && <span className="shrink-0">{trailingAction}</span>}
      </div>
      {error ? (
        <Typography as="p" variant="caption" tone="text-danger" id={`${inputId}-err`} className="flex items-center gap-1.5">
          <AlertCircle size={13} aria-hidden /> {error}
        </Typography>
      ) : helper ? (
        <Typography as="p" variant="caption" id={`${inputId}-help`}>
          {helper}
        </Typography>
      ) : null}
    </div>
  );
};

export default Input;
