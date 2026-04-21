import { useState, useRef, useEffect } from 'react'
import './Chat.css'
import Bubble from '../components/im/Bubble'
import Avatar from '../../Douyin_design_system/ui/components/Avatar/Avatar'
import ChatTopBar from '../components/im/ChatTopBar'
import InputBar from '../components/im/InputBar'

/* ── Bubble-specific icons (from system icon library) ── */
import IcPlay      from '../icons/svg/ic_s_s_play_16_filled.svg?react'
import IcVideoCall from '../icons/svg/ic_s_s_video_20_filled.svg?react'
import IcPhoneUp   from '../icons/svg/ic_s_s_phoneup_20_filled.svg?react'
/* ── Card action icons ── */
import IcPause     from '../icons/svg/ic_s_s_pause_16_filled.svg?react'
import IcCamera    from '../icons/svg/ic_s_s_camera_16_filled.svg?react'
/* ── Card brand icons (12×12) ── */
import IcDouyin    from '../icons/svg/ic_s_s_douyin_16_filled.svg?react'
import IcShop      from '../icons/svg/ic_s_s_shop_16_filled.svg?react'
import IcMusicNote from '../icons/svg/ic_s_s_quaver_12_filled.svg?react'
import IcEffect    from '../icons/svg/ic_s_s_meteorcameralogo_12_filled.svg?react'
import IcLink12    from '../icons/svg/ic_s_s_link_12_outlined.svg?react'

/* ── Avatar URLs (pravatar — loads in browser) ── */
const ASSETS = {
  avatarLeft:  'https://i.pravatar.cc/100?u=leftavatar',
  avatarRight: 'https://i.pravatar.cc/100?u=rightavatar',
}

/* ── Quick reply chips — emoji strings ── */
const QUICK_REPLIES = [
  { id: 'poke',   emoji: '👋',  label: '戳一戳' },
  { id: 'heart',  emoji: '❤️',  label: '比个心' },
  { id: 'laugh',  emoji: '🤔',  label: '在干嘛' },
  { id: 'happy',  emoji: '😊',  label: '很开心' },
  { id: 'poke2',  emoji: '🤩',  label: '好开心' },
  { id: 'happy2', emoji: '💩',  label: '转便便' },
]

/* ══════════════════════════════════════════════════════════
   Demo message data — covers every bubble variant
   ══════════════════════════════════════════════════════════ */
const MESSAGES = [
  // ── Timestamp divider
  { id: 1,  kind: 'time',    text: '周一 下午 3:40' },

  // ── Plain text
  { id: 2,  kind: 'text',    dir: 'recv', text: '这个视频好好笑，笑死我了' },
  { id: 3,  kind: 'text',    dir: 'sent', text: '哈哈哈，果断关注了' },

  // ── Link text
  { id: 4,  kind: 'link',    dir: 'recv',
    segments: [
      { type: 'text', text: '你看看这个：' },
      { type: 'link', text: 'https://www.douyin.com' },
    ]
  },

  // ── Mention
  { id: 5,  kind: 'mention', dir: 'recv',
    segments: [
      { type: 'mention', text: '@所有人' },
      { type: 'text', text: ' 欢迎加入本群！' },
    ]
  },

  // ── Voice message (received)
  { id: 6,  kind: 'voice',   dir: 'recv', duration: "9''", waveform: [3,5,8,13,10,6,9,4,7,11,8,5] },

  // ── Voice message (sent)
  { id: 7,  kind: 'voice',   dir: 'sent', duration: "23''", waveform: [5,9,14,8,12,6,10,15,7,9,5,11] },

  // ── Timestamp divider
  { id: 8,  kind: 'time',    text: '下午 4:10' },

  // ── Quote / reply (received)
  { id: 9,  kind: 'quote',   dir: 'recv',
    quote: { sender: '合川路林志玲', text: '这个视频好好笑，笑死我了' },
    text: '是的，太好笑了！',
  },

  // ── Quote / reply (sent)
  { id: 10, kind: 'quote',   dir: 'sent',
    quote: { sender: '合川路林志玲', text: '你看看这个：https://www.douyin.com' },
    text: '好的，我去看看',
  },

  // ── Image (received)
  { id: 11, kind: 'image',   dir: 'recv',
    src: 'https://picsum.photos/seed/dy1/200/260',
    width: 168, height: 224,
  },

  // ── Image (sent)
  { id: 12, kind: 'image',   dir: 'sent',
    src: 'https://picsum.photos/seed/dy2/260/200',
    width: 218, height: 168,
  },

  // ── Video call record
  { id: 13, kind: 'call',    dir: 'recv', callType: 'video', status: '已拒绝',  sub: '点击回拨' },
  { id: 14, kind: 'call',    dir: 'sent', callType: 'video', status: '视频通话', sub: '时长 12:45' },

  // ── Voice call record
  { id: 15, kind: 'call',    dir: 'recv', callType: 'audio', status: '未接通',  sub: '点击回拨' },

  // ── System message
  { id: 16, kind: 'system',  text: '你们已成为抖音好友，可以开始聊天了' },

  // ── Long multi-line text
  { id: 17, kind: 'text',    dir: 'sent', text: '刚到，马上。顺便帮我带杯咖啡吧，最近有点困' },
  { id: 18, kind: 'text',    dir: 'recv', text: '好的，拿铁还是美式？' },
  { id: 19, kind: 'text',    dir: 'sent', text: '美式，谢了' },

  // ── Timestamp divider
  { id: 20, kind: 'time',    text: '下午 4:30' },

  // ── Link card — shared video (received)
  { id: 21, kind: 'card_link', dir: 'recv',
    card: {
      thumb: '/assets/cards/card_topic.png',
      title: '这个视频也太好笑了😂 周末去哪玩 #日常生活',
      subtitle: '抖音短视频',
      brand: { icon: IcDouyin, name: '抖音' },
    }
  },

  // ── Link card — shared product (sent)
  { id: 22, kind: 'card_link', dir: 'sent',
    card: {
      thumb: '/assets/cards/card_pet.png',
      title: '夏季新款休闲短裤男宽松运动裤纯棉薄款',
      subtitle: '¥ 89.00',
      brand: { icon: IcShop, name: '抖音小店' },
    }
  },

  // ── Link card — no brand footer, two text lines (received)
  { id: 23, kind: 'card_link', dir: 'recv',
    card: {
      thumb: '/assets/cards/card_news.png',
      title: '北京今晚有雨，记得带伞',
      subtitle: '来自：今日头条',
    }
  },

  // ── Timestamp divider
  { id: 24, kind: 'time', text: '下午 5:00' },

  // ── Link card — music, play state (received)
  { id: 25, kind: 'card_link', dir: 'recv',
    card: {
      thumb: '/assets/cards/card_music_play.png',
      title: '任我行',
      subtitle: '陈奕迅',
      brand: { icon: '/assets/card_icon_music.png', name: '汽水音乐' },
      action: { type: 'play' },
    }
  },

  // ── Link card — music, pause state (sent)
  { id: 26, kind: 'card_link', dir: 'sent',
    card: {
      thumb: '/assets/cards/card_music_pause.png',
      title: '任我行',
      subtitle: '陈奕迅',
      brand: { icon: '/assets/card_icon_music.png', name: '汽水音乐' },
      action: { type: 'pause' },
    }
  },

  // ── Link card — effect / sticker with camera button (received)
  { id: 27, kind: 'card_link', dir: 'recv',
    card: {
      thumb: '/assets/cards/card_effect.png',
      title: '落日黄昏',
      subtitle: '8.7 万次使用',
      brand: { icon: '/assets/card_icon_effect.png', name: '特效' },
      action: { type: 'camera' },
    }
  },

  // ── Link card — webpage link (received)
  { id: 28, kind: 'card_link', dir: 'recv',
    card: {
      thumb: '/assets/cards/card_xlink.png',
      title: 'Clawdbot 教程01 模型推理和思维链',
      subtitle: 'https://x.com/op7418/status/1234567890',
      brand: { icon: '/assets/card_icon_link.png', name: '网页链接' },
    }
  },

  // ── Extended types — routed via unified <Bubble>
  { id: 29, kind: 'v2', type: 'sticker',  dir: 'recv',
    data: { src: 'https://picsum.photos/seed/sticker1/264/264' } },
  { id: 30, kind: 'v2', type: 'video',    dir: 'sent', format: 'sq',
    data: { src: 'https://picsum.photos/seed/v1/300/300', duration: '00:12' } },
  { id: 31, kind: 'v2', type: 'viewonce', dir: 'recv', data: {} },
  { id: 32, kind: 'v2', type: 'status',   data: { text: '你撤回了一条消息' } },
  { id: 33, kind: 'v2', type: 'announcement', dir: 'recv', data: {
    title: '【周会通知】', body: '本周三下午 3 点在 3 楼会议室召开例会，请各位同学准时参加。',
  } },
  { id: 35, kind: 'v2', type: 'read', dir: 'sent', format: 'read_text', data: { count: 3 } },
]

/* ══════════════════════════════════════════════════════════
   Bubble sub-components
   ══════════════════════════════════════════════════════════ */

/* Exact waveform heights from Figma node measurement (px) */
const WAVE_HEIGHTS = [9, 12, 14, 20, 14, 10, 10, 10, 10, 10, 10]

/** Waveform bars for voice messages — 3px wide, 3px gap, fixed heights from Figma */
function Waveform({ dir }) {
  return (
    <div className={`cht-wave cht-wave--${dir}`} aria-hidden="true">
      {WAVE_HEIGHTS.map((h, i) => (
        <span key={i} className="cht-wave__bar" style={{ height: `${h}px` }} />
      ))}
    </div>
  )
}

/** Plain text bubble */
function TextBubble({ message, dir }) {
  return (
    <div className={`cht-bbl cht-bbl--text cht-bbl--${dir}`}>
      <p className="cht-bbl__text">{message.text}</p>
    </div>
  )
}

/** Link / mixed inline bubble */
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

/** @mention bubble */
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

/**
 * Quote / reply bubble
 * Figma structure: TWO separate cards stacked (gap 4px), NOT nested.
 * Top = main reply bubble (white/blue), Bottom = quoted reference card (rgba(22,24,35,0.05))
 */
function QuoteBubble({ message, dir }) {
  return (
    <div className={`cht-bbl__quote-stack cht-bbl__quote-stack--${dir}`}>
      {/* Main reply — on top */}
      <div className={`cht-bbl cht-bbl--text cht-bbl--${dir}`}>
        <p className="cht-bbl__text">{message.text}</p>
      </div>
      {/* Quoted reference — below, neutral bg */}
      <div className="cht-bbl__quote-ref">
        <p className="cht-bbl__quote-ref-text">
          {message.quote.sender}：{message.quote.text}
        </p>
      </div>
    </div>
  )
}

/** Voice message bubble — play button always on LEFT per Figma spec */
function VoiceBubble({ message, dir }) {
  return (
    <div className={`cht-bbl cht-bbl--voice cht-bbl--${dir}`}>
      <button className={`cht-bbl__play cht-bbl__play--${dir}`} type="button" aria-label="播放语音">
        <IcPlay width={14} height={14} />
      </button>
      <Waveform dir={dir} />
      <span className={`cht-bbl__duration cht-bbl__duration--${dir}`}>{message.duration}</span>
    </div>
  )
}

/** Image bubble */
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

/** Call record bubble */
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

/* ── Action button icons ──────────────────────────────────── */
function CardActionIcon({ type }) {
  if (type === 'play')   return <IcPlay   width={14} height={14} />
  if (type === 'pause')  return <IcPause  width={14} height={14} />
  if (type === 'camera') return <IcCamera width={14} height={14} />
  return null
}

/* ── Brand icon: SVG component ref or image URL ── */
function BrandIconImg({ icon }) {
  if (!icon) return null
  if (typeof icon === 'string') {
    return <img className="cht-card__brand-icon" src={icon} alt="" />
  }
  const Icon = icon
  return <Icon className="cht-card__brand-icon" width={12} height={12} />
}

/** Link card bubble — message_card_link
 *  Subtypes:
 *    - Standard: title + subtitle + brand icon + name
 *    - With action: play / pause / camera button on right (32px circle)
 *    - Webpage: chain link icon as brand, URL as subtitle
 *  Title rule: wraps → 2 lines, hide subtitle; fits → 1 line, show subtitle
 */
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
        {/* Left thumbnail */}
        <div className="cht-card__thumb-shell">
          <img className="cht-card__thumb" src={card.thumb} alt="" />
        </div>

        {/* Middle text area — no right margin when action button present */}
        <div className={`cht-card__body${hasAction ? ' cht-card__body--has-action' : ''}`}>
          <div className="cht-card__texts">
            <span ref={titleRef} className="cht-card__title">{card.title}</span>
            {!titleWraps && card.subtitle && (
              <span className="cht-card__subtitle">{card.subtitle}</span>
            )}
          </div>
          {card.brand && (
            <div className="cht-card__brand">
              {card.brand.isWebLink ? (
                /* Chain link icon for webpage cards */
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

        {/* Right action button — play / pause / camera */}
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
   Message row — avatar + bubble + status
   ══════════════════════════════════════════════════════════ */

function MessageRow({ message, contactAvatar, myAvatar }) {
  /* ── Timestamp divider ── */
  if (message.kind === 'time') {
    return (
      <div className="cht-row cht-row--time" role="separator">
        <span className="cht-row__timestamp">{message.text}</span>
      </div>
    )
  }

  /* ── Centered system notification ── */
  if (message.kind === 'system') {
    return (
      <div className="cht-row cht-row--system" role="note">
        <span className="cht-row__system-text">{message.text}</span>
      </div>
    )
  }

  /* ── Extended types (v2) — dispatched via unified <Bubble> ── */
  if (message.kind === 'v2') {
    const isStatus = message.type === 'status'
    const isRead   = message.type === 'read'
    if (isStatus) {
      return (
        <div className="cht-row cht-row--status" role="note">
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

  const dir  = message.dir         // 'sent' | 'recv'
  const isSent = dir === 'sent'
  const avatar = isSent ? myAvatar : contactAvatar

  /* ── Pick bubble variant ── */
  let bubble = null
  switch (message.kind) {
    case 'text':    bubble = <TextBubble    message={message} dir={dir} />; break
    case 'link':    bubble = <LinkBubble    message={message} dir={dir} />; break
    case 'mention': bubble = <MentionBubble message={message} dir={dir} />; break
    case 'quote':   bubble = <QuoteBubble   message={message} dir={dir} />; break
    case 'voice':   bubble = <VoiceBubble   message={message} dir={dir} />; break
    case 'image':     bubble = <ImageBubble    message={message} dir={dir} />; break
    case 'call':      bubble = <CallBubble     message={message} dir={dir} />; break
    case 'card_link': bubble = <LinkCardBubble message={message} />; break
    default:          bubble = <TextBubble     message={message} dir={dir} />
  }

  return (
    <div className={`cht-row cht-row--${dir}`}>
      {!isSent && <Avatar className="cht-row__avatar" size="36" src={avatar} alt="" />}
      <div className="cht-row__body">
        {bubble}
      </div>
      {isSent && <Avatar className="cht-row__avatar" size="36" src={avatar} alt="" />}
    </div>
  )
}

/* ══════════════════════════════════════════════════════════
   Chrome sub-components
   ══════════════════════════════════════════════════════════ */

function ChatStatusBar() {
  return (
    <div className="cht-status-bar" aria-hidden="true">
      <span className="cht-status-bar__time">9:41</span>
      <div className="cht-status-bar__icons">
        {/* Cellular */}
        <svg width="17" height="11" viewBox="0 0 17 11" fill="currentColor">
          <rect x="0"    y="7"   width="3.5" height="4"   rx="0.7" />
          <rect x="4.5"  y="4.5" width="3.5" height="6.5" rx="0.7" />
          <rect x="9"    y="2"   width="3.5" height="9"   rx="0.7" />
          <rect x="13.5" y="0"   width="3.5" height="11"  rx="0.7" opacity="0.3" />
        </svg>
        {/* WiFi */}
        <svg width="16" height="11" viewBox="0 0 16 11" fill="currentColor">
          <circle cx="8" cy="9.5" r="1.5" />
          <path d="M4.8 6.8a4.5 4.5 0 0 1 6.4 0l1.1-1.1a6.1 6.1 0 0 0-8.6 0l1.1 1.1z" />
          <path d="M1.9 3.9a8.6 8.6 0 0 1 12.2 0L15.2 2.8A10.2 10.2 0 0 0 .8 2.8l1.1 1.1z" />
        </svg>
        {/* Battery */}
        <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
          <rect x="0.5" y="0.5" width="21" height="11" rx="2.5" stroke="currentColor" strokeWidth="1" />
          <rect x="22" y="3.5" width="2" height="5" rx="1" fill="currentColor" />
          <rect x="2"  y="2"   width="16" height="8" rx="1.5" fill="currentColor" />
        </svg>
      </div>
    </div>
  )
}

function ConversationFlow({ contactAvatar, myAvatar }) {
  return (
    <section className="cht-flow" aria-label="对话内容">
      <div className="cht-flow__inner">
        {MESSAGES.map((msg) => (
          <MessageRow
            key={msg.id}
            message={msg}
            contactAvatar={contactAvatar}
            myAvatar={myAvatar}
          />
        ))}
      </div>
    </section>
  )
}

function QuickReplyChips() {
  return (
    <div className="cht-acb" aria-label="快捷回复">
      <div className="cht-acb__scroll">
        {QUICK_REPLIES.map((item) => (
          <button key={item.id} className="cht-acb__chip" type="button">
            <span className="cht-acb__emoji" aria-hidden="true">{item.emoji}</span>
            <span className="cht-acb__label">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

function HomeIndicator() {
  return (
    <div className="cht-home-indicator" aria-hidden="true">
      <div className="cht-home-indicator__pill" />
    </div>
  )
}

/* ══════════════════════════════════════════════════════════
   Page export
   ══════════════════════════════════════════════════════════ */

export default function Chat({ onChange, contactName, contactAvatar }) {
  const [showKeyboard, setShowKeyboard] = useState(false)
  const handleBack    = () => onChange?.('messages')
  const handlePreview = () => onChange?.('bubblepreview')

  const displayName   = contactName   || '合川路林志玲'
  const displayAvatar = contactAvatar || ASSETS.avatarLeft

  return (
    <div className="cht-page">
      <ChatStatusBar />
      <ChatTopBar
        contactName={displayName}
        contactAvatar={displayAvatar}
        onBack={handleBack}
        onPreview={handlePreview}
      />
      <ConversationFlow
        contactAvatar={displayAvatar}
        myAvatar={ASSETS.avatarRight}
      />
      <QuickReplyChips />
      <InputBar showKeyboard={showKeyboard} onToggleKeyboard={setShowKeyboard} />
      <HomeIndicator />
    </div>
  )
}
