import React from "react";
import "./Button.css";

// ─── Types ──────────────────────────────────────────────────────────────────

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type ButtonSize    = "sm" | "md" | "lg";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style variant */
  variant?: ButtonVariant;
  /** Size preset */
  size?: ButtonSize;
  /** Full-width block button */
  block?: boolean;
  /** Show loading spinner and disable interaction */
  loading?: boolean;
  /** Icon placed before label */
  prefixIcon?: React.ReactNode;
  /** Icon placed after label */
  suffixIcon?: React.ReactNode;
}

// ─── Component ──────────────────────────────────────────────────────────────

/**
 * Button — Douyin Delight UI Kit
 *
 * Figma node: 46277:3931  (⚙️ 按钮 Buttons — Douyin Delight Variants)
 * All colors/sizes use CSS Custom Properties from tokens.css — no hardcoded values.
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      block = false,
      loading = false,
      prefixIcon,
      suffixIcon,
      disabled,
      children,
      className = "",
      ...rest
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    const classes = [
      "dux-btn",
      `dux-btn--${variant}`,
      `dux-btn--${size}`,
      block   ? "dux-btn--block"   : "",
      loading ? "dux-btn--loading" : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <button
        ref={ref}
        className={classes}
        disabled={isDisabled}
        aria-busy={loading}
        data-node-id="46277:3931"
        {...rest}
      >
        {loading && (
          <span className="dux-btn__spinner" aria-hidden="true" />
        )}
        {!loading && prefixIcon && (
          <span className="dux-btn__icon dux-btn__icon--prefix">{prefixIcon}</span>
        )}
        {children && <span className="dux-btn__label">{children}</span>}
        {!loading && suffixIcon && (
          <span className="dux-btn__icon dux-btn__icon--suffix">{suffixIcon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
