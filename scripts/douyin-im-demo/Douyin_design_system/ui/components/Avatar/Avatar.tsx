import React from "react";
import "./Avatar.css";

// ─── Types ──────────────────────────────────────────────────────────────────

export type AvatarSize   = "xs" | "sm" | "md" | "lg" | "xl";
export type AvatarShape  = "circle" | "square";
export type AvatarStatus = "online" | "offline" | "busy" | "away";

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Image URL */
  src?: string;
  /** Alt text for the image */
  alt?: string;
  /** Fallback initials (up to 2 chars) */
  initials?: string;
  /** Size preset */
  size?: AvatarSize;
  /** Shape of the avatar */
  shape?: AvatarShape;
  /** Presence status dot */
  status?: AvatarStatus;
  /** Custom icon fallback */
  icon?: React.ReactNode;
}

// ─── Component ──────────────────────────────────────────────────────────────

/**
 * Avatar — Douyin Delight UI Kit
 * All colors/sizes use CSS Custom Properties from tokens.css.
 */
export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      src,
      alt = "",
      initials,
      size    = "md",
      shape   = "circle",
      status,
      icon,
      className = "",
      ...rest
    },
    ref
  ) => {
    const [imgError, setImgError] = React.useState(false);
    const showImg = src && !imgError;

    const classes = [
      "dux-avatar",
      `dux-avatar--${size}`,
      `dux-avatar--${shape}`,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div ref={ref} className={classes} {...rest}>
        {showImg ? (
          <img
            className="dux-avatar__img"
            src={src}
            alt={alt}
            onError={() => setImgError(true)}
          />
        ) : initials ? (
          <span className="dux-avatar__initials" aria-label={alt}>
            {initials.slice(0, 2)}
          </span>
        ) : icon ? (
          <span className="dux-avatar__icon" aria-hidden="true">{icon}</span>
        ) : (
          <DefaultAvatarIcon />
        )}

        {status && (
          <span
            className={`dux-avatar__status dux-avatar__status--${status}`}
            aria-label={status}
          />
        )}
      </div>
    );
  }
);

Avatar.displayName = "Avatar";

// ─── Avatar Group ────────────────────────────────────────────────────────────

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  max?: number;
  size?: AvatarSize;
}

export const AvatarGroup: React.FC<AvatarGroupProps> = ({
  max = 5,
  size = "md",
  children,
  className = "",
  ...rest
}) => {
  const items = React.Children.toArray(children);
  const visible = items.slice(0, max);
  const overflow = items.length - max;

  return (
    <div
      className={["dux-avatar-group", className].filter(Boolean).join(" ")}
      {...rest}
    >
      {visible.map((child, i) =>
        React.isValidElement(child)
          ? React.cloneElement(child as React.ReactElement<AvatarProps>, {
              size,
              key: i,
            })
          : child
      )}
      {overflow > 0 && (
        <div className={`dux-avatar dux-avatar--${size} dux-avatar--circle dux-avatar__overflow`}>
          <span className="dux-avatar__initials">+{overflow}</span>
        </div>
      )}
    </div>
  );
};

AvatarGroup.displayName = "AvatarGroup";

// ─── Default icon ────────────────────────────────────────────────────────────

function DefaultAvatarIcon() {
  return (
    <svg width="60%" height="60%" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
    </svg>
  );
}

export default Avatar;
