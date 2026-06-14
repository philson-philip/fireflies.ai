import { createContext, useCallback, useContext, useState } from "react";
import { CheckCircle2, Info, AlertTriangle, XCircle, X } from "lucide-react";
import { cn } from "../../lib/utils";

const ToastContext = createContext(() => {});
export const useToast = () => useContext(ToastContext);

const VARIANTS = {
  success: { icon: CheckCircle2, ring: "border-l-success", tint: "text-success" },
  info: { icon: Info, ring: "border-l-info", tint: "text-info" },
  warning: { icon: AlertTriangle, ring: "border-l-warning", tint: "text-warning" },
  danger: { icon: XCircle, ring: "border-l-danger", tint: "text-danger" },
};

// Toasts are anchored bottom-right (not centered) and color-coded by
// semantic variant — directly addressing the toaster findings.
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const dismiss = useCallback((id) => {
    setToasts((t) => t.filter((x) => x.id !== id));
  }, []);

  const toast = useCallback(
    ({ title, description, variant = "info", duration = 3500 }) => {
      const id = Math.random().toString(36).slice(2);
      setToasts((t) => [...t, { id, title, description, variant }]);
      if (duration) setTimeout(() => dismiss(id), duration);
    },
    [dismiss]
  );

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div
        className="pointer-events-none fixed bottom-4 right-4 z-[100] flex w-[min(360px,calc(100vw-2rem))] flex-col gap-2"
        role="region"
        aria-label="Notifications"
      >
        {toasts.map((t) => {
          const v = VARIANTS[t.variant] || VARIANTS.info;
          const Icon = v.icon;
          return (
            <div
              key={t.id}
              role="status"
              className={cn(
                "pointer-events-auto flex items-start gap-3 rounded-lg border border-l-4 border-line bg-surface p-3 shadow-floating animate-toast-in",
                v.ring
              )}
            >
              <Icon size={18} className={cn("mt-0.5 shrink-0", v.tint)} aria-hidden />
              <div className="min-w-0 flex-1">
                <p className="text-body-sm font-medium text-ink">{t.title}</p>
                {t.description && <p className="mt-0.5 text-caption text-ink-muted">{t.description}</p>}
              </div>
              <button
                type="button"
                aria-label="Dismiss notification"
                onClick={() => dismiss(t.id)}
                className="-m-1 shrink-0 rounded p-1 text-ink-muted hover:bg-surface-subtle hover:text-ink"
              >
                <X size={14} aria-hidden />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}
