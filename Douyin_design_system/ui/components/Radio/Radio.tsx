import React from "react";
import "./Radio.css";

// ─── Types ──────────────────────────────────────────────────────────────────

export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  label?: React.ReactNode;
  size?:  "sm" | "md";
}

// ─── Component ──────────────────────────────────────────────────────────────

/**
 * Radio — Douyin Delight UI Kit
 */
export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      label,
      size      = "md",
      disabled,
      checked,
      className = "",
      id,
      ...rest
    },
    ref
  ) => {
    const inputId = id ?? `dux-radio-${React.useId()}`;

    const wrapperClasses = [
      "dux-radio",
      `dux-radio--${size}`,
      disabled ? "dux-radio--disabled" : "",
      checked  ? "dux-radio--checked"  : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <label className={wrapperClasses} htmlFor={inputId}>
        <span className="dux-radio__control">
          <input
            ref={ref}
            id={inputId}
            type="radio"
            className="dux-radio__native"
            checked={checked}
            disabled={disabled}
            {...rest}
          />
          <span className="dux-radio__dot" aria-hidden="true" />
        </span>
        {label && <span className="dux-radio__label">{label}</span>}
      </label>
    );
  }
);

Radio.displayName = "Radio";

// ─── RadioGroup ───────────────────────────────────────────────────────────────

export interface RadioOption {
  label:     React.ReactNode;
  value:     string;
  disabled?: boolean;
}

export interface RadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  options?:   RadioOption[];
  value?:     string;
  onChange?:  (value: string) => void;
  disabled?:  boolean;
  size?:      "sm" | "md";
  direction?: "horizontal" | "vertical";
  name?:      string;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  options   = [],
  value,
  onChange,
  disabled  = false,
  size      = "md",
  direction = "vertical",
  name,
  children,
  className = "",
  ...rest
}) => {
  const groupName = name ?? `dux-rg-${React.useId()}`;

  return (
    <div
      role="radiogroup"
      className={[
        "dux-radio-group",
        `dux-radio-group--${direction}`,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      {options.map((opt) => (
        <Radio
          key={opt.value}
          name={groupName}
          value={opt.value}
          label={opt.label}
          size={size}
          checked={value === opt.value}
          disabled={disabled || opt.disabled}
          onChange={() => onChange?.(opt.value)}
        />
      ))}
      {children &&
        React.Children.map(children, (child) => {
          if (!React.isValidElement(child)) return child;
          const v = (child.props as RadioProps).value as string | undefined;
          return React.cloneElement(child as React.ReactElement<RadioProps>, {
            name:     groupName,
            size,
            checked:  v !== undefined ? value === v : undefined,
            disabled: disabled || (child.props as RadioProps).disabled,
            onChange:  v ? () => onChange?.(v) : undefined,
          });
        })}
    </div>
  );
};

RadioGroup.displayName = "RadioGroup";

export default Radio;
