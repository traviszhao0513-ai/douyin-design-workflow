/**
 * MessagesTopBar — L3 IM molecule
 * 消息页顶部：菜单 · 标题 · 搜索 · 新建会话。
 * 图标全部 inline SVG，不依赖 Figma CDN。
 */
export default function MessagesTopBar({ title = '消息', onMenu, onSearch, onAdd }) {
  return (
    <header className="msg-title-bar">
      <button
        className="msg-title-bar__touch msg-title-bar__touch--menu"
        type="button"
        aria-label="打开菜单"
        onClick={onMenu}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M4 7h12M4 12h16M4 17h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
      <h1 className="msg-title-bar__title">{title}</h1>
      <div className="msg-title-bar__actions">
        <button
          className="msg-title-bar__touch msg-title-bar__touch--search"
          type="button"
          aria-label="搜索"
          onClick={onSearch}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="2" />
            <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        <button
          className="msg-title-bar__touch msg-title-bar__touch--add"
          type="button"
          aria-label="新建会话"
          onClick={onAdd}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </header>
  )
}
