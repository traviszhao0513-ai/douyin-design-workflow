import { useState } from 'react'
import './BubblePreview.css'
import IcPlay      from '../icons/svg/ic_s_s_play_16_filled.svg?react'
import IcVideoCall from '../icons/svg/ic_s_s_video_20_filled.svg?react'
import IcPhoneUp   from '../icons/svg/ic_s_s_phoneup_20_filled.svg?react'

/**
 * BubblePreview — 气泡组件预览 / 走查页
 *
 * 所有气泡组件都展示在这里，左接收右发送，
 * 方便设计师逐一比对 Figma。
 *
 * Token 来源与 Chat.css 完全一致：
 *   bubble-recv #FFFFFF  bubble-sent #168EF9
 *   radius 8px  text-pad 8/12px  voice-pad 12px
 *   body 17px  voice-duration 14px  meta 12px
 */

/* ─── avatars ─── */
const AVATAR_L = 'https://www.figma.com/api/mcp/asset/c7b48746-b3ce-49a9-8884-55c6bcce2fc7'
const AVATAR_R = 'https://www.figma.com/api/mcp/asset/dab287a5-2f57-4cd5-af7d-09f667b8d27c'

/* ─────────────────────────────────────────────────
   Bubble primitives (same tokens as Chat.jsx)
   ───────────────────────────────────────────────── */

const WAVE_HEIGHTS = [9, 12, 14, 20, 14, 10, 10, 10, 10, 10, 10]

function Waveform({ dir }) {
  return (
    <div className={`bp-wave bp-wave--${dir}`} aria-hidden="true">
      {WAVE_HEIGHTS.map((h, i) => (
        <span key={i} className="bp-wave__bar" style={{ height: `${h}px` }} />
      ))}
    </div>
  )
}

/* ─────────────────────────────────────────────────
   Bubble Row — avatar + bubble side by side
   ───────────────────────────────────────────────── */

function BubbleRow({ dir, children, label }) {
  const isSent = dir === 'sent'
  const avatar = isSent ? AVATAR_R : AVATAR_L
  return (
    <div className={`bp-row bp-row--${dir}`}>
      {!isSent && <img className="bp-row__avatar" src={avatar} alt="" />}
      <div className="bp-row__bubble-wrap">
        {label && <span className={`bp-row__label bp-row__label--${dir}`}>{label}</span>}
        {children}
      </div>
      {isSent && <img className="bp-row__avatar" src={avatar} alt="" />}
    </div>
  )
}

/* ─────────────────────────────────────────────────
   Individual bubble atoms
   ───────────────────────────────────────────────── */

/* 1 · Text */
function TextBubble({ dir, text }) {
  return (
    <div className={`bp-bbl bp-bbl--text bp-bbl--${dir}`}>
      <p className="bp-bbl__text">{text}</p>
    </div>
  )
}

/* 2 · Link */
function LinkBubble({ dir, segments }) {
  return (
    <div className={`bp-bbl bp-bbl--text bp-bbl--${dir}`}>
      <p className="bp-bbl__text">
        {segments.map((s, i) =>
          s.type === 'link'
            ? <span key={i} className="bp-bbl__link">{s.text}</span>
            : <span key={i}>{s.text}</span>
        )}
      </p>
    </div>
  )
}

/* 3 · Mention */
function MentionBubble({ dir, segments }) {
  return (
    <div className={`bp-bbl bp-bbl--text bp-bbl--${dir}`}>
      <p className="bp-bbl__text">
        {segments.map((s, i) =>
          s.type === 'mention'
            ? <span key={i} className={`bp-bbl__mention bp-bbl__mention--${dir}`}>{s.text}</span>
            : <span key={i}>{s.text}</span>
        )}
      </p>
    </div>
  )
}

/* 4 · Quote — two-card vertical stack (reply on top, quoted ref below) */
function QuoteBubble({ dir, quote, text }) {
  return (
    <div className="bp-bbl__quote-stack">
      <div className={`bp-bbl bp-bbl--text bp-bbl--${dir}`}>
        <p className="bp-bbl__text">{text}</p>
      </div>
      <div className="bp-bbl__quote-ref">
        <p className="bp-bbl__quote-ref-text">
          {quote.sender}：{quote.text}
        </p>
      </div>
    </div>
  )
}

/* 5 · Voice */
function VoiceBubble({ dir, duration }) {
  return (
    <div className={`bp-bbl bp-bbl--voice bp-bbl--${dir}`}>
      {dir === 'recv' && (
        <button className={`bp-bbl__play bp-bbl__play--${dir}`} type="button" aria-label="播放">
          <IcPlay width={16} height={16} />
        </button>
      )}
      <Waveform dir={dir} />
      <span className={`bp-bbl__duration bp-bbl__duration--${dir}`}>{duration}</span>
      {dir === 'sent' && (
        <button className={`bp-bbl__play bp-bbl__play--${dir}`} type="button" aria-label="播放">
          <IcPlay width={16} height={16} />
        </button>
      )}
    </div>
  )
}

/* 6 · Image */
function ImageBubble({ dir, src, w, h }) {
  return (
    <div className={`bp-bbl bp-bbl--image bp-bbl--${dir}`}>
      <img className="bp-bbl__img" src={src} alt="图片" style={{ width: w, height: h }} />
    </div>
  )
}

/* 7 · Call */
function CallBubble({ dir, callType, status, sub }) {
  const isVideo = callType === 'video'
  return (
    <div className={`bp-bbl bp-bbl--call bp-bbl--${dir}`}>
      <div className={`bp-bbl__call-icon bp-bbl__call-icon--${dir}`}>
        {isVideo
          ? <IcVideoCall width={20} height={20} />
          : <IcPhoneUp   width={20} height={20} />
        }
      </div>
      <div className="bp-bbl__call-info">
        <span className="bp-bbl__call-status">{status}</span>
        <span className={`bp-bbl__call-sub bp-bbl__call-sub--${dir}`}>{sub}</span>
      </div>
    </div>
  )
}

/* 8 · System */
function SystemMsg({ text }) {
  return (
    <div className="bp-system">
      <span className="bp-system__text">{text}</span>
    </div>
  )
}

/* 9 · Timestamp */
function TimeMsg({ text }) {
  return (
    <div className="bp-time">
      <span className="bp-time__text">{text}</span>
    </div>
  )
}

/* ─────────────────────────────────────────────────
   Section wrapper with collapse
   ───────────────────────────────────────────────── */

function Section({ index, title, desc, status, onStatusChange, children }) {
  const [open, setOpen] = useState(true)
  const statusMap = {
    ok:    { label: '✅ 已还原', cls: 'bp-section__status--ok' },
    issue: { label: '⚠️ 有问题', cls: 'bp-section__status--issue' },
    none:  { label: '待确认',    cls: 'bp-section__status--none' },
  }
  const s = statusMap[status]
  return (
    <section className={`bp-section${open ? '' : ' bp-section--collapsed'}`}>
      <button className="bp-section__header" type="button" onClick={() => setOpen(v => !v)}>
        <span className="bp-section__index">{String(index).padStart(2, '0')}</span>
        <div className="bp-section__meta">
          <span className="bp-section__title">{title}</span>
          {desc && <span className="bp-section__desc">{desc}</span>}
        </div>
        <button
          className={`bp-section__status ${s.cls}`}
          type="button"
          onClick={(e) => { e.stopPropagation(); onStatusChange() }}
        >
          {s.label}
        </button>
        <span className="bp-section__chevron">{open ? '▾' : '›'}</span>
      </button>
      {open && <div className="bp-section__body">{children}</div>}
    </section>
  )
}

/* ─────────────────────────────────────────────────
   Page
   ───────────────────────────────────────────────── */

const STATUS_CYCLE = ['none', 'ok', 'issue']

export default function BubblePreview({ onChange }) {
  const [statuses, setStatuses] = useState({
    text:    'none',
    link:    'none',
    mention: 'none',
    quote:   'none',
    voice:   'none',
    image:   'none',
    call:    'none',
    system:  'none',
    time:    'none',
  })

  const cycle = (key) =>
    setStatuses(prev => ({
      ...prev,
      [key]: STATUS_CYCLE[(STATUS_CYCLE.indexOf(prev[key]) + 1) % STATUS_CYCLE.length]
    }))

  const okCount = Object.values(statuses).filter(s => s === 'ok').length
  const total   = Object.keys(statuses).length

  return (
    <div className="bp-page">
      {/* ── Top bar ── */}
      <header className="bp-topbar">
        <button className="bp-topbar__back" type="button" onClick={() => onChange?.('messages')}>
          <svg width="10" height="16" viewBox="0 0 10 16" fill="none">
            <path d="M9 1L1 8l8 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <div className="bp-topbar__center">
          <span className="bp-topbar__title">气泡走查</span>
          <span className="bp-topbar__sub">Bubble Component Preview</span>
        </div>
        <span className="bp-topbar__progress">{okCount}/{total}</span>
      </header>

      {/* ── Legend ── */}
      <div className="bp-legend">
        <span className="bp-legend__item">点击 <strong>待确认</strong> 标签切换状态</span>
        <div className="bp-legend__chips">
          <span className="bp-chip bp-chip--none">待确认</span>
          <span className="bp-chip bp-chip--ok">✅ 已还原</span>
          <span className="bp-chip bp-chip--issue">⚠️ 有问题</span>
        </div>
      </div>

      {/* ── Progress bar ── */}
      <div className="bp-progress">
        <div className="bp-progress__bar" style={{ width: `${(okCount / total) * 100}%` }} />
      </div>

      {/* ── Content ── */}
      <div className="bp-content">

        {/* 01 · 纯文字 */}
        <Section index={1} title="纯文字" desc="Text" status={statuses.text} onStatusChange={() => cycle('text')}>
          <div className="bp-pair">
            <span className="bp-pair__label">单行</span>
            <BubbleRow dir="recv"><TextBubble dir="recv" text="这个视频好好笑" /></BubbleRow>
            <BubbleRow dir="sent"><TextBubble dir="sent" text="哈哈哈，果断关注" /></BubbleRow>
          </div>
          <div className="bp-pair">
            <span className="bp-pair__label">多行</span>
            <BubbleRow dir="recv"><TextBubble dir="recv" text="刚到，马上。顺便帮我带杯咖啡吧，最近有点困" /></BubbleRow>
            <BubbleRow dir="sent"><TextBubble dir="sent" text="好的，拿铁还是美式？顺路带一下" /></BubbleRow>
          </div>
          <div className="bp-spec">
            <span>bg-recv <code>#FFFFFF</code></span>
            <span>bg-sent <code>#168EF9</code></span>
            <span>radius <code>8px</code></span>
            <span>pad <code>8/12px</code></span>
            <span>font <code>17px/400</code></span>
          </div>
        </Section>

        {/* 02 · 链接 */}
        <Section index={2} title="链接文字" desc="Link" status={statuses.link} onStatusChange={() => cycle('link')}>
          <BubbleRow dir="recv">
            <LinkBubble dir="recv" segments={[
              { type: 'text', text: '你看看这个：' },
              { type: 'link', text: 'https://www.douyin.com' },
            ]} />
          </BubbleRow>
          <BubbleRow dir="sent">
            <LinkBubble dir="sent" segments={[
              { type: 'text', text: '参考一下：' },
              { type: 'link', text: 'https://www.douyin.com/video/123' },
            ]} />
          </BubbleRow>
          <div className="bp-spec">
            <span>link color recv <code>#168EF9</code></span>
            <span>link color sent <code>rgba(255,255,255,0.9)</code></span>
          </div>
        </Section>

        {/* 03 · @提及 */}
        <Section index={3} title="@提及" desc="Mention" status={statuses.mention} onStatusChange={() => cycle('mention')}>
          <BubbleRow dir="recv">
            <MentionBubble dir="recv" segments={[
              { type: 'mention', text: '@所有人' },
              { type: 'text', text: ' 欢迎加入本群！' },
            ]} />
          </BubbleRow>
          <BubbleRow dir="sent">
            <MentionBubble dir="sent" segments={[
              { type: 'mention', text: '@合川路林志玲' },
              { type: 'text', text: ' 帮我看看这个' },
            ]} />
          </BubbleRow>
          <div className="bp-spec">
            <span>mention recv <code>#168EF9 / 500</code></span>
            <span>mention sent <code>#FFFFFF / 600</code></span>
          </div>
        </Section>

        {/* 04 · 引用回复 */}
        <Section index={4} title="引用回复" desc="Quote Reply" status={statuses.quote} onStatusChange={() => cycle('quote')}>
          <BubbleRow dir="recv">
            <QuoteBubble
              dir="recv"
              quote={{ sender: '合川路林志玲', text: '这个视频好好笑，笑死我了' }}
              text="是的，太好笑了！"
            />
          </BubbleRow>
          <BubbleRow dir="sent">
            <QuoteBubble
              dir="sent"
              quote={{ sender: '合川路林志玲', text: '你看看这个链接，是昨天那个帖子' }}
              text="好的，我去看看"
            />
          </BubbleRow>
          <div className="bp-spec">
            <span>stack gap <code>4px</code></span>
            <span>quote-ref bg <code>rgba(22,24,35,0.05)</code></span>
            <span>quote-ref pad <code>8px 12px</code></span>
            <span>quote-ref radius <code>8px</code></span>
            <span>quote text <code>13px</code> line-clamp <code>2</code></span>
          </div>
        </Section>

        {/* 05 · 语音消息 */}
        <Section index={5} title="语音消息" desc="Voice Message" status={statuses.voice} onStatusChange={() => cycle('voice')}>
          <div className="bp-pair">
            <span className="bp-pair__label">短语音 9''</span>
            <BubbleRow dir="recv"><VoiceBubble dir="recv" duration="9''" /></BubbleRow>
            <BubbleRow dir="sent"><VoiceBubble dir="sent" duration="9''" /></BubbleRow>
          </div>
          <div className="bp-pair">
            <span className="bp-pair__label">长语音 58''</span>
            <BubbleRow dir="recv"><VoiceBubble dir="recv" duration="58''" /></BubbleRow>
            <BubbleRow dir="sent"><VoiceBubble dir="sent" duration="58''" /></BubbleRow>
          </div>
          <div className="bp-spec">
            <span>pad <code>12px</code></span>
            <span>radius <code>8px</code></span>
            <span>duration <code>14px/500</code></span>
            <span>wave recv <code>rgba(22,24,35,0.45)</code></span>
            <span>wave sent <code>rgba(255,255,255,0.75)</code></span>
          </div>
        </Section>

        {/* 06 · 图片 */}
        <Section index={6} title="图片消息" desc="Image" status={statuses.image} onStatusChange={() => cycle('image')}>
          <div className="bp-pair">
            <span className="bp-pair__label">竖图（高 &gt; 宽）</span>
            <BubbleRow dir="recv">
              <ImageBubble dir="recv" src="https://picsum.photos/seed/dy1/168/224" w={168} h={224} />
            </BubbleRow>
            <BubbleRow dir="sent">
              <ImageBubble dir="sent" src="https://picsum.photos/seed/dy3/168/224" w={168} h={224} />
            </BubbleRow>
          </div>
          <div className="bp-pair">
            <span className="bp-pair__label">横图（宽 &gt; 高）</span>
            <BubbleRow dir="recv">
              <ImageBubble dir="recv" src="https://picsum.photos/seed/dy2/218/150" w={218} h={150} />
            </BubbleRow>
            <BubbleRow dir="sent">
              <ImageBubble dir="sent" src="https://picsum.photos/seed/dy4/218/150" w={218} h={150} />
            </BubbleRow>
          </div>
          <div className="bp-spec">
            <span>max-w <code>218px</code></span>
            <span>max-h <code>260px</code></span>
            <span>radius <code>8px</code></span>
            <span>object-fit <code>cover</code></span>
          </div>
        </Section>

        {/* 07 · 通话记录 */}
        <Section index={7} title="通话记录" desc="Call Record" status={statuses.call} onStatusChange={() => cycle('call')}>
          <div className="bp-pair">
            <span className="bp-pair__label">视频通话</span>
            <BubbleRow dir="recv">
              <CallBubble dir="recv" callType="video" status="已拒绝" sub="点击回拨" />
            </BubbleRow>
            <BubbleRow dir="sent">
              <CallBubble dir="sent" callType="video" status="视频通话" sub="时长 12:45" />
            </BubbleRow>
          </div>
          <div className="bp-pair">
            <span className="bp-pair__label">语音通话</span>
            <BubbleRow dir="recv">
              <CallBubble dir="recv" callType="audio" status="未接通" sub="点击回拨" />
            </BubbleRow>
            <BubbleRow dir="sent">
              <CallBubble dir="sent" callType="audio" status="语音通话" sub="时长 3:20" />
            </BubbleRow>
          </div>
          <div className="bp-spec">
            <span>icon-bg recv <code>rgba(22,24,35,0.06)</code></span>
            <span>icon-bg sent <code>rgba(255,255,255,0.22)</code></span>
            <span>icon size <code>36px</code></span>
            <span>status <code>15px/500</code></span>
            <span>sub <code>12px/400</code></span>
          </div>
        </Section>

        {/* 08 · 系统通知 */}
        <Section index={8} title="系统通知" desc="System Message" status={statuses.system} onStatusChange={() => cycle('system')}>
          <SystemMsg text="你们已成为抖音好友，可以开始聊天了" />
          <SystemMsg text="对方开启了朋友验证，你还不是他（她）的朋友" />
          <div className="bp-spec">
            <span>color <code>rgba(22,24,35,0.34)</code></span>
            <span>font <code>12px/400</code></span>
            <span>align <code>center</code></span>
          </div>
        </Section>

        {/* 09 · 时间戳 */}
        <Section index={9} title="时间戳分割" desc="Timestamp Divider" status={statuses.time} onStatusChange={() => cycle('time')}>
          <TimeMsg text="周一 下午 3:40" />
          <TimeMsg text="昨天 上午 10:20" />
          <TimeMsg text="2024年12月25日" />
          <div className="bp-spec">
            <span>color <code>rgba(22,24,35,0.34)</code></span>
            <span>font <code>12px/400</code></span>
            <span>align <code>center</code></span>
          </div>
        </Section>

      </div>

      {/* ── Bottom safe area ── */}
      <div className="bp-safe-bottom" />
    </div>
  )
}
