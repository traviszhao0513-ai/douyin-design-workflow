import React from "react";
import "./Divider.css";

// ─── Types ──────────────────────────────────────────────────────────────────

export type DividerOrientation = "horizontal" | "vertical";
export type DividerWeight      = "light" | "medium" | "strong";
export type DividerLabelAlign  = "start" | "center" | "end";

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?:  DividerOrientation;
  weight?:       DividerWeight;
  /** Optional label displayed in the divider */
  label?:        React.ReactNode;
  labelAlign?:   DividerLabelAlign;
  /** Margin preset (applies only to horizontal) */
  spacing?:      "none" | "sm" | "md" | "lg";
}

// ─── Component ──────────────────────────────────────────────────────────────

/**
 * Divider — Douyin Delight UI Kit
 */
export const Divider: React.FC<DividerProps> = ({
  orientation = "horizontal",
  weight      = "light",
  label,
  labelAlign  = "center",
  spacing     = "md",
  className   = "",
  ...rest
}) => {
  const classes = [
    "dux-divider",
    `dux-divider--${orientation}`,
    `dux-divider--${weight}`,
    orientation === "horizontal" ? `dux-divider--spacing-${spacing}` : "",
    label ? `dux-divider--has-label dux-divider--label-${labelAlign}` : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={classes}
      role="separator"
      aria-orientation={orientation}
      {...rest}
    >
      {label && (
        <span className="dux-divider__label">{label}</span>
      )}
    </div>
  );
};

Divider.displayName = "Divider";

export default Divider;
