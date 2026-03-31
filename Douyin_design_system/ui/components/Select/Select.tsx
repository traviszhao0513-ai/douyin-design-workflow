import React from "react";
import "./Select.css";

// ─── Types ──────────────────────────────────────────────────────────────────

export interface SelectOption {
  label:     React.ReactNode;
  value:     string;
  disabled?: boolean;
  icon?:     React.ReactNode;
}

export type SelectSize    = "sm" | "md" | "lg";
export type SelectVariant = "outlined" | "filled";

export interface SelectProps {
  options:      SelectOption[];
  value?:       string;
  defaultValue?: string;
  onChange?:    (value: string) => void;
  placeholder?: string;
  size?:        SelectSize;
  variant?:     SelectVariant;
  disabled?:    boolean;
  status?:      "default" | "error" | "warning";
  label?:       React.ReactNode;
  helperText?:  React.ReactNode;
  prefix?:      React.ReactNode;
  clearable?:   boolean;
  onClear?:     () => void;
  className?:   string;
  id?:          string;
}

// ─── Component ──────────────────────────────────────────────────────────────

/**
 * Select — Douyin Delight UI Kit
 * Custom dropdown select with keyboard navigation.
 */
export const Select: React.FC<SelectProps> = ({
  options,
  value,
  defaultValue,
  onChange,
  placeholder  = "请选择",
  size         = "md",
  variant      = "outlined",
  disabled     = false,
  status       = "default",
  label,
  helperText,
  prefix,
  clearable    = false,
  onClear,
  className    = "",
  id,
}) => {
  const [open, setOpen]             = React.useState(false);
  const [internalVal, setInternal]  = React.useState(defaultValue ?? "");
  const containerRef                = React.useRef<HTMLDivElement>(null);
  const inputId                     = id ?? `dux-select-${React.useId()}`;

  const current  = value !== undefined ? value : internalVal;
  const selected = options.find((o) => o.value === current);

  const handleSelect = (opt: SelectOption) => {
    if (opt.disabled) return;
    setInternal(opt.value);
    onChange?.(opt.value);
    setOpen(false);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setInternal("");
    onChange?.("");
    onClear?.();
  };

  // Close on outside click
  React.useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  // Keyboard: Escape closes
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape")     setOpen(false);
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setOpen((p) => !p); }
    if (e.key === "ArrowDown")  { e.preventDefault(); setOpen(true); }
  };

  const triggerClasses = [
    "dux-select__trigger",
    `dux-select__trigger--${variant}`,
    `dux-select__trigger--${size}`,
    `dux-select__trigger--${status}`,
    open     ? "dux-select__trigger--open"     : "",
    disabled ? "dux-select__trigger--disabled" : "",
    !selected ? "dux-select__trigger--placeholder" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={["dux-select-field", className].filter(Boolean).join(" ")}
      ref={containerRef}
    >
      {label && (
        <label className="dux-select__label" htmlFor={inputId}>
          {label}
        </label>
      )}

      <div className="dux-select__container">
        <button
          id={inputId}
          type="button"
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-disabled={disabled}
          className={triggerClasses}
          onClick={() => !disabled && setOpen((p) => !p)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
        >
          {prefix && (
            <span className="dux-select__prefix" aria-hidden="true">{prefix}</span>
          )}
          <span className="dux-select__value">
            {selected ? (
              <span className="dux-select__selected">
                {selected.icon && (
                  <span className="dux-select__option-icon" aria-hidden="true">
                    {selected.icon}
                  </span>
                )}
                {selected.label}
              </span>
            ) : (
              <span className="dux-select__placeholder">{placeholder}</span>
            )}
          </span>

          {clearable && selected && !disabled && (
            <button
              type="button"
              className="dux-select__clear"
              onClick={handleClear}
              tabIndex={-1}
              aria-label="Clear selection"
            >
              <ClearIcon />
            </button>
          )}

          <span className="dux-select__arrow" aria-hidden="true">
            <ChevronIcon open={open} />
          </span>
        </button>

        {open && (
          <ul
            role="listbox"
            className="dux-select__dropdown"
          >
            {options.map((opt) => (
              <li
                key={opt.value}
                role="option"
                aria-selected={opt.value === current}
                aria-disabled={opt.disabled}
                className={[
                  "dux-select__option",
                  opt.value === current ? "dux-select__option--selected" : "",
                  opt.disabled          ? "dux-select__option--disabled" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                onClick={() => handleSelect(opt)}
              >
                {opt.icon && (
                  <span className="dux-select__option-icon" aria-hidden="true">
                    {opt.icon}
                  </span>
                )}
                <span className="dux-select__option-label">{opt.label}</span>
                {opt.value === current && <CheckIcon />}
              </li>
            ))}
          </ul>
        )}
      </div>

      {helperText && (
        <p className={`dux-select__helper dux-select__helper--${status}`}>
          {helperText}
        </p>
      )}
    </div>
  );
};

Select.displayName = "Select";

// ─── Icons ───────────────────────────────────────────────────────────────────
function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"
      style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 200ms" }}
    >
      <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M2.5 7L5.5 10L11.5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ClearIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <circle cx="7" cy="7" r="6" fill="currentColor" fillOpacity="0.2" />
      <line x1="4.5" y1="4.5" x2="9.5" y2="9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="9.5" y1="4.5" x2="4.5" y2="9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export default Select;
