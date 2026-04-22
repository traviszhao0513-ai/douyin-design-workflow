/**
 * IMStatusBar — L3 IM molecule
 * iOS 状态栏：9:41 · 信号 · Wi-Fi · 电池。
 * inline SVG，不依赖 Figma CDN；Light/Dark 走 currentColor + --dux-* token。
 * Chat / Messages 共用。
 */
import './IMStatusBar.css'

export default function IMStatusBar({ className = '' }) {
  return (
    <div className={`im-status-bar ${className}`.trim()} aria-hidden="true">
      <span className="im-status-bar__time">9:41</span>
      <div className="im-status-bar__icons">
        {/* Cellular */}
        <svg width="17" height="11" viewBox="0 0 17 11" fill="currentColor">
          <rect x="0"    y="7"   width="3.5" height="4"   rx="0.7" />
          <rect x="4.5"  y="4.5" width="3.5" height="6.5" rx="0.7" />
          <rect x="9"    y="2"   width="3.5" height="9"   rx="0.7" />
          <rect x="13.5" y="0"   width="3.5" height="11"  rx="0.7" opacity="0.3" />
        </svg>
        {/* WiFi */}
        <svg width="16" height="11" viewBox="0 0 16 11" fill="currentColor">
          <circle cx="8" cy="9.5" r="1.5" />
          <path d="M4.8 6.8a4.5 4.5 0 0 1 6.4 0l1.1-1.1a6.1 6.1 0 0 0-8.6 0l1.1 1.1z" />
          <path d="M1.9 3.9a8.6 8.6 0 0 1 12.2 0L15.2 2.8A10.2 10.2 0 0 0 .8 2.8l1.1 1.1z" />
        </svg>
        {/* Battery */}
        <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
          <rect x="0.5" y="0.5" width="21" height="11" rx="2.5" stroke="currentColor" strokeWidth="1" />
          <rect x="22" y="3.5" width="2" height="5" rx="1" fill="currentColor" />
          <rect x="2"  y="2"   width="16" height="8" rx="1.5" fill="currentColor" />
        </svg>
      </div>
    </div>
  )
}
