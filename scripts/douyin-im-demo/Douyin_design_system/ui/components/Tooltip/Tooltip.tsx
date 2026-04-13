import React from "react";
import "./Tooltip.css";

// ─── Types ──────────────────────────────────────────────────────────────────

export type TooltipPlacement = "top" | "bottom" | "left" | "right";
export type TooltipTrigger   = "hover" | "click" | "focus";

export interface TooltipProps {
  /** Tooltip content */
  content:    React.ReactNode;
  /** Placement relative to the trigger element */
  placement?: TooltipPlacement;
  /** How the tooltip is triggered */
  trigger?:   TooltipTrigger;
  /** Delay before showing (ms) */
  delay?:     number;
  /** Disabled — tooltip never shows */
  disabled?:  boolean;
  /** Max width of the tooltip box */
  maxWidth?:  string | number;
  children:   React.ReactElement;
}

// ─── Component ──────────────────────────────────────────────────────────────

/**
 * Tooltip — Douyin Delight UI Kit
 * CSS-positioned tooltip using a wrapper span.
 */
export const Tooltip: React.FC<TooltipProps> = ({
  content,
  placement = "top",
  trigger   = "hover",
  delay     = 0,
  disabled  = false,
  maxWidth  = 240,
  children,
}) => {
  const [visible, setVisible] = React.useState(false);
  const timerRef              = React.useRef<ReturnType<typeof setTimeout>>();

  const show = () => {
    if (disabled) return;
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setVisible(true), delay);
  };

  const hide = () => {
    clearTimeout(timerRef.current);
    setVisible(false);
  };

  const toggle = () => (visible ? hide() : show());

  React.useEffect(() => () => clearTimeout(timerRef.current), []);

  const triggerProps: React.HTMLAttributes<HTMLElement> = {};

  if (trigger === "hover") {
    triggerProps.onMouseEnter = show;
    triggerProps.onMouseLeave = hide;
  } else if (trigger === "click") {
    triggerProps.onClick = toggle;
  } else if (trigger === "focus") {
    triggerProps.onFocus = show;
    triggerProps.onBlur  = hide;
  }

  const child = React.cloneElement(children, {
    ...triggerProps,
    "aria-describedby": visible ? "dux-tooltip" : undefined,
  } as React.HTMLAttributes<HTMLElement>);

  return (
    <span className="dux-tooltip-wrapper">
      {child}
      {visible && content && (
        <span
          id="dux-tooltip"
          role="tooltip"
          className={["dux-tooltip", `dux-tooltip--${placement}`].join(" ")}
          style={{
            maxWidth: typeof maxWidth === "number" ? `${maxWidth}px` : maxWidth,
          }}
        >
          {content}
          <span className="dux-tooltip__arrow" aria-hidden="true" />
        </span>
      )}
    </span>
  );
};

Tooltip.displayName = "Tooltip";

export default Tooltip;
