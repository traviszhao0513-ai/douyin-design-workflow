/**
 * Unified chat bubble component — aligned with Figma IMBasicMessage variant set
 * (node 16125:45127 in 🪐 IM UI Kit 2.0).
 *
 * Variant axes (mirrors Figma 1:1):
 *   type         — 16 values, see TYPES below
 *   format       — '-' | 'single' | 'multi' | 'sq' | 'ls' | 'pt' | 'quote_media'
 *                  | 'read_avatars' | 'read_text' | 'comment_1_1' | 'comment_3_4'
 *   subdivision  — voice duration / quote source / read count (see SUBDIVISIONS)
 *   state        — 'normal' | 'invalid' | 'missed' | 'declined' | 'failed' | 'sending'
 *                  | 'comment_invalid' | 'playing' | 'transcribed'
 *   perspective  — 'recv' | 'sent'
 *   theme        — 'light' | 'dark'
 *
 * All styling tokens live in Chat.css; this component is a renderer switch only.
 */

import IcPlay      from '../icons/svg/ic_s_s_play_16_filled.svg?react'
import IcVideoCall from '../icons/svg/ic_s_s_video_20_filled.svg?react'
import IcPhoneUp   from '../icons/svg/ic_s_s_phoneup_20_filled.svg?react'
import IcPause     from '../icons/svg/ic_s_s_pause_16_filled.svg?react'
import IcCamera    from '../icons/svg/ic_s_s_camera_16_filled.svg?react'
import IcDouyin    from '../icons/svg/ic_s_s_douyin_16_filled.svg?react'
import IcShop      from '../icons/svg/ic_s_s_shop_16_filled.svg?react'
import IcLink12    from '../icons/svg/ic_s_s_link_12_outlined.svg?react'
import IcPhoneLinkPlus from '../icons/svg/ic_s_s_phonelinkplus_12_outlined.svg?react'

/* Canonical type keys (English) mapped to Figma 类型 values for reference */
export const TYPES = [
  'text',          // 纯文字
  'link',          // 带链接文字
  'invalid',       // 消息失效提示
  'viewonce',      // 仅看一次
  'announcement',  // 群公告
  'commentshare',  // 分享评论
  'voice',         // 语音
  'audiocall',     // 语音通话
  'videocall',     // 视频通话
  'sticker',       // 表情包
  'image',         // 图片
  'video',         // 视频
  'quote',         // 引用回复
  'status',        // 状态
  'read',          // 已读
  'linkcard',      // 通用链接卡
]

const WAVE_HEIGHTS = [9, 12, 14, 20, 14, 10, 10, 10, 10, 10, 10]

/* ─── Small SVG icons (inline to avoid adding asset files) ─── */
function IcEye({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor">
      <path d="M8 3C4.5 3 1.7 5.3 1 8c.7 2.7 3.5 5 7 5s6.3-2.3 7-5c-.7-2.7-3.5-5-7-5zm0 8a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0-5a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/>
    </svg>
  )
}
function IcMegaphone({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="currentColor">
      <path d="M11 2v10l-5-1.5v-2L3 8.5C2.4 8.3 2 7.7 2 7s.4-1.3 1-1.5l3-1L11 2zM4 9.3l1.5.5V10c0 .8.7 1.5 1.5 1.5S8.5 10.8 8.5 10v-.4L4 8.3v1z"/>
    </svg>
  )
}
function IcWarning({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="currentColor">
      <path d="M7 1L.5 13h13L7 1zm0 4v4m0 2h.01" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
    </svg>
  )
}
function IcPlayFilled({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill="currentColor">
      <path d="M5 3.5v11l9-5.5L5 3.5z"/>
    </svg>
  )
}

/* ─── Waveform (voice) ─── */
function Waveform({ perspective }) {
  return (
    <div className={`cht-wave cht-wave--${perspective}`} aria-hidden="true">
      {WAVE_HEIGHTS.map((h, i) => (
        <span key={i} className="cht-wave__bar" style={{ height: `${h}px` }} />
      ))}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════
   Per-type renderers — each returns only the bubble element.
   Wrapper (<Bubble>) adds perspective/state decorations.
   ═══════════════════════════════════════════════════════════ */

function TextRenderer({ data, perspective }) {
  return (
    <div className={`cht-bbl cht-bbl--text cht-bbl--${perspective}`}>
      <p className="cht-bbl__text">{data.text}</p>
    </div>
  )
}

function LinkRenderer({ data, perspective }) {
  const segs = data.segments || [{ type: 'text', text: data.text || '' }]
  return (
    <div className={`cht-bbl cht-bbl--text cht-bbl--${perspective}`}>
      <p className="cht-bbl__text">
        {segs.map((s, i) =>
          s.type === 'link'    ? <span key={i} className="cht-bbl__link">{s.text}</span> :
          s.type === 'mention' ? <span key={i} className={`cht-bbl__mention cht-bbl__mention--${perspective}`}>{s.text}</span> :
                                 <span key={i}>{s.text}</span>
        )}
      </p>
    </div>
  )
}

function InvalidRenderer({ data }) {
  return (
    <div className="cht-bbl cht-bbl--invalid">
      <IcWarning size={14} />
      <span>{data.text || '消息已失效'}</span>
    </div>
  )
}

function ViewOnceRenderer({ data, perspective, state }) {
  const viewed = state === 'viewed' || data.viewed
  return (
    <div className={`cht-bbl cht-bbl--viewonce cht-bbl--${perspective}${viewed ? ' cht-bbl--viewonce-viewed' : ''}`}>
      <IcEye size={16} />
      <span>{viewed ? '已查看' : (data.text || '仅看一次')}</span>
    </div>
  )
}

function AnnouncementRenderer({ data, perspective }) {
  return (
    <div className={`cht-bbl cht-bbl--announcement cht-bbl--${perspective}`}>
      <div className="cht-bbl__ann-head">
        <IcMegaphone size={12} />
        <span>群公告</span>
      </div>
      {data.title && <h4 className="cht-bbl__ann-title">{data.title}</h4>}
      <p className="cht-bbl__ann-body">{data.body || data.text}</p>
    </div>
  )
}

function CommentShareRenderer({ data, perspective, format }) {
  const ratio = format === 'comment_3_4' ? '3_4' : '1_1'
  return (
    <div className={`cht-bbl cht-bbl--cshare cht-bbl--${perspective}`}>
      <div className={`cht-bbl__cshare-media cht-bbl__cshare-media--${ratio}`}>
        <img src={data.thumb} alt="" />
      </div>
      <div className="cht-bbl__cshare-text">{data.text}</div>
    </div>
  )
}

function VoiceRenderer({ data, perspective, state }) {
  if (state === 'transcribed') {
    return (
      <div className={`cht-bbl cht-bbl--voice-transcript`}>
        <div className={`cht-bbl__voice-head cht-bbl--${perspective}`}>
          <button className={`cht-bbl__play cht-bbl__play--${perspective}`} type="button" aria-label="播放语音">
            <IcPlay width={14} height={14} />
          </button>
          <Waveform perspective={perspective} />
          <span className={`cht-bbl__duration cht-bbl__duration--${perspective}`}>{data.duration || "9''"}</span>
        </div>
        <div className="cht-bbl__voice-body">{data.transcript || '（语音转文字内容）'}</div>
      </div>
    )
  }
  return (
    <div className={`cht-bbl cht-bbl--voice cht-bbl--${perspective}`}>
      <button className={`cht-bbl__play cht-bbl__play--${perspective}`} type="button" aria-label="播放语音">
        {state === 'playing' ? <IcPause width={14} height={14} /> : <IcPlay width={14} height={14} />}
      </button>
      <Waveform perspective={perspective} />
      <span className={`cht-bbl__duration cht-bbl__duration--${perspective}`}>{data.duration || "9''"}</span>
    </div>
  )
}

function CallRenderer({ data, perspective, state, callType }) {
  const stateText = {
    missed: '未接通',
    declined: '已拒绝',
    normal: callType === 'video' ? '视频通话' : '语音通话',
  }[state] || data.status || (callType === 'video' ? '视频通话' : '语音通话')
  const sub = data.sub || (state === 'missed' || state === 'declined' ? '点击回拨' : '时长 00:00')
  return (
    <div className={`cht-bbl cht-bbl--call cht-bbl--${perspective}`}>
      <div className={`cht-bbl__call-icon cht-bbl__call-icon--${perspective}`}>
        {callType === 'video' ? <IcVideoCall width={20} height={20} /> : <IcPhoneUp width={20} height={20} />}
      </div>
      <div className="cht-bbl__call-info">
        <span className="cht-bbl__call-status">{stateText}</span>
        <span className={`cht-bbl__call-sub cht-bbl__call-sub--${perspective}`}>{sub}</span>
      </div>
    </div>
  )
}

function StickerRenderer({ data }) {
  return (
    <div className="cht-bbl cht-bbl--sticker">
      <img className="cht-bbl__sticker-img cht-bbl__sticker-img--sq" src={data.src} alt="表情" />
    </div>
  )
}

function ImageRenderer({ data, perspective, format }) {
  const f = format === 'ls' ? 'ls' : format === 'pt' ? 'pt' : 'sq'
  return (
    <div className={`cht-bbl cht-bbl--image cht-bbl--${perspective}`}>
      <img className={`cht-bbl__media cht-bbl__media--${f}`} src={data.src} alt="图片" />
    </div>
  )
}

function VideoRenderer({ data, perspective, format }) {
  const f = format === 'ls' ? 'ls' : format === 'pt' ? 'pt' : 'sq'
  return (
    <div className={`cht-bbl cht-bbl--video cht-bbl--${perspective}`}>
      <img className={`cht-bbl__media cht-bbl__media--${f}`} src={data.src} alt="视频" />
      <div className="cht-bbl__video-overlay">
        <div className="cht-bbl__video-play"><IcPlayFilled size={16} /></div>
      </div>
      {data.duration && <span className="cht-bbl__video-duration">{data.duration}</span>}
    </div>
  )
}

/* Quoted-content renderer — chooses between text-only and media-inclusive refs */
function QuoteRenderer({ data, perspective, subdivision }) {
  const q = data.quote || {}
  const senderPrefix = q.sender ? `${q.sender}：` : ''
  // subdivision determines ref card type; fallback = text
  const refNode = (() => {
    switch (subdivision) {
      case 'quote_small_emoji':
        return <span>{senderPrefix}[小表情]</span>
      case 'quote_big_emoji':
        return <span>{senderPrefix}[大表情]</span>
      case 'quote_sticker':
        return <span>{senderPrefix}[表情包]</span>
      case 'quote_voice':
        return <span>{senderPrefix}[语音]</span>
      case 'quote_voice_playing':
        return <span>{senderPrefix}[语音播放中…]</span>
      case 'quote_video':
        return <span>{senderPrefix}[作品]</span>
      case 'quote_live':
        return <span>{senderPrefix}[直播]</span>
      case 'quote_card':
        return <span>{senderPrefix}[名片]</span>
      case 'quote_redpacket':
        return <span>{senderPrefix}[红包]</span>
      case 'quote_image_swap':
        return <span>{senderPrefix}[以图换图]</span>
      default:
        return <span>{senderPrefix}{q.text || '（原消息）'}</span>
    }
  })()
  return (
    <div className={`cht-bbl__quote-stack cht-bbl__quote-stack--${perspective}`}>
      <div className={`cht-bbl cht-bbl--text cht-bbl--${perspective}`}>
        <p className="cht-bbl__text">{data.text}</p>
      </div>
      <div className="cht-bbl__quote-ref">
        <p className="cht-bbl__quote-ref-text">{refNode}</p>
      </div>
    </div>
  )
}

/* Status notice — centered row, no bubble wrapper needed */
function StatusRenderer({ data }) {
  return <div className="cht-bbl cht-bbl--status">{data.text || '消息通知'}</div>
}

/* Read receipt — avatars or text summary */
function ReadReceiptRenderer({ data, format }) {
  if (format === 'read_text') {
    return (
      <div className="cht-bbl cht-bbl--read">
        <span>{data.text || `${data.count || 0} 人已读`}</span>
      </div>
    )
  }
  const avatars = data.avatars || []
  return (
    <div className="cht-bbl cht-bbl--read">
      <div className="cht-bbl__read-avatars">
        {avatars.slice(0, 4).map((src, i) => <img key={i} src={src} alt="" />)}
      </div>
      <span>{`${avatars.length} 人已读`}</span>
    </div>
  )
}

/* 通用链接卡 (Universal link card) — aligns with Figma 16011:36553
 * Layout: [88×88 thumb] · [title + subtitle + source] · [optional action btn]
 * Title rules: single line by default; 2 lines only when subtitle is absent.
 */
function LinkCardRenderer({ data }) {
  const card = data.card || data
  const hasAction = !!card.action
  const titleTwoLine = !card.subtitle

  /* Brand icon is always rendered on the left of 来源信息.
   * Priority: web link chain icon → custom string src → custom component → placeholder.
   * Placeholder uses --cht-brand-placeholder token so it stays consistent cross-theme. */
  const brandIcon = card.brand?.icon
  const brandColor = card.brand?.color
  const renderBrandIcon = () => {
    if (card.brand?.isWebLink) {
      return <span className="cht-card__brand-icon cht-card__brand-icon--link" aria-hidden="true"><IcPhoneLinkPlus /></span>
    }
    if (typeof brandIcon === 'string') return <img className="cht-card__brand-icon" src={brandIcon} alt="" />
    if (brandIcon) {
      const Icon = brandIcon
      return <span className="cht-card__brand-icon" style={brandColor ? { background: brandColor } : undefined}><Icon /></span>
    }
    // Default placeholder — 12×12 solid rounded square (matches Figma placeholder style)
    return <span className="cht-card__brand-icon cht-card__brand-icon--placeholder" style={brandColor ? { background: brandColor } : undefined} aria-hidden="true" />
  }
  const actionIcon = (type) => {
    if (type === 'play')   return <IcPlay   width={14} height={14} />
    if (type === 'pause')  return <IcPause  width={14} height={14} />
    if (type === 'camera') return <IcCamera width={14} height={14} />
    return null
  }

  return (
    <div className="cht-bbl cht-bbl--card">
      <div className="cht-card">
        <div className="cht-card__thumb-shell">
          <img className="cht-card__thumb" src={card.thumb} alt="" />
        </div>
        <div className={`cht-card__body${hasAction ? ' cht-card__body--has-action' : ''}`}>
          <div className="cht-card__texts">
            <span className={`cht-card__title${titleTwoLine ? ' cht-card__title--2line' : ''}`}>{card.title}</span>
            {card.subtitle && <span className="cht-card__subtitle">{card.subtitle}</span>}
          </div>
          <div className="cht-card__divider" aria-hidden="true" />
          <div className="cht-card__brand">
            {renderBrandIcon()}
            <span className="cht-card__brand-name">{card.brand?.name || '来源信息'}</span>
          </div>
        </div>
        {card.action && (
          <div className="cht-card__right-action">
            <button className="cht-card__action-btn" type="button" aria-label="动作">
              {actionIcon(card.action.type)}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════
   Unified <Bubble> — dispatches to renderer + applies state wrapper
   ═══════════════════════════════════════════════════════════ */

export default function Bubble({
  type,
  format = '-',
  subdivision = '-',
  state = 'normal',
  perspective = 'recv',
  data = {},
  // pass-through for legacy callers that put payload on `message`
  message,
}) {
  const payload = data && Object.keys(data).length ? data : (message || {})
  let body
  switch (type) {
    case 'text':          body = <TextRenderer data={payload} perspective={perspective} />; break
    case 'link':          body = <LinkRenderer data={payload} perspective={perspective} />; break
    case 'mention':       body = <LinkRenderer data={payload} perspective={perspective} />; break
    case 'invalid':       body = <InvalidRenderer data={payload} />; break
    case 'viewonce':      body = <ViewOnceRenderer data={payload} perspective={perspective} state={state} />; break
    case 'announcement':  body = <AnnouncementRenderer data={payload} perspective={perspective} />; break
    case 'commentshare':  body = <CommentShareRenderer data={payload} perspective={perspective} format={format} />; break
    case 'voice':         body = <VoiceRenderer data={payload} perspective={perspective} state={state} />; break
    case 'audiocall':     body = <CallRenderer data={payload} perspective={perspective} state={state} callType="audio" />; break
    case 'videocall':     body = <CallRenderer data={payload} perspective={perspective} state={state} callType="video" />; break
    case 'sticker':       body = <StickerRenderer data={payload} />; break
    case 'image':         body = <ImageRenderer data={payload} perspective={perspective} format={format} />; break
    case 'video':         body = <VideoRenderer data={payload} perspective={perspective} format={format} />; break
    case 'quote':         body = <QuoteRenderer data={payload} perspective={perspective} subdivision={subdivision} />; break
    case 'status':        body = <StatusRenderer data={payload} />; break
    case 'read':          body = <ReadReceiptRenderer data={payload} format={format} />; break
    case 'card_link':
    case 'linkcard':      body = <LinkCardRenderer data={payload} />; break
    default:              body = <TextRenderer data={payload} perspective={perspective} />
  }

  // Status indicator (sending / failed) appears on the tail side of sent bubbles
  const showStatus = state === 'sending' || state === 'failed'
  const isInvalid  = state === 'invalid' || state === 'comment_invalid'

  if (!showStatus && !isInvalid) return body

  const wrapperClass = [
    'cht-bw',
    `cht-bw--${perspective}`,
    isInvalid && 'cht-bw--invalid',
  ].filter(Boolean).join(' ')

  return (
    <div className={wrapperClass}>
      <div className="cht-bw__main">{body}</div>
      {showStatus && (
        <div className="cht-bw__status" aria-label={state === 'sending' ? '发送中' : '发送失败'}>
          {state === 'sending' ? <div className="cht-bw__spinner" /> : <div className="cht-bw__error">!</div>}
        </div>
      )}
    </div>
  )
}

/* Legacy named exports — thin wrappers over Bubble so Chat.jsx callers keep working. */
export const TextBubble     = ({ message, dir }) => <Bubble type="text"      data={message} perspective={dir} />
export const LinkBubble     = ({ message, dir }) => <Bubble type="link"      data={message} perspective={dir} />
export const MentionBubble  = ({ message, dir }) => <Bubble type="link"      data={message} perspective={dir} />
export const QuoteBubble    = ({ message, dir }) => <Bubble type="quote"     data={message} perspective={dir} />
export const VoiceBubble    = ({ message, dir }) => <Bubble type="voice"     data={message} perspective={dir} />
export const ImageBubble    = ({ message, dir }) => <Bubble type="image"     data={message} perspective={dir} />
export const CallBubble     = ({ message, dir }) =>
  <Bubble type={message.callType === 'video' ? 'videocall' : 'audiocall'}
          data={message} perspective={dir}
          state={message.status === '未接通' ? 'missed' : message.status === '已拒绝' ? 'declined' : 'normal'} />
export const LinkCardBubble = ({ message })      => <Bubble type="card_link" data={message} />
