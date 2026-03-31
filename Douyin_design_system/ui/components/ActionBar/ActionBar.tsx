import React from "react";
import "./ActionBar.css";

// ─── Types ──────────────────────────────────────────────────────────────────

export interface ActionBarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Like count — pass string like "12.3万" */
  likes?:           string | number;
  isLiked?:         boolean;
  onLike?:          () => void;

  /** Comment count */
  comments?:        string | number;
  onComment?:       () => void;

  /** Collect/bookmark count */
  collects?:        string | number;
  isCollected?:     boolean;
  onCollect?:       () => void;

  /** Share count */
  shares?:          string | number;
  onShare?:         () => void;

  /** Layout direction */
  direction?:       "vertical" | "horizontal";
}

// ─── Component ──────────────────────────────────────────────────────────────

/**
 * ActionBar — Douyin Delight UI Kit
 * Right-side vertical interaction buttons (like, comment, collect, share)
 * as seen on the Douyin video feed.
 */
export const ActionBar: React.FC<ActionBarProps> = ({
  likes,
  isLiked     = false,
  onLike,
  comments,
  onComment,
  collects,
  isCollected = false,
  onCollect,
  shares,
  onShare,
  direction   = "vertical",
  className   = "",
  ...rest
}) => {
  const classes = [
    "dux-action-bar",
    `dux-action-bar--${direction}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} {...rest}>
      {/* Like */}
      <ActionItem
        icon={<HeartIcon filled={isLiked} />}
        label={likes}
        active={isLiked}
        activeClass="dux-action-bar__item--liked"
        onClick={onLike}
        aria-label={`Like${likes !== undefined ? `, ${likes} likes` : ""}`}
        aria-pressed={isLiked}
      />

      {/* Comment */}
      <ActionItem
        icon={<CommentIcon />}
        label={comments}
        onClick={onComment}
        aria-label={`Comment${comments !== undefined ? `, ${comments} comments` : ""}`}
      />

      {/* Collect */}
      <ActionItem
        icon={<StarIcon filled={isCollected} />}
        label={collects}
        active={isCollected}
        activeClass="dux-action-bar__item--collected"
        onClick={onCollect}
        aria-label={`Collect${collects !== undefined ? `, ${collects} collects` : ""}`}
        aria-pressed={isCollected}
      />

      {/* Share */}
      <ActionItem
        icon={<ShareIcon />}
        label={shares}
        onClick={onShare}
        aria-label={`Share${shares !== undefined ? `, ${shares} shares` : ""}`}
      />
    </div>
  );
};

ActionBar.displayName = "ActionBar";

// ─── ActionItem ───────────────────────────────────────────────────────────────

interface ActionItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon:         React.ReactNode;
  label?:       string | number;
  active?:      boolean;
  activeClass?: string;
}

const ActionItem: React.FC<ActionItemProps> = ({
  icon,
  label,
  active      = false,
  activeClass = "",
  className   = "",
  ...rest
}) => (
  <button
    type="button"
    className={[
      "dux-action-bar__item",
      active && activeClass ? activeClass : "",
      className,
    ]
      .filter(Boolean)
      .join(" ")}
    {...rest}
  >
    <span className="dux-action-bar__icon" aria-hidden="true">{icon}</span>
    {label !== undefined && (
      <span className="dux-action-bar__count">{label}</span>
    )}
  </button>
);

// ─── Icons ───────────────────────────────────────────────────────────────────

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <path
        d="M14 23C14 23 3 17 3 10C3 7.2 5.2 5 8 5C10 5 11.7 6.1 12.7 7.7C13.3 8.6 14.7 8.6 15.3 7.7C16.3 6.1 18 5 20 5C22.8 5 25 7.2 25 10C25 17 14 23 14 23Z"
        fill={filled ? "#FE2C55" : "none"}
        stroke={filled ? "#FE2C55" : "currentColor"}
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CommentIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <path
        d="M5 5H23C24.1 5 25 5.9 25 7V18C25 19.1 24.1 20 23 20H9L4 25V7C4 5.9 4.9 5 5 5H23Z"
        stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <path
        d="M14 4L16.6 10.6L24 11.3L18.8 16L20.5 23.3L14 19.4L7.5 23.3L9.2 16L4 11.3L11.4 10.6L14 4Z"
        fill={filled ? "#FFC107" : "none"}
        stroke={filled ? "#FFC107" : "currentColor"}
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <path
        d="M21 9L14 4L7 9"
        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
      />
      <path
        d="M14 4V18"
        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"
      />
      <path
        d="M8 13H5C4.4 13 4 13.4 4 14V24C4 24.6 4.4 25 5 25H23C23.6 25 24 24.6 24 24V14C24 13.4 23.6 13 23 13H20"
        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  );
}

export default ActionBar;
