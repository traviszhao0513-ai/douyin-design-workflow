/**
 * MessagesTopBar — L3 IM molecule
 * 消息页顶部：菜单 · 标题 · 搜索 · 新建会话。
 *
 * 图标约定：icon 级视觉全部走 Figma 导出的 PNG 切图（通过 icons prop 注入），
 *          不用 inline SVG，避免后续 stroke/shape 与设计稿漂移。
 *
 * Props:
 *   title — 标题文案，默认「消息」
 *   icons — { menu, search, add } 三个 PNG URL（通常来自 DECORATIVE_ASSETS）
 *   onMenu / onSearch / onAdd — 事件回调
 */
export default function MessagesTopBar({
  title = '消息',
  icons = {},
  onMenu,
  onSearch,
  onAdd,
}) {
  return (
    <header className="msg-title-bar">
      <button
        className="msg-title-bar__touch msg-title-bar__touch--menu"
        type="button"
        aria-label="打开菜单"
        onClick={onMenu}
      >
        <div className="msg-title-bar__menu-icon">
          {icons.menu && <img src={icons.menu} alt="" />}
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
          {icons.search && (
            <img className="msg-title-bar__search-icon" src={icons.search} alt="" />
          )}
        </button>
        <button
          className="msg-title-bar__touch msg-title-bar__touch--add"
          type="button"
          aria-label="新建会话"
          onClick={onAdd}
        >
          <div className="msg-title-bar__add-icon-shell">
            {icons.add && (
              <img className="msg-title-bar__add-icon" src={icons.add} alt="" />
            )}
          </div>
        </button>
      </div>
    </header>
  )
}
