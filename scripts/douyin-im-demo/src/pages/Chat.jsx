import { useState, useRef } from 'react'
import './Chat.css'

/* ── Figma SVG icons (exported from IM UI Kit 2.0) ── */
import IcBack    from '../icons/chat/ic_titlebar_back.svg?react'
import IcVideo   from '../icons/chat/ic_titlebar_video.svg?react'
import IcMore    from '../icons/chat/ic_titlebar_more.svg?react'
import IcModule  from '../icons/chat/ic_im_module.svg?react'
import IcVoice   from '../icons/chat/ic_im_voice.svg?react'
import IcSticker from '../icons/chat/ic_im_sticker.svg?react'
import IcPlus    from '../icons/chat/ic_im_plus.svg?react'
/* ── Bubble-specific icons (from system icon library) ── */
import IcPlay      from '../icons/svg/ic_s_s_play_16_filled.svg?react'
import IcVideoCall from '../icons/svg/ic_s_s_video_20_filled.svg?react'
import IcPhoneUp   from '../icons/svg/ic_s_s_phoneup_20_filled.svg?react'

/* ── Asset URLs from Figma ── */
const ASSETS = {
  cellular: 'https://www.figma.com/api/mcp/asset/aac5f237-a624-412e-8e09-7f3a90641f23',
  wifi: 'https://www.figma.com/api/mcp/asset/8d357c7c-e44a-497c-92b0-8e67d055e5b6',
  battery: 'https://www.figma.com/api/mcp/asset/90b4bd2d-3747-4e1e-a7bf-a6bb64744bc3',
  emojiPoke: 'https://www.figma.com/api/mcp/asset/289576bf-6fb2-4b45-b262-30b0fe7e9aaf',
  emojiHeart: 'https://www.figma.com/api/mcp/asset/22dbbb8e-e41a-4ab9-92ae-4721b9e71e2e',
  emojiLaugh: 'https://www.figma.com/api/mcp/asset/404e2821-184a-46ec-95dc-deac3e6975ec',
  emojiHappy: 'https://www.figma.com/api/mcp/asset/165b3cad-0a56-4782-9e4b-046e71ef17bf',
  avatarLeft: 'https://www.figma.com/api/mcp/asset/c7b48746-b3ce-49a9-8884-55c6bcce2fc7',
  avatarRight: 'https://www.figma.com/api/mcp/asset/dab287a5-2f57-4cd5-af7d-09f667b8d27c',
}

const QUICK_REPLIES = [
  { id: 'poke',   emoji: ASSETS.emojiPoke,  label: '戳一戳' },
  { id: 'heart',  emoji: ASSETS.emojiHeart, label: '比个心' },
  { id: 'laugh',  emoji: ASSETS.emojiLaugh, label: '在干嘛' },
  { id: 'happy',  emoji: ASSETS.emojiHappy, label: '很开心' },
  { id: 'poke2',  emoji: ASSETS.emojiPoke,  label: '戳一戳' },
  { id: 'happy2', emoji: ASSETS.emojiHappy, label: '转便便' },
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
    <div className="cht-bbl__quote-stack">
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

/** Voice message bubble */
function VoiceBubble({ message, dir }) {
  return (
    <div className={`cht-bbl cht-bbl--voice cht-bbl--${dir}`}>
      {dir === 'recv' && (
        <button className={`cht-bbl__play cht-bbl__play--${dir}`} type="button" aria-label="播放语音">
          <IcPlay width={14} height={14} />
        </button>
      )}
      <Waveform dir={dir} />
      <span className={`cht-bbl__duration cht-bbl__duration--${dir}`}>{message.duration}</span>
      {dir === 'sent' && (
        <button className={`cht-bbl__play cht-bbl__play--${dir}`} type="button" aria-label="播放语音">
          <IcPlay width={14} height={14} />
        </button>
      )}
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
    case 'image':   bubble = <ImageBubble   message={message} dir={dir} />; break
    case 'call':    bubble = <CallBubble    message={message} dir={dir} />; break
    default:        bubble = <TextBubble    message={message} dir={dir} />
  }

  return (
    <div className={`cht-row cht-row--${dir}`}>
      {!isSent && <img className="cht-row__avatar" src={avatar} alt="" />}
      <div className="cht-row__body">
        {bubble}
      </div>
      {isSent && <img className="cht-row__avatar" src={avatar} alt="" />}
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
        <img className="cht-status-bar__cellular" src={ASSETS.cellular} alt="" />
        <img className="cht-status-bar__wifi"     src={ASSETS.wifi}     alt="" />
        <div className="cht-status-bar__battery">
          <img className="cht-status-bar__battery-outline" src={ASSETS.battery} alt="" />
          <span className="cht-status-bar__battery-fill" />
        </div>
      </div>
    </div>
  )
}

function ChatNavBar({ contactName, contactAvatar, onBack, onPreview }) {
  return (
    <header className="cht-nav">
      <div className="cht-nav__left">
        <button className="cht-nav__back" type="button" aria-label="返回" onClick={onBack}>
          <IcBack width={24} height={24} />
        </button>
        <div className="cht-nav__contact">
          <img className="cht-nav__avatar" src={contactAvatar} alt="" />
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
            <img className="cht-acb__emoji" src={item.emoji} alt="" />
            <span className="cht-acb__label">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

function ChatInputBar({ showKeyboard, onToggleKeyboard }) {
  const inputRef = useRef(null)

  const handleFieldClick = () => {
    onToggleKeyboard(true)
    setTimeout(() => inputRef.current?.focus(), 50)
  }

  return (
    <div className="cht-input-bar">
      <div className="cht-input-bar__row">
        <button className="cht-input-bar__icon-btn" type="button" aria-label="更多功能"><IcModule width={24} height={24} /></button>
        <div className="cht-input-bar__field" onClick={handleFieldClick}>
          {!showKeyboard && <span className="cht-input-bar__placeholder">发消息</span>}
          <input
            ref={inputRef}
            className="cht-input-bar__input"
            type="text"
            enterKeyHint="send"
            onBlur={() => onToggleKeyboard(false)}
          />
        </div>
        <div className="cht-input-bar__actions">
          <button className="cht-input-bar__icon-btn" type="button" aria-label="语音消息"><IcVoice width={24} height={24} /></button>
          <button className="cht-input-bar__icon-btn" type="button" aria-label="表情"><IcSticker width={24} height={24} /></button>
          <button className="cht-input-bar__icon-btn" type="button" aria-label="展开"><IcPlus width={24} height={24} /></button>
        </div>
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
      <ChatNavBar
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
      <ChatInputBar showKeyboard={showKeyboard} onToggleKeyboard={setShowKeyboard} />
      <HomeIndicator />
    </div>
  )
}
