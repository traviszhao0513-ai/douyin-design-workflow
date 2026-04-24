/**
 * MessageRow — L3 IM molecule
 * 聊天流单行消息容器：头像 + 对应 Bubble 变体。
 * 内部包含所有 v1 bubble 渲染器（Text/Link/Mention/Quote/Voice/Image/Call/LinkCard）；
 * v2 扩展类型转发到统一的 <Bubble>。
 *
 * 页面层（Chat.jsx）只负责调用 <MessageRow message=...>，不再关心具体 bubble 形态。
 */
import { useState, useRef, useEffect } from 'react'
import Avatar from '../../../Douyin_design_system/ui/components/Avatar/Avatar'
import Bubble from './Bubble'

/* ── Bubble-specific icons ── */
import IcPlay      from '../../icons/svg/ic_s_s_play_16_filled.svg?react'
import IcVoicePlay from '../../icons/chat/voice_play.svg?react'
import IcVideoCall from '../../icons/svg/ic_s_s_video_20_filled.svg?react'
import IcPhoneUp   from '../../icons/svg/ic_s_s_phoneup_20_filled.svg?react'
import IcPause     from '../../icons/svg/ic_s_s_pause_16_filled.svg?react'
import IcCamera    from '../../icons/svg/ic_s_s_camera_16_filled.svg?react'
import IcLink12    from '../../icons/svg/ic_s_s_link_12_outlined.svg?react'

/* Exact waveform heights from Figma node measurement (px) */
const WAVE_HEIGHTS = [9, 12, 14, 20, 14, 10, 10, 10, 10, 10, 10]

function Waveform({ dir }) {
  return (
    <div className={`cht-wave cht-wave--${dir}`} aria-hidden="true">
      {WAVE_HEIGHTS.map((h, i) => (
        <span key={i} className="cht-wave__bar" style={{ height: `${h}px` }} />
      ))}
    </div>
  )
}

function TextBubble({ message, dir }) {
  return (
    <div className={`cht-bbl cht-bbl--text cht-bbl--${dir}`}>
      <p className="cht-bbl__text">{message.text}</p>
    </div>
  )
}

function LinkBubble({ message, dir }) {
  return (
    <div className={`cht-bbl cht-bbl--text cht-bbl--${dir}`}>
      <p className="cht-bbl__text">
        {message.segments.map((seg, i) =>
          seg.type === 'link'
            ? <span key={i} className="cht-bbl__link">{seg.text}</span>
            : <span key={i}>{seg.text}</span>
        )}
      </p>
    </div>
  )
}

function MentionBubble({ message, dir }) {
  return (
    <div className={`cht-bbl cht-bbl--text cht-bbl--${dir}`}>
      <p className="cht-bbl__text">
        {message.segments.map((seg, i) =>
          seg.type === 'mention'
            ? <span key={i} className={`cht-bbl__mention cht-bbl__mention--${dir}`}>{seg.text}</span>
            : <span key={i}>{seg.text}</span>
        )}
      </p>
    </div>
  )
}

function QuoteBubble({ message, dir }) {
  return (
    <div className={`cht-bbl__quote-stack cht-bbl__quote-stack--${dir}`}>
      <div className={`cht-bbl cht-bbl--text cht-bbl--${dir}`}>
        <p className="cht-bbl__text">{message.text}</p>
      </div>
      <div className="cht-bbl__quote-ref">
        <p className="cht-bbl__quote-ref-text">
          {message.quote.sender}：{message.quote.text}
        </p>
      </div>
    </div>
  )
}

function VoiceBubble({ message, dir }) {
  return (
    <div className={`cht-bbl cht-bbl--voice cht-bbl--${dir}`}>
      <button className={`cht-bbl__play cht-bbl__play--${dir}`} type="button" aria-label="播放语音">
        <IcVoicePlay width={28} height={28} />
      </button>
      <Waveform dir={dir} />
      <span className={`cht-bbl__duration cht-bbl__duration--${dir}`}>{message.duration}</span>
    </div>
  )
}

function ImageBubble({ message, dir }) {
  return (
    <div className={`cht-bbl cht-bbl--image cht-bbl--${dir}`}>
      <img
        className="cht-bbl__img"
        src={message.src}
        alt="图片"
        width={message.width}
        height={message.height}
        style={{ width: message.width, height: message.height }}
      />
    </div>
  )
}

function CallBubble({ message, dir }) {
  const isVideo = message.callType === 'video'
  return (
    <div className={`cht-bbl cht-bbl--call cht-bbl--${dir}`}>
      <div className={`cht-bbl__call-icon cht-bbl__call-icon--${dir}`}>
        {isVideo
          ? <IcVideoCall width={20} height={20} />
          : <IcPhoneUp   width={20} height={20} />
        }
      </div>
      <div className="cht-bbl__call-info">
        <span className="cht-bbl__call-status">{message.status}</span>
        <span className={`cht-bbl__call-sub cht-bbl__call-sub--${dir}`}>{message.sub}</span>
      </div>
    </div>
  )
}

function CardActionIcon({ type }) {
  if (type === 'play')   return <IcPlay   width={14} height={14} />
  if (type === 'pause')  return <IcPause  width={14} height={14} />
  if (type === 'camera') return <IcCamera width={14} height={14} />
  return null
}

function BrandIconImg({ icon }) {
  if (!icon) return null
  if (typeof icon === 'string') {
    return <img className="cht-card__brand-icon" src={icon} alt="" />
  }
  const Icon = icon
  return <Icon className="cht-card__brand-icon" width={12} height={12} />
}

function LinkCardBubble({ message }) {
  const { card } = message
  const titleRef = useRef(null)
  const [titleWraps, setTitleWraps] = useState(false)
  const hasAction = !!card.action

  useEffect(() => {
    const el = titleRef.current
    if (!el) return
    el.style.webkitLineClamp = '1'
    const wraps = el.scrollHeight > el.clientHeight + 2
    el.style.webkitLineClamp = ''
    setTitleWraps(wraps)
  }, [card.title])

  return (
    <div className="cht-bbl cht-bbl--card">
      <div className="cht-card">
        <div className="cht-card__thumb-shell">
          <img className="cht-card__thumb" src={card.thumb} alt="" />
        </div>
        <div className={`cht-card__body${hasAction ? ' cht-card__body--has-action' : ''}`}>
          <div className="cht-card__texts">
            <span ref={titleRef} className={`cht-card__title${titleWraps ? ' cht-card__title--2line' : ''}`}>{card.title}</span>
            {!titleWraps && card.subtitle && (
              <span className="cht-card__subtitle">{card.subtitle}</span>
            )}
          </div>
          {card.brand && (
            <div className="cht-card__brand">
              {card.brand.isWebLink ? (
                <span className="cht-card__brand-link-icon" aria-hidden="true">
                  <IcLink12 width={12} height={12} />
                </span>
              ) : card.brand.icon ? (
                <BrandIconImg icon={card.brand.icon} />
              ) : null}
              <span className="cht-card__brand-name">{card.brand.name}</span>
            </div>
          )}
        </div>
        {card.action && (
          <div className="cht-card__right-action">
            <button className="cht-card__action-btn" type="button"
              aria-label={card.action.type === 'play' ? '播放' : card.action.type === 'pause' ? '暂停' : '拍同款'}>
              <CardActionIcon type={card.action.type} />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════
   MessageRow — dispatcher
   ══════════════════════════════════════════════════════════ */
export default function MessageRow({ message, contactAvatar, myAvatar }) {
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

  if (message.kind === 'v2') {
    const isNotice = message.type === 'notice'
    const isRead   = message.type === 'read'
    if (isNotice) {
      return (
        <div className="cht-row cht-row--notice" role="note">
          <Bubble type={message.type} data={message.data} />
        </div>
      )
    }
    if (isRead) {
      return (
        <div className={`cht-row cht-row--read cht-row--${message.dir}`}>
          <Bubble type={message.type} format={message.format} data={message.data} perspective={message.dir} />
        </div>
      )
    }
    const v2Dir = message.dir
    const v2IsSent = v2Dir === 'sent'
    const v2Avatar = v2IsSent ? myAvatar : contactAvatar
    return (
      <div className={`cht-row cht-row--${v2Dir}`}>
        {!v2IsSent && <Avatar className="cht-row__avatar" size="36" src={v2Avatar} alt="" />}
        <div className="cht-row__body">
          <Bubble
            type={message.type}
            format={message.format}
            subdivision={message.subdivision}
            state={message.state || 'normal'}
            perspective={v2Dir}
            data={message.data}
          />
        </div>
        {v2IsSent && <Avatar className="cht-row__avatar" size="36" src={v2Avatar} alt="" />}
      </div>
    )
  }

  const dir = message.dir
  const isSent = dir === 'sent'
  const avatar = isSent ? myAvatar : contactAvatar

  let bubble = null
  switch (message.kind) {
    case 'text':      bubble = <TextBubble    message={message} dir={dir} />; break
    case 'link':      bubble = <LinkBubble    message={message} dir={dir} />; break
    case 'mention':   bubble = <MentionBubble message={message} dir={dir} />; break
    case 'quote':     bubble = <QuoteBubble   message={message} dir={dir} />; break
    case 'voice':     bubble = <VoiceBubble   message={message} dir={dir} />; break
    case 'image':     bubble = <ImageBubble    message={message} dir={dir} />; break
    case 'call':      bubble = <CallBubble     message={message} dir={dir} />; break
    case 'card_link': bubble = <LinkCardBubble message={message} />; break
    default:          bubble = <TextBubble     message={message} dir={dir} />
  }

  return (
    <div className={`cht-row cht-row--${dir}`}>
      {!isSent && <Avatar className="cht-row__avatar" size="36" src={avatar} alt="" />}
      <div className="cht-row__body">{bubble}</div>
      {isSent && <Avatar className="cht-row__avatar" size="36" src={avatar} alt="" />}
    </div>
  )
}
