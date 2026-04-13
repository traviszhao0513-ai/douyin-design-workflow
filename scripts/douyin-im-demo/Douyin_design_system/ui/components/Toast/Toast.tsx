import React from "react";
import ReactDOM from "react-dom";
import "./Toast.css";

// ─── Types ──────────────────────────────────────────────────────────────────

export type ToastType = "success" | "error" | "warning" | "info" | "default";

export interface ToastItem {
  id:        string;
  message:   React.ReactNode;
  type?:     ToastType;
  duration?: number;
  action?:   { label: string; onClick: () => void };
}

interface ToastContextValue {
  toast:   (message: React.ReactNode, options?: Omit<ToastItem, "id" | "message">) => void;
  success: (message: React.ReactNode, options?: Omit<ToastItem, "id" | "message" | "type">) => void;
  error:   (message: React.ReactNode, options?: Omit<ToastItem, "id" | "message" | "type">) => void;
  warning: (message: React.ReactNode, options?: Omit<ToastItem, "id" | "message" | "type">) => void;
  info:    (message: React.ReactNode, options?: Omit<ToastItem, "id" | "message" | "type">) => void;
  dismiss: (id: string) => void;
}

// ─── Context ─────────────────────────────────────────────────────────────────

const ToastContext = React.createContext<ToastContextValue | null>(null);

// ─── Provider ────────────────────────────────────────────────────────────────

export interface ToastProviderProps {
  children:   React.ReactNode;
  /** Default auto-dismiss duration in ms (0 = no auto-dismiss) */
  duration?:  number;
  /** Max toasts visible at once */
  maxCount?:  number;
  placement?: "top" | "bottom";
}

export const ToastProvider: React.FC<ToastProviderProps> = ({
  children,
  duration  = 3000,
  maxCount  = 5,
  placement = "bottom",
}) => {
  const [items, setItems] = React.useState<ToastItem[]>([]);

  const dismiss = React.useCallback((id: string) => {
    setItems((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const add = React.useCallback(
    (message: React.ReactNode, options: Omit<ToastItem, "id" | "message"> = {}) => {
      const id     = `toast-${Date.now()}-${Math.random().toString(36).slice(2)}`;
      const dur    = options.duration ?? duration;
      const item   = { id, message, ...options };

      setItems((prev) => {
        const next = [item, ...prev];
        return next.slice(0, maxCount);
      });

      if (dur > 0) {
        setTimeout(() => dismiss(id), dur);
      }
    },
    [duration, maxCount, dismiss]
  );

  const ctx: ToastContextValue = React.useMemo(
    () => ({
      toast:   (msg, opts) => add(msg, opts),
      success: (msg, opts) => add(msg, { ...opts, type: "success" }),
      error:   (msg, opts) => add(msg, { ...opts, type: "error" }),
      warning: (msg, opts) => add(msg, { ...opts, type: "warning" }),
      info:    (msg, opts) => add(msg, { ...opts, type: "info" }),
      dismiss,
    }),
    [add, dismiss]
  );

  return (
    <ToastContext.Provider value={ctx}>
      {children}
      <ToastContainer items={items} placement={placement} onDismiss={dismiss} />
    </ToastContext.Provider>
  );
};

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useToast(): ToastContextValue {
  const ctx = React.useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside <ToastProvider>");
  return ctx;
}

// ─── Container ───────────────────────────────────────────────────────────────

interface ToastContainerProps {
  items:      ToastItem[];
  placement:  "top" | "bottom";
  onDismiss:  (id: string) => void;
}

const ToastContainer: React.FC<ToastContainerProps> = ({
  items,
  placement,
  onDismiss,
}) => {
  if (items.length === 0) return null;

  return ReactDOM.createPortal(
    <div
      className={[
        "dux-toast-container",
        `dux-toast-container--${placement}`,
      ].join(" ")}
      aria-live="polite"
      aria-atomic="false"
    >
      {items.map((item) => (
        <ToastTile key={item.id} item={item} onDismiss={onDismiss} />
      ))}
    </div>,
    document.body
  );
};

// ─── Single tile ─────────────────────────────────────────────────────────────

interface ToastTileProps {
  item:      ToastItem;
  onDismiss: (id: string) => void;
}

const ToastTile: React.FC<ToastTileProps> = ({ item, onDismiss }) => {
  const type = item.type ?? "default";

  return (
    <div
      className={["dux-toast", `dux-toast--${type}`].join(" ")}
      role="alert"
    >
      <span className="dux-toast__icon" aria-hidden="true">
        <ToastIcon type={type} />
      </span>
      <span className="dux-toast__message">{item.message}</span>
      {item.action && (
        <button
          type="button"
          className="dux-toast__action"
          onClick={() => { item.action!.onClick(); onDismiss(item.id); }}
        >
          {item.action.label}
        </button>
      )}
      <button
        type="button"
        className="dux-toast__dismiss"
        onClick={() => onDismiss(item.id)}
        aria-label="Dismiss"
      >
        <DismissIcon />
      </button>
    </div>
  );
};

// ─── Icons ───────────────────────────────────────────────────────────────────

function ToastIcon({ type }: { type: ToastType }) {
  if (type === "success") return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="7" fill="currentColor" fillOpacity=".2" />
      <path d="M4.5 8L7 10.5L11.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
  if (type === "error") return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="7" fill="currentColor" fillOpacity=".2" />
      <path d="M5.5 5.5L10.5 10.5M10.5 5.5L5.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
  if (type === "warning") return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 2L14.5 13H1.5L8 2Z" fill="currentColor" fillOpacity=".2" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <line x1="8" y1="6.5" x2="8" y2="9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="8" cy="11" r="0.75" fill="currentColor" />
    </svg>
  );
  if (type === "info") return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="7" fill="currentColor" fillOpacity=".2" />
      <line x1="8" y1="7" x2="8" y2="11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="8" cy="5" r="0.75" fill="currentColor" />
    </svg>
  );
  return null;
}

function DismissIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M3 3L11 11M11 3L3 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export default ToastProvider;
