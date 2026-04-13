import React from "react";
import "./Toggle.css";

// ─── Types ──────────────────────────────────────────────────────────────────

export type ToggleSize = "sm" | "md" | "lg";

export interface ToggleProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  /** Label shown beside the toggle */
  label?: React.ReactNode;
  /** Size preset */
  size?:  ToggleSize;
  /** Label placement */
  labelPlacement?: "start" | "end";
}

// ─── Component ──────────────────────────────────────────────────────────────

/**
 * Toggle (Switch) — Douyin Delight UI Kit
 */
export const Toggle = React.forwardRef<HTMLInputElement, ToggleProps>(
  (
    {
      label,
      size           = "md",
      labelPlacement = "end",
      disabled,
      checked,
      className      = "",
      id,
      ...rest
    },
    ref
  ) => {
    const inputId = id ?? `dux-toggle-${React.useId()}`;

    const wrapperClasses = [
      "dux-toggle",
      `dux-toggle--${size}`,
      labelPlacement === "start" ? "dux-toggle--label-start" : "",
      disabled ? "dux-toggle--disabled" : "",
      checked  ? "dux-toggle--checked"  : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <label className={wrapperClasses} htmlFor={inputId}>
        {label && labelPlacement === "start" && (
          <span className="dux-toggle__label">{label}</span>
        )}
        <span className="dux-toggle__track">
          <input
            ref={ref}
            id={inputId}
            type="checkbox"
            role="switch"
            className="dux-toggle__native"
            checked={checked}
            disabled={disabled}
            aria-checked={checked}
            {...rest}
          />
          <span className="dux-toggle__thumb" aria-hidden="true" />
        </span>
        {label && labelPlacement === "end" && (
          <span className="dux-toggle__label">{label}</span>
        )}
      </label>
    );
  }
);

Toggle.displayName = "Toggle";

export default Toggle;
