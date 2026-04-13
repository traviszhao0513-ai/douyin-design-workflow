import React from "react";
import "./Input.css";

// ─── Types ──────────────────────────────────────────────────────────────────

export type InputSize    = "sm" | "md" | "lg";
export type InputVariant = "outlined" | "filled";
export type InputStatus  = "default" | "success" | "warning" | "error";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "prefix"> {
  /** Size preset */
  size?: InputSize;
  /** Visual variant */
  variant?: InputVariant;
  /** Validation status */
  status?: InputStatus;
  /** Label shown above input */
  label?: React.ReactNode;
  /** Helper / error text shown below input */
  helperText?: React.ReactNode;
  /** Icon or element shown on the left inside the input */
  prefix?: React.ReactNode;
  /** Icon or element shown on the right inside the input */
  suffix?: React.ReactNode;
  /** Clears input when clicked — shows clear icon when value exists */
  allowClear?: boolean;
  /** Controlled clear handler */
  onClear?: () => void;
}

// ─── Component ──────────────────────────────────────────────────────────────

/**
 * Input — Douyin Delight UI Kit
 *
 * Figma node: 83293:121624  (✏️ 通用搜索栏 Search Bars / Form Items)
 * All colors/sizes use CSS Custom Properties from tokens.css — no hardcoded values.
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      size = "md",
      variant = "filled",
      status = "default",
      label,
      helperText,
      prefix,
      suffix,
      allowClear = false,
      onClear,
      value,
      onChange,
      className = "",
      id,
      disabled,
      ...rest
    },
    ref
  ) => {
    const inputId = id ?? `dux-input-${React.useId()}`;

    const showClearBtn =
      allowClear && !disabled && value !== undefined && String(value).length > 0;

    const wrapperClasses = [
      "dux-input-wrapper",
      `dux-input-wrapper--${variant}`,
      `dux-input-wrapper--${size}`,
      `dux-input-wrapper--${status}`,
      disabled ? "dux-input-wrapper--disabled" : "",
      prefix   ? "dux-input-wrapper--has-prefix" : "",
      (suffix || showClearBtn) ? "dux-input-wrapper--has-suffix" : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div className="dux-input-field" data-node-id="83293:121624">
        {label && (
          <label className="dux-input-label" htmlFor={inputId}>
            {label}
          </label>
        )}

        <div className={wrapperClasses}>
          {prefix && (
            <span className="dux-input__prefix" aria-hidden="true">
              {prefix}
            </span>
          )}

          <input
            ref={ref}
            id={inputId}
            className="dux-input__native"
            value={value}
            onChange={onChange}
            disabled={disabled}
            aria-invalid={status === "error"}
            {...rest}
          />

          {showClearBtn && (
            <button
              type="button"
              className="dux-input__clear"
              onClick={onClear}
              tabIndex={-1}
              aria-label="Clear input"
            >
              <ClearIcon />
            </button>
          )}

          {suffix && !showClearBtn && (
            <span className="dux-input__suffix" aria-hidden="true">
              {suffix}
            </span>
          )}
        </div>

        {helperText && (
          <p
            className={`dux-input-helper dux-input-helper--${status}`}
            role={status === "error" ? "alert" : undefined}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

// ─── Search Input variant ────────────────────────────────────────────────────

export interface SearchInputProps extends Omit<InputProps, "prefix" | "variant"> {
  onSearch?: (value: string) => void;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  onSearch,
  onKeyDown,
  ...props
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && onSearch) {
      onSearch((e.currentTarget as HTMLInputElement).value);
    }
    onKeyDown?.(e);
  };

  return (
    <Input
      variant="filled"
      prefix={<SearchIcon />}
      allowClear
      onKeyDown={handleKeyDown}
      data-node-id="83293:121624"
      {...props}
    />
  );
};

SearchInput.displayName = "SearchInput";

// ─── Internal icon helpers ───────────────────────────────────────────────────

function SearchIcon() {
  return (
    <svg
      width="16" height="16" viewBox="0 0 16 16"
      fill="none" xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle
        cx="7" cy="7" r="4.5"
        stroke="currentColor" strokeWidth="1.5"
      />
      <line
        x1="10.5" y1="10.5" x2="14" y2="14"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
      />
    </svg>
  );
}

function ClearIcon() {
  return (
    <svg
      width="16" height="16" viewBox="0 0 16 16"
      fill="none" xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="8" cy="8" r="6" fill="currentColor" fillOpacity="0.2" />
      <line x1="5.5" y1="5.5" x2="10.5" y2="10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="10.5" y1="5.5" x2="5.5" y2="10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export default Input;
