import React from "react";
import "./PushNotification.css";

// ─── Types ──────────────────────────────────────────────────────────────────

export interface PushNotificationProps {
  /** App icon or avatar URL shown on the left */
  avatar?:      string;
  /** Avatar fallback element */
  avatarFallback?: React.ReactNode;
  /** Primary line — app name or sender */
  title:        string;
  /** Secondary line — message body */
  body?:        string;
  /** Right-side action button label */
  actionLabel?: string;
  onAction?:    () => void;
  /** Dismiss callback */
  onDismiss?:   () => void;
  /** Timestamp string */
  timestamp?:   string;
  /** Dark / light forced theme */
  theme?:       "light" | "dark" | "auto";
  className?:   string;
  /** Show app badge / notification icon overlay on avatar */
  appIcon?:     string;
}

// ─── Component ──────────────────────────────────────────────────────────────

/**
 * PushNotification (端内提醒) — Douyin Delight UI Kit
 * Matches the Figma DuxPushNotifications component spec:
 *   - Full width 359px, height 80px banner
 *   - Avatar (48px circle) with optional app icon overlay (24px)
 *   - Two-line text block: title + body
 *   - Optional action button on the right
 */
export const PushNotification: React.FC<PushNotificationProps> = ({
  avatar,
  avatarFallback,
  title,
  body,
  actionLabel,
  onAction,
  onDismiss,
  timestamp,
  theme     = "auto",
  className = "",
  appIcon,
}) => {
  const classes = [
    "dux-push",
    theme !== "auto" ? `dux-push--${theme}` : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} role="status" aria-live="polite">
      {/* Avatar */}
      <div className="dux-push__avatar-wrap">
        {avatar ? (
          <img className="dux-push__avatar" src={avatar} alt="" aria-hidden="true" />
        ) : avatarFallback ? (
          <div className="dux-push__avatar dux-push__avatar--fallback">
            {avatarFallback}
          </div>
        ) : (
          <div className="dux-push__avatar dux-push__avatar--default" aria-hidden="true">
            <DefaultAvatarIcon />
          </div>
        )}
        {appIcon && (
          <img
            className="dux-push__app-icon"
            src={appIcon}
            alt=""
            aria-hidden="true"
          />
        )}
      </div>

      {/* Text content */}
      <div className="dux-push__content">
        <div className="dux-push__title-row">
          <span className="dux-push__title">{title}</span>
          {timestamp && (
            <span className="dux-push__timestamp">{timestamp}</span>
          )}
        </div>
        {body && <p className="dux-push__body">{body}</p>}
      </div>

      {/* Action */}
      {actionLabel && (
        <button
          type="button"
          className="dux-push__action"
          onClick={onAction}
        >
          {actionLabel}
        </button>
      )}

      {/* Dismiss */}
      {onDismiss && (
        <button
          type="button"
          className="dux-push__dismiss"
          onClick={onDismiss}
          aria-label="Dismiss notification"
        >
          <CloseIcon />
        </button>
      )}
    </div>
  );
};

PushNotification.displayName = "PushNotification";

// ─── Icons ───────────────────────────────────────────────────────────────────
function DefaultAvatarIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 12c2.2 0 4-1.8 4-4s-1.8-4-4-4-4 1.8-4 4 1.8 4 4 4zm0 2c-2.7 0-8 1.3-8 4v2h16v-2c0-2.7-5.3-4-8-4z" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M4 4L12 12M12 4L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export default PushNotification;
