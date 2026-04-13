import React from "react";
import "./Form.css";

// ─── Types ──────────────────────────────────────────────────────────────────

export type FormLayout    = "vertical" | "horizontal" | "inline";
export type FormItemStyle = "single" | "multi-field";

export interface FormRule {
  required?:  boolean;
  message?:   string;
  pattern?:   RegExp;
  validator?: (value: unknown) => string | undefined;
}

export interface FormFieldProps {
  name:         string;
  label?:       React.ReactNode;
  hint?:        React.ReactNode;
  rules?:       FormRule[];
  children:     React.ReactElement;
  error?:       string;
  required?:    boolean;
  className?:   string;
}

export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  /** Layout direction */
  layout?:      FormLayout;
  /** Single-field or multi-field */
  formStyle?:   FormItemStyle;
  /** Whether to show the form title */
  showTitle?:   boolean;
  title?:       React.ReactNode;
  children:     React.ReactNode;
  onFinish?:    (values: Record<string, unknown>) => void;
  className?:   string;
}

// ─── FormField ───────────────────────────────────────────────────────────────

/**
 * A single labeled form field row. Wraps any input-like child.
 */
export const FormField: React.FC<FormFieldProps> = ({
  name,
  label,
  hint,
  rules,
  children,
  error,
  required = false,
  className = "",
}) => {
  const hasRequired = required || rules?.some((r) => r.required);
  const fieldId     = `dux-form-field-${name}`;

  const child = React.cloneElement(children, {
    id:             fieldId,
    "aria-describedby": hint ? `${fieldId}-hint` : undefined,
    "aria-invalid":     error ? true : undefined,
  } as React.HTMLAttributes<HTMLElement>);

  return (
    <div
      className={[
        "dux-form-field",
        error     ? "dux-form-field--error"    : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {label && (
        <label htmlFor={fieldId} className="dux-form-field__label">
          {hasRequired && (
            <span className="dux-form-field__required" aria-hidden="true">*</span>
          )}
          {label}
        </label>
      )}

      <div className="dux-form-field__control">{child}</div>

      {hint && !error && (
        <span id={`${fieldId}-hint`} className="dux-form-field__hint">
          {hint}
        </span>
      )}
      {error && (
        <span role="alert" className="dux-form-field__error">
          {error}
        </span>
      )}
    </div>
  );
};

FormField.displayName = "FormField";

// ─── Form ────────────────────────────────────────────────────────────────────

/**
 * Form — Douyin Delight UI Kit
 * Vertical multi-field form with optional title, labels, hints, and validation errors.
 * Figma node: 46290:22693
 */
export const Form: React.FC<FormProps> = ({
  layout     = "vertical",
  formStyle  = "multi-field",
  showTitle  = true,
  title,
  children,
  onFinish,
  onSubmit,
  className  = "",
  ...rest
}) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit?.(e);
    if (onFinish) {
      const data = new FormData(e.currentTarget);
      const values: Record<string, unknown> = {};
      data.forEach((val, key) => { values[key] = val; });
      onFinish(values);
    }
  };

  return (
    <form
      className={[
        "dux-form",
        `dux-form--${layout}`,
        `dux-form--${formStyle}`,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      onSubmit={handleSubmit}
      {...rest}
    >
      {showTitle && title && (
        <div className="dux-form__title">{title}</div>
      )}
      <div className="dux-form__fields">{children}</div>
    </form>
  );
};

Form.displayName = "Form";

export default Form;
