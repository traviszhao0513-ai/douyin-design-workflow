import React from "react";
import "./Badge.css";

// ─── Badge ───────────────────────────────────────────────────────────────────

export type BadgeColor = "primary" | "danger" | "success" | "warning" | "neutral";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Numeric count — renders a number badge */
  count?: number;
  /** Render as a dot (no number) */
  dot?: boolean;
  /** Max count before showing "{max}+" */
  max?: number;
  /** Color variant */
  color?: BadgeColor;
  /** Show badge even when count is 0 */
  showZero?: boolean;
  /** Wrap a child element — badge is positioned top-right */
  children?: React.ReactNode;
}

/**
 * Badge — Douyin Delight UI Kit
 * Wraps children with a positional badge, or renders inline when no children.
 */
export const Badge: React.FC<BadgeProps> = ({
  count,
  dot = false,
  max = 99,
  color = "danger",
  showZero = false,
  children,
  className = "",
  ...rest
}) => {
  const hasCount = count !== undefined;
  const visible  = dot || (hasCount && (showZero || count! > 0));

  const displayText = dot
    ? undefined
    : count! > max
    ? `${max}+`
    : String(count);

  const badgeEl = visible ? (
    <span
      className={[
        "dux-badge",
        dot ? "dux-badge--dot" : "dux-badge--count",
        `dux-badge--${color}`,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      aria-label={hasCount ? `${count} notifications` : undefined}
      {...(!children ? rest : {})}
    >
      {displayText}
    </span>
  ) : null;

  if (!children) return badgeEl;

  return (
    <span className="dux-badge-wrapper" {...rest}>
      {children}
      {badgeEl}
    </span>
  );
};

Badge.displayName = "Badge";

// ─── Tag ─────────────────────────────────────────────────────────────────────

export type TagColor   = "default" | "primary" | "success" | "warning" | "danger" | "purple" | "cyan";
export type TagVariant = "filled" | "outlined" | "ghost";

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  color?:     TagColor;
  variant?:   TagVariant;
  closable?:  boolean;
  onClose?:   (e: React.MouseEvent) => void;
  icon?:      React.ReactNode;
  size?:      "sm" | "md";
  disabled?:  boolean;
}

/**
 * Tag — Douyin Delight UI Kit
 * Chip/label component for categories, status labels, and filters.
 */
export const Tag: React.FC<TagProps> = ({
  color    = "default",
  variant  = "ghost",
  closable = false,
  onClose,
  icon,
  size     = "md",
  disabled = false,
  children,
  className = "",
  ...rest
}) => {
  const classes = [
    "dux-tag",
    `dux-tag--${color}`,
    `dux-tag--${variant}`,
    `dux-tag--${size}`,
    disabled ? "dux-tag--disabled" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={classes} {...rest}>
      {icon && <span className="dux-tag__icon" aria-hidden="true">{icon}</span>}
      <span className="dux-tag__label">{children}</span>
      {closable && !disabled && (
        <button
          type="button"
          className="dux-tag__close"
          onClick={onClose}
          aria-label="Remove tag"
          tabIndex={-1}
        >
          <CloseIcon />
        </button>
      )}
    </span>
  );
};

Tag.displayName = "Tag";

// ─── Internal Icons ───────────────────────────────────────────────────────────
function CloseIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
      <line x1="1.5" y1="1.5" x2="8.5" y2="8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="8.5" y1="1.5" x2="1.5" y2="8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export default Badge;
