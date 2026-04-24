/**
 * MessagesTopBar — L3 IM molecule
 * 消息页顶部：菜单 · 标题 · 搜索 · 新建会话。
 *
 * 图标约定：icon 走 Figma 导出的 SVG，通过 svgr 转成 React 组件 prop 注入。
 * 单色 SVG 的 fill 已改为 currentColor，由 .msg-title-bar__touch 的 color 决定。
 *
 * Props:
 *   title — 标题文案，默认「消息」
 *   icons — { menu, search, add } 三个 React 组件（通常来自 DECORATIVE_ASSETS）
 *   onMenu / onSearch / onAdd — 事件回调
 */
export default function MessagesTopBar({
  title = '消息',
  icons = {},
  onMenu,
  onSearch,
  onAdd,
}) {
  const Menu = icons.menu
  const Search = icons.search
  const Add = icons.add
  return (
    <header className="msg-title-bar">
      <button
        className="msg-title-bar__touch msg-title-bar__touch--menu"
        type="button"
        aria-label="打开菜单"
        onClick={onMenu}
      >
        <div className="msg-title-bar__menu-icon">
          {Menu && <Menu aria-hidden="true" />}
        </div>
      </button>
      <h1 className="msg-title-bar__title">{title}</h1>
      <div className="msg-title-bar__actions">
        <button
          className="msg-title-bar__touch msg-title-bar__touch--search"
          type="button"
          aria-label="搜索"
          onClick={onSearch}
        >
          {Search && <Search className="msg-title-bar__search-icon" aria-hidden="true" />}
        </button>
        <button
          className="msg-title-bar__touch msg-title-bar__touch--add"
          type="button"
          aria-label="新建会话"
          onClick={onAdd}
        >
          <div className="msg-title-bar__add-icon-shell">
            {Add && <Add className="msg-title-bar__add-icon" aria-hidden="true" />}
          </div>
        </button>
      </div>
    </header>
  )
}
