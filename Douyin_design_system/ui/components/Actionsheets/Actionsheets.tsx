import React from "react";
import "./Actionsheets.css";

// ─── Types ──────────────────────────────────────────────────────────────────

export interface ActionsheetItem {
  key:        string;
  label:      React.ReactNode;
  description?: React.ReactNode;
  /** Visual style of the item */
  variant?:   "default" | "destructive" | "disabled";
  onClick?:   () => void;
}

export interface ActionsheetsProps {
  /** Whether the sheet is visible */
  open:        boolean;
  /** List of action items */
  items:       ActionsheetItem[];
  /** Show cancel button at bottom */
  showCancel?: boolean;
  /** Cancel button label */
  cancelLabel?: React.ReactNode;
  onCancel?:   () => void;
  /** Show description under each action */
  showDescription?: boolean;
  /** 模式: 标准 | 沉浸 */
  mode?:       "standard" | "immersive";
  /** Called when the backdrop is clicked */
  onMaskClick?: () => void;
  className?:  string;
}

// ─── Component ──────────────────────────────────────────────────────────────

/**
 * Actionsheets — Douyin Delight UI Kit
 * Bottom action sheet with a list of options and an optional cancel button.
 * Figma node: 46296:5900
 */
export const Actionsheets: React.FC<ActionsheetsProps> = ({
  open,
  items,
  showCancel       = true,
  cancelLabel      = "取消",
  onCancel,
  showDescription  = false,
  mode             = "standard",
  onMaskClick,
  className        = "",
}) => {
  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={[
          "dux-actionsheets-mask",
          mode === "immersive" ? "dux-actionsheets-mask--immersive" : "",
        ]
          .filter(Boolean)
          .join(" ")}
        onClick={onMaskClick}
        aria-hidden="true"
      />

      {/* Sheet */}
      <div
        role="dialog"
        aria-modal="true"
        className={[
          "dux-actionsheets",
          `dux-actionsheets--${mode}`,
          className,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {/* Action list */}
        <ul className="dux-actionsheets__list" role="listbox">
          {items.map((item) => (
            <li key={item.key} role="none">
              <button
                type="button"
                role="option"
                disabled={item.variant === "disabled"}
                className={[
                  "dux-actionsheets__item",
                  item.variant ? `dux-actionsheets__item--${item.variant}` : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                onClick={() => {
                  if (item.variant !== "disabled") item.onClick?.();
                }}
              >
                <span className="dux-actionsheets__item-label">{item.label}</span>
                {showDescription && item.description && (
                  <span className="dux-actionsheets__item-desc">{item.description}</span>
                )}
              </button>
            </li>
          ))}
        </ul>

        {/* Cancel */}
        {showCancel && (
          <>
            <div className="dux-actionsheets__gap" aria-hidden="true" />
            <button
              type="button"
              className="dux-actionsheets__cancel"
              onClick={onCancel}
            >
              {cancelLabel}
            </button>
          </>
        )}
      </div>
    </>
  );
};

Actionsheets.displayName = "Actionsheets";

export default Actionsheets;
