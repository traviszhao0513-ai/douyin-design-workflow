import React from "react";
import "./Checkbox.css";

// ─── Types ──────────────────────────────────────────────────────────────────

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  /** Label text */
  label?: React.ReactNode;
  /** Indeterminate state (partial selection) */
  indeterminate?: boolean;
  /** Size preset */
  size?: "sm" | "md";
}

// ─── Component ──────────────────────────────────────────────────────────────

/**
 * Checkbox — Douyin Delight UI Kit
 */
export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      indeterminate = false,
      size          = "md",
      disabled,
      checked,
      className     = "",
      id,
      ...rest
    },
    ref
  ) => {
    const inputId = id ?? `dux-checkbox-${React.useId()}`;
    const inputRef = React.useRef<HTMLInputElement>(null);

    React.useImperativeHandle(ref, () => inputRef.current!);

    React.useEffect(() => {
      if (inputRef.current) {
        inputRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate]);

    const wrapperClasses = [
      "dux-checkbox",
      `dux-checkbox--${size}`,
      disabled      ? "dux-checkbox--disabled"       : "",
      checked       ? "dux-checkbox--checked"         : "",
      indeterminate ? "dux-checkbox--indeterminate"   : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <label className={wrapperClasses} htmlFor={inputId}>
        <span className="dux-checkbox__control">
          <input
            ref={inputRef}
            id={inputId}
            type="checkbox"
            className="dux-checkbox__native"
            checked={checked}
            disabled={disabled}
            {...rest}
          />
          <span className="dux-checkbox__box" aria-hidden="true">
            {indeterminate ? <MinusIcon /> : <CheckIcon />}
          </span>
        </span>
        {label && <span className="dux-checkbox__label">{label}</span>}
      </label>
    );
  }
);

Checkbox.displayName = "Checkbox";

// ─── CheckboxGroup ───────────────────────────────────────────────────────────

export interface CheckboxGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  value?:    string[];
  onChange?: (value: string[]) => void;
  disabled?: boolean;
  direction?: "horizontal" | "vertical";
}

export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  value     = [],
  onChange,
  disabled  = false,
  direction = "vertical",
  children,
  className = "",
  ...rest
}) => {
  const handleChange = (itemValue: string, checked: boolean) => {
    if (!onChange) return;
    const next = checked
      ? [...value, itemValue]
      : value.filter((v) => v !== itemValue);
    onChange(next);
  };

  return (
    <div
      className={[
        "dux-checkbox-group",
        `dux-checkbox-group--${direction}`,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      role="group"
      {...rest}
    >
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;
        const v = (child.props as CheckboxProps).value as string | undefined;
        if (v === undefined) return child;
        return React.cloneElement(child as React.ReactElement<CheckboxProps>, {
          checked:  value.includes(v),
          disabled: disabled || (child.props as CheckboxProps).disabled,
          onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
            handleChange(v, e.target.checked),
        });
      })}
    </div>
  );
};

CheckboxGroup.displayName = "CheckboxGroup";

// ─── Icons ───────────────────────────────────────────────────────────────────
function CheckIcon() {
  return (
    <svg width="10" height="8" viewBox="0 0 10 8" fill="none" aria-hidden="true">
      <path d="M1 3.5L4 6.5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MinusIcon() {
  return (
    <svg width="10" height="2" viewBox="0 0 10 2" fill="none" aria-hidden="true">
      <line x1="1" y1="1" x2="9" y2="1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export default Checkbox;
