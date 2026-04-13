import React from "react";
import "./Card.css";

// ─── Types ──────────────────────────────────────────────────────────────────

export type CardVariant  = "elevated" | "outlined" | "filled";
export type CardSize     = "sm" | "md" | "lg";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Visual variant */
  variant?: CardVariant;
  /** Internal padding preset */
  size?: CardSize;
  /** Hover + click interaction; adds cursor:pointer and lift effect */
  clickable?: boolean;
  /** Stretch to fill parent width */
  block?: boolean;
  /** Cover image shown at the top of the card */
  cover?: React.ReactNode;
  /** Card header: title and optional extra action */
  header?: {
    title:    React.ReactNode;
    subtitle?: React.ReactNode;
    extra?:   React.ReactNode;
  };
  /** Card footer content */
  footer?: React.ReactNode;
}

// ─── Component ──────────────────────────────────────────────────────────────

/**
 * Card — Douyin Delight UI Kit
 *
 * Figma node: 83293:121654  (📦 卡片 Cards)
 * All colors/sizes use CSS Custom Properties from tokens.css — no hardcoded values.
 */
export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant  = "elevated",
      size     = "md",
      clickable = false,
      block    = false,
      cover,
      header,
      footer,
      children,
      className = "",
      onClick,
      ...rest
    },
    ref
  ) => {
    const classes = [
      "dux-card",
      `dux-card--${variant}`,
      `dux-card--${size}`,
      clickable || onClick ? "dux-card--clickable" : "",
      block                ? "dux-card--block"     : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div
        ref={ref}
        className={classes}
        onClick={onClick}
        role={onClick ? "button" : undefined}
        tabIndex={onClick ? 0 : undefined}
        onKeyDown={
          onClick
            ? (e) => {
                if (e.key === "Enter" || e.key === " ") onClick(e as unknown as React.MouseEvent<HTMLDivElement>);
              }
            : undefined
        }
        data-node-id="83293:121654"
        {...rest}
      >
        {cover && <div className="dux-card__cover">{cover}</div>}

        {header && (
          <div className="dux-card__header">
            <div className="dux-card__header-content">
              <div className="dux-card__title">{header.title}</div>
              {header.subtitle && (
                <div className="dux-card__subtitle">{header.subtitle}</div>
              )}
            </div>
            {header.extra && (
              <div className="dux-card__header-extra">{header.extra}</div>
            )}
          </div>
        )}

        {children && <div className="dux-card__body">{children}</div>}

        {footer && <div className="dux-card__footer">{footer}</div>}
      </div>
    );
  }
);

Card.displayName = "Card";

// ─── Card.Grid ───────────────────────────────────────────────────────────────

export interface CardGridProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: 1 | 2 | 3 | 4;
  gap?: "sm" | "md" | "lg";
}

export const CardGrid: React.FC<CardGridProps> = ({
  columns = 2,
  gap = "md",
  children,
  className = "",
  ...rest
}) => (
  <div
    className={["dux-card-grid", `dux-card-grid--cols-${columns}`, `dux-card-grid--gap-${gap}`, className]
      .filter(Boolean)
      .join(" ")}
    {...rest}
  >
    {children}
  </div>
);

CardGrid.displayName = "Card.Grid";

(Card as typeof Card & { Grid: typeof CardGrid }).Grid = CardGrid;

export default Card;
