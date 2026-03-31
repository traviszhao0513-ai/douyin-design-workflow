import React from "react";
import "./BottomNav.css";

// ─── Types ──────────────────────────────────────────────────────────────────

export interface BottomNavItem {
  key:      string;
  label:    string;
  icon:     React.ReactNode;
  /** Icon shown when active (falls back to `icon` if not provided) */
  activeIcon?: React.ReactNode;
  badge?:   React.ReactNode;
  disabled?: boolean;
}

export interface BottomNavProps {
  items:       BottomNavItem[];
  activeKey?:  string;
  defaultKey?: string;
  onChange?:   (key: string) => void;
  /** Show label text beneath icons */
  showLabel?:  boolean;
  className?:  string;
}

// ─── Component ──────────────────────────────────────────────────────────────

/**
 * BottomNav — Douyin Delight UI Kit
 * Mobile bottom navigation bar with safe-area support.
 * Mirrors the Douyin app's tab bar: Home / Friends / + / Inbox / Me.
 */
export const BottomNav: React.FC<BottomNavProps> = ({
  items,
  activeKey,
  defaultKey,
  onChange,
  showLabel = true,
  className = "",
}) => {
  const [internalKey, setInternal] = React.useState(
    defaultKey ?? items[0]?.key
  );

  const current = activeKey ?? internalKey;

  const handleSelect = (item: BottomNavItem) => {
    if (item.disabled) return;
    setInternal(item.key);
    onChange?.(item.key);
  };

  return (
    <nav
      className={["dux-bottom-nav", className].filter(Boolean).join(" ")}
      aria-label="Bottom navigation"
    >
      <div className="dux-bottom-nav__inner">
        {items.map((item) => {
          const isActive = current === item.key;

          return (
            <button
              key={item.key}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-label={item.label}
              disabled={item.disabled}
              className={[
                "dux-bottom-nav__item",
                isActive       ? "dux-bottom-nav__item--active"   : "",
                item.disabled  ? "dux-bottom-nav__item--disabled" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              onClick={() => handleSelect(item)}
            >
              {/* Badge */}
              {item.badge && (
                <span className="dux-bottom-nav__badge" aria-hidden="true">
                  {item.badge}
                </span>
              )}

              {/* Icon */}
              <span className="dux-bottom-nav__icon" aria-hidden="true">
                {isActive && item.activeIcon ? item.activeIcon : item.icon}
              </span>

              {/* Label */}
              {showLabel && (
                <span className="dux-bottom-nav__label">{item.label}</span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

BottomNav.displayName = "BottomNav";

export default BottomNav;
