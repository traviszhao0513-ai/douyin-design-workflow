import React from "react";
import "./Tabs.css";

// ─── Types ──────────────────────────────────────────────────────────────────

export interface TabItem {
  key:       string;
  label:     React.ReactNode;
  icon?:     React.ReactNode;
  disabled?: boolean;
  badge?:    React.ReactNode;
}

export type TabsVariant = "line" | "pill" | "card";
export type TabsSize    = "sm" | "md" | "lg";

export interface TabsProps {
  items:       TabItem[];
  activeKey?:  string;
  defaultKey?: string;
  onChange?:   (key: string) => void;
  variant?:    TabsVariant;
  size?:       TabsSize;
  /** Stretch tabs to fill full width */
  stretch?:    boolean;
  className?:  string;
  /** Tab panel content keyed by item key */
  panels?:     Record<string, React.ReactNode>;
}

// ─── Component ──────────────────────────────────────────────────────────────

/**
 * Tabs — Douyin Delight UI Kit
 */
export const Tabs: React.FC<TabsProps> = ({
  items,
  activeKey,
  defaultKey,
  onChange,
  variant   = "line",
  size      = "md",
  stretch   = false,
  className = "",
  panels,
}) => {
  const [internalKey, setInternalKey] = React.useState(
    defaultKey ?? items[0]?.key
  );

  const current = activeKey ?? internalKey;

  const handleSelect = (key: string) => {
    setInternalKey(key);
    onChange?.(key);
  };

  return (
    <div
      className={["dux-tabs", className].filter(Boolean).join(" ")}
    >
      <div
        role="tablist"
        className={[
          "dux-tabs__bar",
          `dux-tabs__bar--${variant}`,
          `dux-tabs__bar--${size}`,
          stretch ? "dux-tabs__bar--stretch" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {items.map((item) => (
          <button
            key={item.key}
            role="tab"
            type="button"
            id={`dux-tab-${item.key}`}
            aria-selected={current === item.key}
            aria-controls={`dux-panel-${item.key}`}
            disabled={item.disabled}
            className={[
              "dux-tabs__tab",
              current === item.key ? "dux-tabs__tab--active" : "",
              item.disabled       ? "dux-tabs__tab--disabled" : "",
            ]
              .filter(Boolean)
              .join(" ")}
            onClick={() => !item.disabled && handleSelect(item.key)}
          >
            {item.icon && (
              <span className="dux-tabs__tab-icon" aria-hidden="true">
                {item.icon}
              </span>
            )}
            <span className="dux-tabs__tab-label">{item.label}</span>
            {item.badge && (
              <span className="dux-tabs__tab-badge">{item.badge}</span>
            )}
          </button>
        ))}
      </div>

      {panels && (
        <div className="dux-tabs__panels">
          {items.map((item) => (
            <div
              key={item.key}
              id={`dux-panel-${item.key}`}
              role="tabpanel"
              aria-labelledby={`dux-tab-${item.key}`}
              hidden={current !== item.key}
              className="dux-tabs__panel"
            >
              {current === item.key && panels[item.key]}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

Tabs.displayName = "Tabs";

export default Tabs;
