import React from "react";
import ReactDOM from "react-dom";
import "./Modal.css";

// ─── Types ──────────────────────────────────────────────────────────────────

export type ModalSize = "sm" | "md" | "lg" | "fullscreen";

export interface ModalProps {
  /** Controlled open state */
  open:        boolean;
  /** Called when backdrop or close button clicked */
  onClose:     () => void;
  /** Dialog title */
  title?:      React.ReactNode;
  /** Footer content (typically action buttons) */
  footer?:     React.ReactNode;
  /** Show close button in header */
  closable?:   boolean;
  /** Size preset */
  size?:       ModalSize;
  /** Prevent closing by clicking backdrop */
  maskClosable?: boolean;
  /** Additional class for the dialog panel */
  className?:  string;
  children?:   React.ReactNode;
  /** Custom z-index */
  zIndex?:     number;
}

// ─── Component ──────────────────────────────────────────────────────────────

/**
 * Modal — Douyin Delight UI Kit
 * Portal-based modal dialog with backdrop.
 */
export const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  title,
  footer,
  closable     = true,
  size         = "md",
  maskClosable = true,
  className    = "",
  children,
  zIndex       = 400,
}) => {
  // Lock body scroll when open
  React.useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = prev; };
    }
  }, [open]);

  // Close on Escape
  React.useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const dialog = (
    <div
      className="dux-modal-root"
      style={{ zIndex }}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "dux-modal-title" : undefined}
    >
      {/* Backdrop */}
      <div
        className="dux-modal-backdrop"
        onClick={maskClosable ? onClose : undefined}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        className={[
          "dux-modal-panel",
          `dux-modal-panel--${size}`,
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        onClick={(e) => e.stopPropagation()}
      >
        {(title || closable) && (
          <div className="dux-modal__header">
            {title && (
              <h2 id="dux-modal-title" className="dux-modal__title">
                {title}
              </h2>
            )}
            {closable && (
              <button
                type="button"
                className="dux-modal__close"
                onClick={onClose}
                aria-label="Close"
              >
                <CloseIcon />
              </button>
            )}
          </div>
        )}

        <div className="dux-modal__body">{children}</div>

        {footer && <div className="dux-modal__footer">{footer}</div>}
      </div>
    </div>
  );

  return ReactDOM.createPortal(dialog, document.body);
};

Modal.displayName = "Modal";

// ─── Icons ───────────────────────────────────────────────────────────────────
function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M5 5L15 15M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export default Modal;
