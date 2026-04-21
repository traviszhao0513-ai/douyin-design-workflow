/**
 * ChatTopBar — L3 IM molecule
 * 聊天页顶部导航：返回 · 头像 · 名字+热度 · 走查 · 视频 · 更多。
 *
 * Figma: IM UI Kit 2.0 · Title Bar (chat)
 */
import Avatar from '../../../Douyin_design_system/ui/components/Avatar/Avatar'
import IcBack  from '../../icons/chat/ic_titlebar_back.svg?react'
import IcVideo from '../../icons/chat/ic_titlebar_video.svg?react'
import IcMore  from '../../icons/chat/ic_titlebar_more.svg?react'

export default function ChatTopBar({ contactName, contactAvatar, onBack, onPreview }) {
  return (
    <header className="cht-nav">
      <div className="cht-nav__left">
        <button className="cht-nav__back" type="button" aria-label="返回" onClick={onBack}>
          <IcBack width={24} height={24} />
        </button>
        <div className="cht-nav__contact">
          <Avatar className="cht-nav__avatar" size="36" src={contactAvatar} alt="" />
          <div className="cht-nav__name-row">
            <span className="cht-nav__name">{contactName}</span>
            <span className="cht-nav__badge" aria-label="红火等级 3">
              <span className="cht-nav__badge-icon">🔥</span>
              <span className="cht-nav__badge-count">3</span>
            </span>
          </div>
        </div>
      </div>
      <div className="cht-nav__right">
        <button
          className="cht-nav__action cht-nav__preview-btn"
          type="button"
          aria-label="组件走查"
          title="气泡组件走查"
          onClick={onPreview}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/>
            <path d="M21 21l-4.35-4.35"/>
          </svg>
        </button>
        <button className="cht-nav__action" type="button" aria-label="视频通话"><IcVideo width={24} height={24} /></button>
        <button className="cht-nav__action" type="button" aria-label="更多"><IcMore width={24} height={24} /></button>
      </div>
      <div className="cht-nav__divider" />
    </header>
  )
}
