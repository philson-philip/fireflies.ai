import { useId } from "react";
import { AlertCircle } from "lucide-react";
import { cn } from "../../lib/utils";

// Text field with label, helper and error states. Error is conveyed with an
// icon + message, never color alone (WCAG). Helper/error are wired with
// aria-describedby for screen readers.
export default function Input({
  label,
  helper,
  error,
  id,
  leadingIcon: Leading,
  className,
  ...props
}) {
  const reactId = useId();
  const inputId = id || reactId;
  const describedBy = error ? `${inputId}-err` : helper ? `${inputId}-help` : undefined;

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label && (
        <label htmlFor={inputId} className="text-label font-medium text-ink-secondary">
          {label}
        </label>
      )}
      <div
        className={cn(
          "flex items-center gap-2 rounded-md border bg-surface px-3 transition-colors duration-150",
          "focus-within:border-brand focus-within:ring-2 focus-within:ring-brand/20",
          error ? "border-danger" : "border-line hover:border-line-strong"
        )}
      >
        {Leading && <Leading size={16} className="shrink-0 text-ink-muted" aria-hidden />}
        <input
          id={inputId}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className="h-10 w-full bg-transparent text-body-sm text-ink outline-none placeholder:text-ink-muted"
          {...props}
        />
      </div>
      {error ? (
        <p id={`${inputId}-err`} className="flex items-center gap-1.5 text-caption text-danger">
          <AlertCircle size={13} aria-hidden /> {error}
        </p>
      ) : helper ? (
        <p id={`${inputId}-help`} className="text-caption text-ink-muted">
          {helper}
        </p>
      ) : null}
    </div>
  );
}
