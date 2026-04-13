import React from "react";
import "./VideoCard.css";

// ─── Types ──────────────────────────────────────────────────────────────────

export interface VideoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Thumbnail image URL */
  thumbnail:    string;
  /** Video duration string, e.g. "1:23" */
  duration?:    string;
  /** Video title */
  title?:       string;
  /** Author avatar URL */
  authorAvatar?: string;
  /** Author display name */
  authorName?:  string;
  /** Play count string, e.g. "12.3万" */
  plays?:       string;
  /** Like count string */
  likes?:       string;
  /** Show a "Live" badge */
  isLive?:      boolean;
  /** Aspect ratio of the thumbnail */
  ratio?:       "9/16" | "16/9" | "1/1";
  /** Click handler for the whole card */
  onPlay?:      () => void;
  /** Click handler for author */
  onAuthorClick?: () => void;
}

// ─── Component ──────────────────────────────────────────────────────────────

/**
 * VideoCard — Douyin Delight UI Kit
 * Vertical video feed card in the style of Douyin / TikTok.
 */
export const VideoCard: React.FC<VideoCardProps> = ({
  thumbnail,
  duration,
  title,
  authorAvatar,
  authorName,
  plays,
  likes,
  isLive     = false,
  ratio      = "9/16",
  onPlay,
  onAuthorClick,
  className  = "",
  ...rest
}) => {
  const classes = [
    "dux-video-card",
    onPlay ? "dux-video-card--clickable" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} {...rest}>
      {/* Thumbnail */}
      <div
        className="dux-video-card__thumb"
        style={{ aspectRatio: ratio }}
        onClick={onPlay}
        role={onPlay ? "button" : undefined}
        tabIndex={onPlay ? 0 : undefined}
        aria-label={title ? `Play ${title}` : "Play video"}
        onKeyDown={onPlay ? (e) => { if (e.key === "Enter" || e.key === " ") onPlay(); } : undefined}
      >
        <img
          className="dux-video-card__img"
          src={thumbnail}
          alt={title ?? ""}
          loading="lazy"
        />

        {/* Gradient overlay */}
        <div className="dux-video-card__overlay" aria-hidden="true" />

        {/* Live badge */}
        {isLive && (
          <span className="dux-video-card__live-badge" aria-label="Live">
            LIVE
          </span>
        )}

        {/* Duration */}
        {duration && !isLive && (
          <span className="dux-video-card__duration">{duration}</span>
        )}

        {/* Play icon overlay */}
        <span className="dux-video-card__play-icon" aria-hidden="true">
          <PlayIcon />
        </span>

        {/* Bottom meta inside thumbnail */}
        <div className="dux-video-card__thumb-meta">
          {plays && (
            <span className="dux-video-card__plays">
              <PlayCountIcon />
              {plays}
            </span>
          )}
        </div>
      </div>

      {/* Card body */}
      {(title || authorName) && (
        <div className="dux-video-card__body">
          {authorName && (
            <button
              type="button"
              className="dux-video-card__author"
              onClick={onAuthorClick}
              disabled={!onAuthorClick}
            >
              {authorAvatar && (
                <img
                  className="dux-video-card__author-avatar"
                  src={authorAvatar}
                  alt={authorName}
                />
              )}
              <span className="dux-video-card__author-name">{authorName}</span>
            </button>
          )}

          {title && (
            <p className="dux-video-card__title">{title}</p>
          )}

          {likes && (
            <span className="dux-video-card__likes">
              <HeartIcon />
              {likes}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

VideoCard.displayName = "VideoCard";

// ─── Icons ───────────────────────────────────────────────────────────────────
function PlayIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <circle cx="16" cy="16" r="16" fill="rgba(0,0,0,0.4)" />
      <path d="M13 10.5L22.5 16L13 21.5V10.5Z" fill="white" />
    </svg>
  );
}

function PlayCountIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
      <path d="M4 2.5L9.5 6L4 9.5V2.5Z" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
      <path d="M6 10.5C6 10.5 1 7 1 4C1 2.3 2.3 1 4 1C4.9 1 5.7 1.4 6 2C6.3 1.4 7.1 1 8 1C9.7 1 11 2.3 11 4C11 7 6 10.5 6 10.5Z" />
    </svg>
  );
}

export default VideoCard;
