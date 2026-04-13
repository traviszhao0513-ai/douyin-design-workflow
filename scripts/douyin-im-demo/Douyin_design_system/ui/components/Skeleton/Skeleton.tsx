import React from "react";
import "./Skeleton.css";

// ─── Types ──────────────────────────────────────────────────────────────────

export type SkeletonVariant = "text" | "avatar" | "button" | "image" | "rect";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?:  SkeletonVariant;
  /** Width (CSS value) */
  width?:    string | number;
  /** Height (CSS value) */
  height?:   string | number;
  /** Border radius (CSS value) */
  radius?:   string;
  /** Disable shimmer animation */
  animated?: boolean;
  /** Number of text lines (variant="text" only) */
  lines?:    number;
  /** Avatar shape (variant="avatar" only) */
  round?:    boolean;
}

// ─── Component ──────────────────────────────────────────────────────────────

/**
 * Skeleton — Douyin Delight UI Kit
 * Loading placeholder with shimmer animation.
 */
export const Skeleton: React.FC<SkeletonProps> = ({
  variant  = "rect",
  width,
  height,
  radius,
  animated = true,
  lines    = 3,
  round    = true,
  className = "",
  style,
  ...rest
}) => {
  // Multi-line text variant
  if (variant === "text") {
    return (
      <div
        className={["dux-skeleton-paragraph", className].filter(Boolean).join(" ")}
        {...rest}
      >
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={[
              "dux-skeleton",
              "dux-skeleton--text",
              animated ? "dux-skeleton--animated" : "",
            ]
              .filter(Boolean)
              .join(" ")}
            style={{
              width: i === lines - 1 && lines > 1 ? "60%" : "100%",
            }}
          />
        ))}
      </div>
    );
  }

  const classes = [
    "dux-skeleton",
    `dux-skeleton--${variant}`,
    animated ? "dux-skeleton--animated" : "",
    variant === "avatar" && round ? "dux-skeleton--round" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const sizeStyle: React.CSSProperties = {
    width:        typeof width  === "number" ? `${width}px`  : width,
    height:       typeof height === "number" ? `${height}px` : height,
    borderRadius: radius,
    ...style,
  };

  return <div className={classes} style={sizeStyle} {...rest} />;
};

Skeleton.displayName = "Skeleton";

// ─── SkeletonCard preset ─────────────────────────────────────────────────────

export interface SkeletonCardProps {
  animated?: boolean;
  rows?: number;
}

export const SkeletonCard: React.FC<SkeletonCardProps> = ({
  animated = true,
  rows = 3,
}) => (
  <div className="dux-skeleton-card">
    <Skeleton variant="image" animated={animated} />
    <div className="dux-skeleton-card__body">
      <div className="dux-skeleton-card__header">
        <Skeleton variant="avatar" animated={animated} />
        <div className="dux-skeleton-card__meta">
          <Skeleton variant="text" lines={1} animated={animated} />
          <Skeleton variant="text" lines={1} animated={animated} width="60%" />
        </div>
      </div>
      <Skeleton variant="text" lines={rows} animated={animated} />
    </div>
  </div>
);

SkeletonCard.displayName = "SkeletonCard";

export default Skeleton;
