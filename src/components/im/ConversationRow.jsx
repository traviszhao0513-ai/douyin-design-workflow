/**
 * ConversationRow — L3 IM molecule
 * 消息列表中的单行会话。内部组合 L2 Avatar + Badge。
 *
 * Figma: IM UI Kit 2.0 · Message List · Cell
 *
 * 装饰 icon（online 绿点、静音喇叭）一律走 src/assets/im 下的 SVG 组件，
 * fill/stroke 用 currentColor + 父级 color 继承，主题自适应。
 * 反应贴纸是栅格 PNG（主题无关），从 public 加载。
 */
import Avatar from '../../../Douyin_design_system/ui/components/Avatar/Avatar'
import Badge from '../../../Douyin_design_system/ui/components/Badge/Badge'
import { OnlineCellIcon, MuteIcon } from '../../assets/im'

const REACTION_LAUGH_SRC = '/assets/im/reaction-laugh.png'

function StreakBadge({ count }) {
  return (
    <span className="msg-cell__streak" aria-label={`${count} 连续互动`}>
      <img
        className="msg-cell__streak-icon"
        src="/assets/streak-flame.png"
        alt=""
        aria-hidden="true"
      />
      <span className="msg-cell__streak-count">{count}</span>
    </span>
  )
}

export default function ConversationRow({
  name,
  avatar,
  preview,
  time,
  unread,
  online,
  muted,
  reaction,
  streak,
  redPreview,
  grayPreview,
  onTap,
}) {
  return (
    <button className="msg-cell" type="button" onClick={onTap}>
      <div className="msg-cell__avatar-shell">
        <Avatar className="msg-cell__avatar" size="56" src={avatar} alt={name} />
        {online && (
          <span className="msg-cell__online" aria-hidden="true">
            <OnlineCellIcon className="msg-cell__online-image" />
          </span>
        )}
      </div>

      <div className="msg-cell__content">
        <div className="msg-cell__header">
          <div className="msg-cell__name-wrap">
            <span className="msg-cell__name">{name}</span>
            {streak && <StreakBadge count={streak} />}
          </div>
          <div className="msg-cell__meta">
            {muted && (
              <span className="msg-cell__mute" aria-label="已静音">
                <MuteIcon className="msg-cell__mute-glyph" aria-hidden="true" />
              </span>
            )}
            <span className="msg-cell__time">{time}</span>
          </div>
        </div>

        <div className="msg-cell__preview-row">
          {reaction && (
            <span className="msg-cell__reaction" aria-hidden="true">
              <img
                className="msg-cell__reaction-emoji"
                src={REACTION_LAUGH_SRC}
                alt=""
              />
              <span className="msg-cell__reaction-divider" />
            </span>
          )}

          {redPreview && grayPreview && (
            <span className="msg-cell__mixed-preview">
              <span className="msg-cell__preview msg-cell__preview--accent">{redPreview}</span>
              <span className="msg-cell__preview msg-cell__preview--muted">{grayPreview}</span>
            </span>
          )}

          {redPreview && !grayPreview && (
            <span className="msg-cell__preview msg-cell__preview--accent">{redPreview}</span>
          )}

          {!redPreview && (
            <span className="msg-cell__preview msg-cell__preview--muted">{preview}</span>
          )}

          {unread && <Badge count={unread} color="danger" className="msg-cell__badge" />}
        </div>
      </div>
    </button>
  )
}
