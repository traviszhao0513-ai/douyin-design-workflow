/**
 * ConversationRow — L3 IM molecule
 * 消息列表中的单行会话。内部组合 L2 Avatar + Badge。
 *
 * Figma: IM UI Kit 2.0 · Message List · Cell
 */
import Avatar from '../../../Douyin_design_system/ui/components/Avatar/Avatar'
import Badge from '../../../Douyin_design_system/ui/components/Badge/Badge'

/* ── Figma cut assets (shared with Messages page) ── */
const ICONS = {
  onlineCell:    'https://www.figma.com/api/mcp/asset/1f7a4396-c715-4f85-97c4-0f3f760c1c5b',
  muteIcon:      'https://www.figma.com/api/mcp/asset/c43e4a4b-8faf-4224-b8a9-efe9a5d9412f',
  reactionLaugh: 'https://www.figma.com/api/mcp/asset/5e265c06-9983-4cbb-99f9-ac2f0d7e8fae',
}

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
          <img
            className="msg-cell__online-image"
            src={ICONS.onlineCell}
            alt=""
            aria-hidden="true"
          />
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
                <img
                  className="msg-cell__mute-glyph"
                  src={ICONS.muteIcon}
                  alt=""
                  aria-hidden="true"
                />
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
                src={ICONS.reactionLaugh}
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
