import { useState, useRef, useEffect } from 'react'
import './Chat.css'
import '../components/im/GroupSpace.css'
import Bubble from '../components/im/Bubble'
import Avatar from '../../Douyin_design_system/ui/components/Avatar/Avatar'
import ChatTopBar from '../components/im/ChatTopBar'
import GroupAnnouncementsView from '../components/im/GroupAnnouncementsView'
import GroupCollectionView from '../components/im/GroupCollectionView'
import GroupPinnedView from '../components/im/GroupPinnedView'
import GroupSettingsView from '../components/im/GroupSettingsView'
import GroupSpaceNav from '../components/im/GroupSpaceNav'
import InputBar from '../components/im/InputBar'
import {
  GROUP_ANNOUNCEMENTS,
  GROUP_COLLECTION_FILES,
  GROUP_COLLECTION_MEDIA,
  GROUP_COLLECTION_PICKER,
  GROUP_PINNED_ITEMS,
} from '../components/im/groupSpaceData'

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

const GROUP_MEMBER_AVATARS = {
  owner: 'https://i.pravatar.cc/100?u=group-owner',
  mia: 'https://i.pravatar.cc/100?u=group-mia',
  neil: 'https://i.pravatar.cc/100?u=group-neil',
  user: ASSETS.avatarRight,
}

function getDefaultExpanded(variant, role, dots) {
  if (variant === 'experiment1') return true
  if (role === 'owner') return true
  return Boolean(dots.announcements || dots.pins)
}

function buildCollectionNotice(groupName, items) {
  const imageCount = items.filter((item) => item.kind === 'image').length
  const videoCount = items.filter((item) => item.kind === 'video').length
  const fileCount = items.filter((item) => item.kind === 'file').length
  const mediaCount = imageCount + videoCount

  let middle = ` 添加了 ${items.length} 个内容到 `
  if (fileCount && !mediaCount) {
    middle = ` 添加了 ${fileCount} 个文件到 `
  } else if (mediaCount && !fileCount) {
    middle = imageCount && videoCount
      ? ` 添加了 ${mediaCount} 个照片与视频到 `
      : imageCount
      ? ` 添加了 ${imageCount} 张照片到 `
      : ` 添加了 ${videoCount} 个视频到 `
  }

  return {
    id: `grp-notice-${Date.now()}`,
    kind: 'system',
    parts: [
      { text: groupName, accent: true },
      { text: middle },
      { text: '群收藏', accent: true },
    ],
  }
}

const PUBLIC_GROUP_MESSAGES = [
  { id: 'grp-time-1', kind: 'time', text: '今天 17:40' },
  {
    id: 'grp-msg-1',
    kind: 'text',
    dir: 'recv',
    avatar: GROUP_MEMBER_AVATARS.owner,
    senderName: '群主·洛桑',
    text: '欢迎新成员，资料和历史公告都尽量沉淀到群空间，后面复访会更方便。',
  },
  {
    id: 'grp-msg-2',
    kind: 'v2',
    type: 'announcement',
    dir: 'recv',
    avatar: GROUP_MEMBER_AVATARS.owner,
    senderName: '群主·洛桑',
    data: {
      title: '【今晚更新】群收藏上新',
      body: '新增直播切片、飞书目录和答疑摘要，进群空间就能直接找到，不用在聊天流里往回翻。',
    },
  },
  {
    id: 'grp-msg-3',
    kind: 'text',
    dir: 'sent',
    text: '收到，我晚点去群收藏看一下。',
  },
  {
    id: 'grp-msg-4',
    kind: 'quote',
    dir: 'recv',
    avatar: GROUP_MEMBER_AVATARS.mia,
    senderName: '内容整理员·Mia',
    quote: { sender: '群主·洛桑', text: '新增直播切片、飞书目录和答疑摘要' },
    text: '今晚 20:00 前会把图片和文件都归好类，大家直接从群空间进就行。',
  },
  {
    id: 'grp-msg-5',
    kind: 'text',
    dir: 'recv',
    avatar: GROUP_MEMBER_AVATARS.mia,
    senderName: '内容整理员·Mia',
    text: '课程通知也会同步到群公告，后面历史公告支持多条回看。',
  },
  { id: 'grp-time-2', kind: 'time', text: '今天 19:40' },
  {
    id: 'grp-msg-6',
    kind: 'card_link',
    dir: 'recv',
    avatar: GROUP_MEMBER_AVATARS.neil,
    senderName: '资料官·Neil',
    card: {
      thumb: '/assets/cards/card_topic.png',
      title: '本周公开课资料目录',
      subtitle: '今晚更新后可直接从群收藏复访',
      brand: { icon: IcDouyin, name: '群空间' },
    },
  },
  {
    id: 'grp-msg-7',
    kind: 'text',
    dir: 'recv',
    avatar: GROUP_MEMBER_AVATARS.neil,
    senderName: '资料官·Neil',
    text: '提醒一下：部分可见消息现在也能加入群收藏，展示时会按各自成员权限过滤。',
  },
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

function MessageRow({ focusMessageId, message, myAvatar, contactAvatar }) {
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
        <span className="cht-row__system-text">
          {message.parts
            ? message.parts.map((part, index) => (
              <span key={`${message.id}-${index}`} className={part.accent ? 'cht-row__system-accent' : ''}>
                {part.text}
              </span>
            ))
            : message.text}
        </span>
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
    const v2Avatar = v2IsSent ? myAvatar : (message.avatar || contactAvatar)
    return (
      <div className={`cht-row cht-row--${v2Dir}${focusMessageId === message.id ? ' cht-row--focused' : ''}`} data-message-id={message.id}>
        {!v2IsSent && <Avatar className="cht-row__avatar" size="36" src={v2Avatar} alt="" />}
        <div className="cht-row__body">
          {!v2IsSent && message.senderName && <span className="cht-row__sender">{message.senderName}</span>}
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
  const avatar = isSent ? myAvatar : (message.avatar || contactAvatar)

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
    <div className={`cht-row cht-row--${dir}${focusMessageId === message.id ? ' cht-row--focused' : ''}`} data-message-id={message.id}>
      {!isSent && <Avatar className="cht-row__avatar" size="36" src={avatar} alt="" />}
      <div className="cht-row__body">
        {!isSent && message.senderName && <span className="cht-row__sender">{message.senderName}</span>}
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

function ConversationFlow({ contactAvatar, focusMessageId, messages, myAvatar }) {
  useEffect(() => {
    if (!focusMessageId) return
    const timer = setTimeout(() => {
      const target = document.querySelector(`[data-message-id="${focusMessageId}"]`)
      target?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 120)
    return () => clearTimeout(timer)
  }, [focusMessageId, messages])

  return (
    <section className="cht-flow" aria-label="对话内容">
      <div className="cht-flow__inner">
        {messages.map((msg) => (
          <MessageRow
            key={msg.id}
            focusMessageId={focusMessageId}
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

function FeedbackToast({ message }) {
  if (!message) return null
  return <div className="gsp-toast" role="status">{message}</div>
}

const GROUP_DETAIL_TITLES = {
  announcements: '群公告',
  pins: '群置顶',
  collections: '群收藏',
  settings: '群设置',
}

function usePublicGroupState(chatContext, fallbackName) {
  const initialGroupView = chatContext?.initialGroupView || 'chat'
  const [messages, setMessages] = useState(PUBLIC_GROUP_MESSAGES)
  const [groupView, setGroupView] = useState(initialGroupView)
  const [navExperiment, setNavExperiment] = useState(chatContext?.navExperiment || 'experiment2')
  const [groupRole, setGroupRole] = useState(chatContext?.role || 'member')
  const [groupDots, setGroupDots] = useState(chatContext?.updates || { announcements: true, pins: true })
  const [groupNavExpanded, setGroupNavExpanded] = useState(getDefaultExpanded(
    chatContext?.navExperiment || 'experiment2',
    chatContext?.role || 'member',
    chatContext?.updates || { announcements: true, pins: true },
  ))
  const [focusMessageId, setFocusMessageId] = useState(null)
  const [collectionFilter, setCollectionFilter] = useState('media')
  const [pinnedItems, setPinnedItems] = useState(GROUP_PINNED_ITEMS)
  const [collectionMedia, setCollectionMedia] = useState(GROUP_COLLECTION_MEDIA)
  const [collectionFiles, setCollectionFiles] = useState(GROUP_COLLECTION_FILES)
  const [feedback, setFeedback] = useState('')

  useEffect(() => {
    const nextDots = chatContext?.updates || { announcements: true, pins: true }
    const nextExperiment = chatContext?.navExperiment || 'experiment2'
    const nextRole = chatContext?.role || 'member'

    setMessages(PUBLIC_GROUP_MESSAGES)
    setGroupView(initialGroupView)
    setNavExperiment(nextExperiment)
    setGroupRole(nextRole)
    setGroupDots(nextDots)
    setGroupNavExpanded(getDefaultExpanded(nextExperiment, nextRole, nextDots))
    setFocusMessageId(null)
    setCollectionFilter('media')
    setPinnedItems(GROUP_PINNED_ITEMS)
    setCollectionMedia(GROUP_COLLECTION_MEDIA)
    setCollectionFiles(GROUP_COLLECTION_FILES)
    setFeedback('')
  }, [chatContext?.id, chatContext?.initialGroupView, chatContext?.navExperiment, chatContext?.role, chatContext?.updates, initialGroupView])

  useEffect(() => {
    if (!feedback) return undefined
    const timer = setTimeout(() => setFeedback(''), 1800)
    return () => clearTimeout(timer)
  }, [feedback])

  const handleGroupSelect = (next) => {
    if (next === 'chat') {
      setGroupView('chat')
      return
    }
    if (next === 'announcements' || next === 'pins') {
      setGroupDots((prev) => ({ ...prev, [next]: false }))
    }
    setGroupView(next)
  }

  const handleJumpToMessage = (messageId) => {
    setGroupView('chat')
    setFocusMessageId(messageId)
    setFeedback('已跳回原消息')
  }

  const handleRemovePin = (pinId) => {
    setPinnedItems((prev) => prev.filter((item) => item.id !== pinId))
    setFeedback('已移除置顶')
  }

  const handleReportPin = () => {
    setFeedback('已提交举报')
  }

  const handleRoleChange = (nextRole) => {
    setGroupRole(nextRole)
    setGroupNavExpanded(getDefaultExpanded(navExperiment, nextRole, groupDots))
  }

  const handleExperimentChange = (nextExperiment) => {
    setNavExperiment(nextExperiment)
    setGroupNavExpanded(getDefaultExpanded(nextExperiment, groupRole, groupDots))
    if (nextExperiment === 'experiment1') {
      setGroupView('chat')
    }
    setFeedback(`已切换到${nextExperiment === 'experiment1' ? '导航交互 1' : '导航交互 2'}`)
  }

  const handleSendAndAdd = (kind, selectedItems) => {
    const normalizedItems = selectedItems.map((item) => ({
      ...item,
      addedAt: '刚刚',
      addedBy: '你',
    }))

    if (kind === 'media') {
      setCollectionMedia((prev) => [...normalizedItems, ...prev])
    } else {
      setCollectionFiles((prev) => [...normalizedItems, ...prev])
    }

    setMessages((prev) => [
      ...prev,
      { id: `grp-time-${Date.now()}`, kind: 'time', text: '刚刚' },
      buildCollectionNotice(chatContext?.name || fallbackName || '群昵称', selectedItems),
    ])
    setGroupView('chat')
    setFeedback('已发送并添加到群收藏')
  }

  return {
    collectionFiles,
    collectionFilter,
    collectionMedia,
    feedback,
    focusMessageId,
    groupDots,
    groupNavExpanded,
    groupRole,
    groupView,
    messages,
    navExperiment,
    pinnedItems,
    setCollectionFilter,
    setGroupNavExpanded,
    setGroupView,
    handleExperimentChange,
    handleGroupSelect,
    handleJumpToMessage,
    handleRemovePin,
    handleReportPin,
    handleRoleChange,
    handleSendAndAdd,
  }
}

function GroupSecondaryView({
  collectionFilter,
  collectionFiles,
  collectionMedia,
  groupRole,
  groupView,
  handleExperimentChange,
  handleJumpToMessage,
  handleRemovePin,
  handleReportPin,
  handleRoleChange,
  handleSendAndAdd,
  navExperiment,
  pinnedItems,
  setCollectionFilter,
}) {
  if (groupView === 'announcements') {
    return <GroupAnnouncementsView announcements={GROUP_ANNOUNCEMENTS} />
  }

  if (groupView === 'pins') {
    return (
      <GroupPinnedView
        items={pinnedItems}
        onJumpToMessage={handleJumpToMessage}
        onRemovePin={handleRemovePin}
        onReportPin={handleReportPin}
        role={groupRole}
      />
    )
  }

  if (groupView === 'collections') {
    return (
      <GroupCollectionView
        activeFilter={collectionFilter}
        fileItems={collectionFiles}
        mediaItems={collectionMedia}
        onFilterChange={setCollectionFilter}
        onSendAndAdd={handleSendAndAdd}
        pickerItems={GROUP_COLLECTION_PICKER}
      />
    )
  }

  return (
    <GroupSettingsView
      experiment={navExperiment}
      onExperimentChange={handleExperimentChange}
      onRoleChange={handleRoleChange}
      role={groupRole}
    />
  )
}

function getGroupDetailSubtitle({ collectionFiles, collectionFilter, collectionMedia, navExperiment, pinnedItems }) {
  return {
    announcements: `${GROUP_ANNOUNCEMENTS.length} 条公告`,
    pins: `${pinnedItems.length} 条置顶`,
    collections: collectionFilter === 'media'
      ? `${collectionMedia.length} 个图片与视频`
      : `${collectionFiles.length} 个文件`,
    settings: navExperiment === 'experiment2' ? '管理导航实验与默认展开逻辑' : '查看当前实验配置',
  }
}

function GroupChatHeader({
  detailSubtitle,
  displayAvatar,
  displayName,
  groupView,
  isGroupSecondary,
  onBack,
  onMore,
}) {
  return (
    <ChatTopBar
      contactName={displayName}
      contactAvatar={displayAvatar}
      contactMeta="218 人 · 公开群"
      onBack={onBack}
      onMore={onMore}
      showMore={!isGroupSecondary}
      showPreview={false}
      showVideo={false}
      subtitle={isGroupSecondary ? detailSubtitle[groupView] : undefined}
      title={isGroupSecondary ? GROUP_DETAIL_TITLES[groupView] : undefined}
      variant={isGroupSecondary ? 'detail' : 'conversation'}
    />
  )
}

function GroupChatBody({
  collectionFiles,
  collectionFilter,
  collectionMedia,
  contactAvatar,
  focusMessageId,
  groupDots,
  groupNavExpanded,
  groupRole,
  groupView,
  handleExperimentChange,
  handleGroupSelect,
  handleJumpToMessage,
  handleRemovePin,
  handleReportPin,
  handleRoleChange,
  handleSendAndAdd,
  messages,
  navExperiment,
  pinnedItems,
  setCollectionFilter,
  setGroupNavExpanded,
}) {
  if (groupView === 'chat') {
    return (
      <>
        <GroupSpaceNav
          activeKey={groupView}
          dots={groupDots}
          expanded={groupNavExpanded}
          onSelect={handleGroupSelect}
          onToggleExpanded={() => setGroupNavExpanded((prev) => !prev)}
          role={groupRole}
          variant={navExperiment}
        />
        <ConversationFlow
          contactAvatar={contactAvatar}
          focusMessageId={focusMessageId}
          messages={messages}
          myAvatar={ASSETS.avatarRight}
        />
      </>
    )
  }

  return (
    <GroupSecondaryView
      collectionFiles={collectionFiles}
      collectionFilter={collectionFilter}
      collectionMedia={collectionMedia}
      groupRole={groupRole}
      groupView={groupView}
      handleExperimentChange={handleExperimentChange}
      handleJumpToMessage={handleJumpToMessage}
      handleRemovePin={handleRemovePin}
      handleReportPin={handleReportPin}
      handleRoleChange={handleRoleChange}
      handleSendAndAdd={handleSendAndAdd}
      navExperiment={navExperiment}
      pinnedItems={pinnedItems}
      setCollectionFilter={setCollectionFilter}
    />
  )
}

function StandardChat({ contactName, contactAvatar, onChange }) {
  const [showKeyboard, setShowKeyboard] = useState(false)
  const displayName = contactName || '合川路林志玲'
  const displayAvatar = contactAvatar || ASSETS.avatarLeft

  return (
    <div className="cht-page">
      <ChatStatusBar />
      <ChatTopBar
        contactName={displayName}
        contactAvatar={displayAvatar}
        onBack={() => onChange?.('messages')}
        onPreview={() => onChange?.('bubblepreview')}
      />
      <ConversationFlow
        contactAvatar={displayAvatar}
        focusMessageId={null}
        messages={MESSAGES}
        myAvatar={ASSETS.avatarRight}
      />
      <QuickReplyChips />
      <InputBar showKeyboard={showKeyboard} onToggleKeyboard={setShowKeyboard} />
      <HomeIndicator />
    </div>
  )
}

function PublicGroupChat({ chatContext, contactName, contactAvatar, onChange }) {
  const [showKeyboard, setShowKeyboard] = useState(false)
  const displayName = contactName || 'AI 公开资源群'
  const displayAvatar = contactAvatar || ASSETS.avatarLeft
  const {
    collectionFiles,
    collectionFilter,
    collectionMedia,
    feedback,
    focusMessageId,
    groupDots,
    groupNavExpanded,
    groupRole,
    groupView,
    messages,
    navExperiment,
    pinnedItems,
    setCollectionFilter,
    setGroupNavExpanded,
    setGroupView,
    handleExperimentChange,
    handleGroupSelect,
    handleJumpToMessage,
    handleRemovePin,
    handleReportPin,
    handleRoleChange,
    handleSendAndAdd,
  } = usePublicGroupState(chatContext, displayName)
  const isGroupSecondary = groupView !== 'chat'
  const detailSubtitle = getGroupDetailSubtitle({
    collectionFiles,
    collectionFilter,
    collectionMedia,
    navExperiment,
    pinnedItems,
  })

  return (
    <div className="cht-page">
      <ChatStatusBar />
      <GroupChatHeader
        detailSubtitle={detailSubtitle}
        displayAvatar={displayAvatar}
        displayName={displayName}
        groupView={groupView}
        isGroupSecondary={isGroupSecondary}
        onBack={() => {
          if (isGroupSecondary) {
            setGroupView('chat')
            return
          }
          onChange?.('messages')
        }}
        onMore={() => setGroupView('settings')}
      />
      <GroupChatBody
        collectionFiles={collectionFiles}
        collectionFilter={collectionFilter}
        collectionMedia={collectionMedia}
        contactAvatar={displayAvatar}
        focusMessageId={focusMessageId}
        groupDots={groupDots}
        groupNavExpanded={groupNavExpanded}
        groupRole={groupRole}
        groupView={groupView}
        handleExperimentChange={handleExperimentChange}
        handleGroupSelect={handleGroupSelect}
        handleJumpToMessage={handleJumpToMessage}
        handleRemovePin={handleRemovePin}
        handleReportPin={handleReportPin}
        handleRoleChange={handleRoleChange}
        handleSendAndAdd={handleSendAndAdd}
        messages={messages}
        navExperiment={navExperiment}
        pinnedItems={pinnedItems}
        setCollectionFilter={setCollectionFilter}
        setGroupNavExpanded={setGroupNavExpanded}
      />
      {groupView === 'chat' && (
        <InputBar showKeyboard={showKeyboard} onToggleKeyboard={setShowKeyboard} />
      )}
      <HomeIndicator />
      <FeedbackToast message={feedback} />
    </div>
  )
}

/* ══════════════════════════════════════════════════════════
   Page export
   ══════════════════════════════════════════════════════════ */

export default function Chat(props) {
  if (props.chatContext?.mode === 'public-group') {
    return <PublicGroupChat {...props} />
  }

  return <StandardChat {...props} />
}
