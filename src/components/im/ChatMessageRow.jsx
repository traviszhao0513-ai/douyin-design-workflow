import Avatar from '../../../Douyin_design_system/ui/components/Avatar/Avatar'
import IcReply from '../../icons/svg/ic_s_s_arrowuturnleft_20_filled.svg?react'
import Bubble from './Bubble'
import useSwipeReply from './useSwipeReply'

function resolveBubbleSpec(message) {
  if (message.kind === 'v2') {
    return {
      data: message.data,
      format: message.format,
      perspective: message.dir,
      state: message.state || 'normal',
      subdivision: message.subdivision,
      type: message.type,
    }
  }

  if (message.kind === 'call') {
    return {
      data: message,
      perspective: message.dir,
      state: message.status === '未接通' ? 'missed' : message.status === '已拒绝' ? 'declined' : 'normal',
      type: message.callType === 'video' ? 'videocall' : 'audiocall',
    }
  }

  return {
    data: message,
    perspective: message.dir,
    type: message.kind === 'card_link' ? 'card_link' : message.kind,
  }
}

function MessageBubbleRow({ avatar, isSent, message, onReply }) {
  const { bind, dragX, isDragging, isReady, progress } = useSwipeReply({
    onTrigger: () => onReply?.(message),
  })
  const bubbleSpec = resolveBubbleSpec(message)
  const swipeClassName = [
    'cht-swipe',
    `cht-swipe--${message.dir}`,
    isDragging && 'is-dragging',
    isReady && 'is-ready',
  ].filter(Boolean).join(' ')

  return (
    <div className={`cht-row cht-row--${message.dir}`}>
      {!isSent && <Avatar className="cht-row__avatar" size="36" src={avatar} alt="" />}
      <div className="cht-row__body">
        <div
          className={swipeClassName}
          style={{
            '--cht-swipe-progress': progress,
            '--cht-swipe-shift': `${dragX}px`,
          }}
          {...bind}
        >
          <div className="cht-swipe__reply" aria-hidden="true">
            <IcReply width={20} height={20} />
          </div>
          <div className="cht-swipe__bubble">
            <Bubble {...bubbleSpec} />
          </div>
        </div>
      </div>
      {isSent && <Avatar className="cht-row__avatar" size="36" src={avatar} alt="" />}
    </div>
  )
}

function StatusOnlyRow({ message }) {
  return (
    <div className="cht-row cht-row--status" role="note">
      <Bubble type={message.type} data={message.data} />
    </div>
  )
}

function ReadReceiptRow({ message }) {
  return (
    <div className={`cht-row cht-row--read cht-row--${message.dir}`}>
      <Bubble type={message.type} format={message.format} data={message.data} perspective={message.dir} />
    </div>
  )
}

export default function ChatMessageRow({ contactAvatar, message, myAvatar, onReply }) {
  if (message.kind === 'time') {
    return (
      <div className="cht-row cht-row--time" role="separator">
        <span className="cht-row__timestamp">{message.text}</span>
      </div>
    )
  }

  if (message.kind === 'system') {
    return (
      <div className="cht-row cht-row--system" role="note">
        <span className="cht-row__system-text">{message.text}</span>
      </div>
    )
  }

  if (message.kind === 'v2' && message.type === 'status') return <StatusOnlyRow message={message} />
  if (message.kind === 'v2' && message.type === 'read') return <ReadReceiptRow message={message} />

  const isSent = message.dir === 'sent'
  const avatar = isSent ? myAvatar : contactAvatar

  return (
    <MessageBubbleRow
      avatar={avatar}
      isSent={isSent}
      message={message}
      onReply={onReply}
    />
  )
}
