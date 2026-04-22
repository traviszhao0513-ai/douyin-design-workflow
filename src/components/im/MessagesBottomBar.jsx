/**
 * MessagesBottomBar — L3 IM molecule
 * 消息页底部：分隔线 + BottomNav（L2） + Home 条。
 *
 * Props:
 *   unreadCount — number, 消息 tab 徽章数
 *   captureSrc  — string, 中间"拍摄" tab 的图片资源（装饰图）
 *   onChange    — (key) => void, tab 切换回调
 */
import BottomNav from '../../../Douyin_design_system/ui/components/BottomNav/BottomNav'

export default function MessagesBottomBar({ unreadCount = 0, captureSrc, onChange }) {
  const items = [
    { key: 'feed',    icon: <span className="msg-bottom-nav__text">首页</span> },
    { key: 'friends', icon: <span className="msg-bottom-nav__text">朋友</span> },
    {
      key: 'capture',
      icon: captureSrc ? (
        <img
          className="msg-bottom-nav__capture-image"
          src={captureSrc}
          alt="拍摄"
          aria-hidden="true"
        />
      ) : <span className="msg-bottom-nav__text">拍摄</span>,
    },
    {
      key: 'messages',
      icon: <span className="msg-bottom-nav__text">消息</span>,
      badge: unreadCount > 0
        ? <span className="msg-bottom-nav__badge-number">{unreadCount}</span>
        : undefined,
    },
    { key: 'profile', icon: <span className="msg-bottom-nav__text">我</span> },
  ]

  const handleChange = (key) => {
    if (!onChange) return
    if (key === 'friends') { onChange('feed'); return }
    onChange(key)
  }

  return (
    <div className="msg-bottom-bar">
      <div className="msg-bottom-bar__divider" />
      <div className="msg-bottom-bar__nav-shell">
        <BottomNav
          activeKey="messages"
          className="msg-bottom-nav"
          items={items}
          onChange={handleChange}
          showLabel={false}
        />
      </div>
      <div className="msg-bottom-bar__home-indicator" aria-hidden="true">
        <div className="msg-bottom-bar__home-pill" />
      </div>
    </div>
  )
}
