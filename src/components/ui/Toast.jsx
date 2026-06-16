import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { Check, Lightbulb, X } from "lucide-react";
import { cn, uid } from "@lib/utils";
import Typography from "@components/ui/Typography";

const ToastContext = createContext(() => { });
export const useToast = () => useContext(ToastContext);

const VARIANTS = {
  success: { Icon: Check, container: "bg-success-soft border-success", iconBg: "bg-success text-white" },
  info: { Icon: Lightbulb, container: "bg-info-soft border-info", iconBg: "bg-info text-white" },
  warning: { Icon: null, text: "!", container: "bg-warning-soft border-warning", iconBg: "bg-warning text-white" },
  danger: { Icon: X, container: "bg-danger-soft border-danger", iconBg: "bg-danger text-white" },
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const timers = useRef(new Map());

  const dismiss = useCallback((id) => {
    const timer = timers.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timers.current.delete(id);
    }
    setToasts((t) => t.filter((x) => x.id !== id));
  }, []);

  const toast = useCallback(
    ({ title, description, variant = "info", duration = 3500 }) => {
      const id = uid();
      setToasts((t) => [...t, { id, title, description, variant }]);
      if (duration) {
        const timer = setTimeout(() => {
          timers.current.delete(id);
          dismiss(id);
        }, duration);
        timers.current.set(id, timer);
      }
    },
    [dismiss]
  );

  useEffect(() => {
    return () => {
      timers.current.forEach(clearTimeout);
      timers.current.clear();
    };
  }, []);

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div
        className="pointer-events-none fixed bottom-4 right-4 z-[100] flex w-[min(360px,calc(100vw-2rem))] flex-col gap-2"
        role="region"
        aria-label="Notifications"
        aria-live="polite"
        aria-atomic="false"
      >
        {toasts.map((t) => {
          const v = VARIANTS[t.variant] || VARIANTS.info;
          const Icon = v.Icon;
          return (
            <div
              key={t.id}
              className={cn(
                "pointer-events-auto flex items-center gap-3.5 rounded-2xl border px-3 py-2.5 shadow-floating animate-toast-in",
                v.container
              )}
            >
              <div className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-full", v.iconBg)}>
                {Icon ? <Icon size={18} strokeWidth={2.5} /> : <span className="text-lg font-bold leading-none">{v.text}</span>}
              </div>
              <div className="min-w-0 flex-1">
                <Typography as="p" variant="body" tone="text-ink" className="font-bold">
                  {t.title}
                </Typography>
                {t.description && (
                  <Typography as="p" variant="body-sm" tone="text-ink-secondary" className="mt-0.5">
                    {t.description}
                  </Typography>
                )}
              </div>
              <button
                type="button"
                aria-label="Dismiss notification"
                onClick={() => dismiss(t.id)}
                className="shrink-0 rounded p-1 text-ink transition-colors hover:bg-black/5"
              >
                <X size={18} strokeWidth={2} aria-hidden />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};
