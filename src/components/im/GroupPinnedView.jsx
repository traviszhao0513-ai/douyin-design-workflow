import { useEffect, useRef, useState } from 'react'
import Avatar from '../../../Douyin_design_system/ui/components/Avatar/Avatar'
import Button from '../../../Douyin_design_system/ui/components/Button/Button'

function useLongPress(onTrigger) {
  const timerRef = useRef(null)

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }

  useEffect(() => clearTimer, [])

  return {
    onContextMenu: (event) => {
      event.preventDefault()
      onTrigger()
    },
    onPointerDown: () => {
      clearTimer()
      timerRef.current = setTimeout(onTrigger, 420)
    },
    onPointerUp: clearTimer,
    onPointerLeave: clearTimer,
    onPointerCancel: clearTimer,
  }
}

function PinnedCard({ item, onJump, onOpenActions }) {
  const longPressProps = useLongPress(() => onOpenActions(item))

  return (
    <article className="gsp-card gsp-pin-card" {...longPressProps}>
      <div className="gsp-pin-card__header">
        <div className="gsp-pin-card__author">
          <Avatar size="36" src={item.senderAvatar} alt={item.senderName} />
          <div className="gsp-pin-card__copy">
            <span className="gsp-pin-card__name">{item.senderName}</span>
            <span className="gsp-pin-card__meta">
              {item.addedAt} · 由 {item.pinnedBy} 添加置顶
            </span>
          </div>
        </div>
        <span className="gsp-pin-card__tag">{item.typeLabel}</span>
      </div>
      <p className="gsp-pin-card__excerpt">{item.excerpt}</p>
      <div className="gsp-pin-card__footer">
        <span className="gsp-pin-card__visibility">{item.visibility}</span>
        <Button size="sm" variant="secondary" onClick={() => onJump(item.messageId)}>
          跳转原消息
        </Button>
      </div>
    </article>
  )
}

function ActionSheet({ item, role, onClose, onRemove, onReport }) {
  if (!item) return null

  return (
    <div className="gsp-sheet" role="presentation" onClick={onClose}>
      <div className="gsp-sheet__panel" role="dialog" aria-label="置顶操作" onClick={(event) => event.stopPropagation()}>
        <span className="gsp-sheet__eyebrow">长按置顶消息</span>
        <h3 className="gsp-sheet__title">{item.senderName}</h3>
        <p className="gsp-sheet__body">{item.excerpt}</p>
        <div className="gsp-sheet__actions">
          {role === 'owner' && (
            <Button block size="lg" variant="danger" onClick={() => onRemove(item.id)}>
              移除置顶
            </Button>
          )}
          <Button block size="lg" variant="secondary" onClick={() => onReport(item.id)}>
            举报消息
          </Button>
          <Button block size="lg" variant="ghost" onClick={onClose}>
            取消
          </Button>
        </div>
      </div>
    </div>
  )
}

export default function GroupPinnedView({ items, role, onJumpToMessage, onRemovePin, onReportPin }) {
  const [actionItem, setActionItem] = useState(null)

  return (
    <section className="gsp-panel" aria-label="群置顶列表">
      <div className="gsp-card gsp-panel__hero">
        <span className="gsp-panel__eyebrow">按添加时间排序</span>
        <h2 className="gsp-panel__title">群置顶和会话消息体保持一致，但支持长期复访</h2>
        <p className="gsp-panel__body">
          点击卡片会直接回跳原消息；长按或右键可打开操作面板，群主可以移除置顶，所有成员都可以举报。
        </p>
      </div>
      <div className="gsp-panel__stack">
        {items.map((item) => (
          <PinnedCard
            key={item.id}
            item={item}
            onJump={onJumpToMessage}
            onOpenActions={setActionItem}
          />
        ))}
      </div>
      <ActionSheet
        item={actionItem}
        onClose={() => setActionItem(null)}
        onRemove={(pinId) => {
          onRemovePin(pinId)
          setActionItem(null)
        }}
        onReport={(pinId) => {
          onReportPin(pinId)
          setActionItem(null)
        }}
        role={role}
      />
    </section>
  )
}
