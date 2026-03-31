import React from "react";
import "./List.css";

// ─── Types ──────────────────────────────────────────────────────────────────

export type ListItemType = "text" | "card";

export interface ListItemProps {
  key?:         string;
  /** Left side: icon node */
  icon?:        React.ReactNode;
  /** Primary title */
  title:        React.ReactNode;
  /** Secondary subtitle */
  subtitle?:    React.ReactNode;
  /** Right side slot — e.g. Switch, Arrow, Badge, or custom node */
  rightSlot?:   React.ReactNode;
  /** Whether the item is clickable */
  onClick?:     () => void;
  /** Disabled state */
  disabled?:    boolean;
  className?:   string;
}

export interface ListProps {
  items:        ListItemProps[];
  /** Visual type: "text" (plain rows) | "card" (rounded card per item) */
  type?:        ListItemType;
  /** Show divider between items */
  divider?:     boolean;
  className?:   string;
}

// ─── ListItem ────────────────────────────────────────────────────────────────

/**
 * Single list row. Can be used standalone or via <List items={[...]} />.
 */
export const ListItem: React.FC<ListItemProps> = ({
  icon,
  title,
  subtitle,
  rightSlot,
  onClick,
  disabled = false,
  className = "",
}) => {
  const Tag = onClick ? "button" : "div";

  return (
    <Tag
      type={onClick ? "button" : undefined}
      disabled={onClick ? disabled : undefined}
      className={[
        "dux-list-item",
        onClick      ? "dux-list-item--clickable" : "",
        disabled     ? "dux-list-item--disabled"  : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      onClick={!disabled ? onClick : undefined}
    >
      {/* Left — Icon */}
      {icon && (
        <span className="dux-list-item__icon" aria-hidden="true">
          {icon}
        </span>
      )}

      {/* Center — Title + Subtitle */}
      <span className="dux-list-item__body">
        <span className="dux-list-item__title">{title}</span>
        {subtitle && (
          <span className="dux-list-item__subtitle">{subtitle}</span>
        )}
      </span>

      {/* Right slot */}
      {rightSlot !== undefined && (
        <span className="dux-list-item__right">{rightSlot}</span>
      )}
    </Tag>
  );
};

ListItem.displayName = "ListItem";

// ─── List ────────────────────────────────────────────────────────────────────

/**
 * List — Douyin Delight UI Kit
 * Vertical list of items with optional icons, subtitles, and right-side slots.
 * Figma node: 46290:34297
 */
export const List: React.FC<ListProps> = ({
  items,
  type      = "text",
  divider   = true,
  className = "",
}) => (
  <ul
    className={[
      "dux-list",
      `dux-list--${type}`,
      divider ? "dux-list--divider" : "",
      className,
    ]
      .filter(Boolean)
      .join(" ")}
    role="list"
  >
    {items.map((item, idx) => (
      <li key={item.key ?? idx} className="dux-list__row" role="listitem">
        <ListItem {...item} />
      </li>
    ))}
  </ul>
);

List.displayName = "List";

export default List;
