/**
 * BubblePreview — Figma IMBasicMessage 变体矩阵走查页
 *
 * 对齐 Figma node 16125:45127（IMBasicMessage）的 6 个变体轴：
 *   类型 / 格式 / 细分 / 状态 / 视角 / 深浅模式
 *
 * 使用统一 <Bubble> 组件渲染每个变体单元，按类型分组呈现。
 */

import { useState, useMemo } from 'react'
import Bubble, { TYPES } from '../components/Bubble'
import './Chat.css'
import './BubblePreview.css'

const AVATAR_L = 'https://i.pravatar.cc/100?u=leftavatar'
const AVATAR_R = 'https://i.pravatar.cc/100?u=rightavatar'

/* ═══════════════════════════════════════════════════════════
   变体矩阵定义 — 每个 type 下要展示哪些 cell
   每个 cell: { label, format?, subdivision?, state?, perspective, data }
   ═══════════════════════════════════════════════════════════ */

const SAMPLE_IMG_SQ = 'https://picsum.photos/seed/sq/300/300'
const SAMPLE_IMG_LS = 'https://picsum.photos/seed/ls/400/260'
const SAMPLE_IMG_PT = 'https://picsum.photos/seed/pt/260/400'
const SAMPLE_STICKER = 'https://picsum.photos/seed/sticker/264/264'

const MATRIX = {
  text: {
    title: '纯文字',
    cells: [
      { label: '单行 · 客态',     perspective: 'recv', data: { text: '你好呀' } },
      { label: '单行 · 主态',     perspective: 'sent', data: { text: '在线吗' } },
      { label: '多行 · 客态',     perspective: 'recv', data: { text: '今天天气真好，要不要出去走走？顺便喝杯咖啡。' } },
      { label: '多行 · 主态',     perspective: 'sent', data: { text: '好呀，我五点下班，你定地方就行。' } },
      { label: '发送中',           perspective: 'sent', state: 'sending', data: { text: '正在发送…' } },
      { label: '发送失败',         perspective: 'sent', state: 'failed',  data: { text: '发送失败' } },
    ],
  },
  link: {
    title: '带链接文字',
    cells: [
      { label: '链接 · 客态', perspective: 'recv', data: { segments: [
        { type: 'text', text: '看看这个：' }, { type: 'link', text: 'https://www.douyin.com' },
      ] } },
      { label: '@ 提及 · 客态', perspective: 'recv', data: { segments: [
        { type: 'mention', text: '@所有人' }, { type: 'text', text: ' 欢迎加入本群！' },
      ] } },
      { label: '@ 提及 · 主态', perspective: 'sent', data: { segments: [
        { type: 'mention', text: '@林志玲' }, { type: 'text', text: ' 来看看这个' },
      ] } },
    ],
  },
  invalid: {
    title: '消息失效提示',
    cells: [
      { label: '失效提示', perspective: 'recv', data: { text: '消息已过期或被撤回' } },
    ],
  },
  viewonce: {
    title: '仅看一次',
    cells: [
      { label: '未查看 · 客态', perspective: 'recv', data: { text: '仅看一次' } },
      { label: '未查看 · 主态', perspective: 'sent', data: { text: '仅看一次' } },
      { label: '已查看',        perspective: 'recv', state: 'viewed', data: {} },
    ],
  },
  announcement: {
    title: '群公告',
    cells: [
      { label: '公告 · 客态', perspective: 'recv', data: {
        title: '【周会通知】',
        body: '本周三下午 3 点在 3 楼会议室召开例会，请各位同学准时参加，提前准备周报。',
      } },
    ],
  },
  commentshare: {
    title: '分享评论',
    cells: [
      { label: '1:1 · 客态', perspective: 'recv', format: 'comment_1_1', data: {
        thumb: SAMPLE_IMG_SQ, text: '"这也太好笑了吧 哈哈哈哈哈"',
      } },
      { label: '3:4 · 主态', perspective: 'sent', format: 'comment_3_4', data: {
        thumb: SAMPLE_IMG_PT, text: '"看完这个我笑了一下午"',
      } },
      { label: '评论失效', perspective: 'recv', format: 'comment_1_1', state: 'invalid', data: {
        thumb: SAMPLE_IMG_SQ, text: '评论已删除',
      } },
    ],
  },
  voice: {
    title: '语音',
    cells: [
      { label: "1s · 客态",    perspective: 'recv', data: { duration: "1''" } },
      { label: "5s · 客态",    perspective: 'recv', data: { duration: "5''" } },
      { label: "15s · 主态",   perspective: 'sent', data: { duration: "15''" } },
      { label: "45s · 主态",   perspective: 'sent', data: { duration: "45''" } },
      { label: '播放中 · 客态', perspective: 'recv', state: 'playing',     data: { duration: "12''" } },
      { label: '转文字 · 客态', perspective: 'recv', state: 'transcribed', data: { duration: "9''", transcript: '你到哪了呀，我已经到了，在门口等你。' } },
    ],
  },
  audiocall: {
    title: '语音通话',
    cells: [
      { label: '正常 · 主态',   perspective: 'sent', state: 'normal',   data: { sub: '时长 03:21' } },
      { label: '未接通 · 客态', perspective: 'recv', state: 'missed',   data: {} },
      { label: '已拒绝 · 客态', perspective: 'recv', state: 'declined', data: {} },
    ],
  },
  videocall: {
    title: '视频通话',
    cells: [
      { label: '正常 · 主态',   perspective: 'sent', state: 'normal',   data: { sub: '时长 12:45' } },
      { label: '未接通 · 客态', perspective: 'recv', state: 'missed',   data: {} },
      { label: '已拒绝 · 主态', perspective: 'sent', state: 'declined', data: {} },
    ],
  },
  sticker: {
    title: '表情包',
    cells: [
      { label: '方 · 客态', perspective: 'recv', data: { src: SAMPLE_STICKER } },
      { label: '方 · 主态', perspective: 'sent', data: { src: SAMPLE_STICKER } },
    ],
  },
  image: {
    title: '图片',
    cells: [
      { label: '方 · 客态', perspective: 'recv', format: 'sq', data: { src: SAMPLE_IMG_SQ } },
      { label: '横 · 客态', perspective: 'recv', format: 'ls', data: { src: SAMPLE_IMG_LS } },
      { label: '竖 · 主态', perspective: 'sent', format: 'pt', data: { src: SAMPLE_IMG_PT } },
    ],
  },
  video: {
    title: '视频',
    cells: [
      { label: '方 · 客态', perspective: 'recv', format: 'sq', data: { src: SAMPLE_IMG_SQ, duration: '00:12' } },
      { label: '横 · 主态', perspective: 'sent', format: 'ls', data: { src: SAMPLE_IMG_LS, duration: '01:03' } },
      { label: '竖 · 客态', perspective: 'recv', format: 'pt', data: { src: SAMPLE_IMG_PT, duration: '00:45' } },
    ],
  },
  quote: {
    title: '引用回复',
    cells: [
      { label: '文字', perspective: 'recv', data: {
        text: '是的，太好笑了！',
        quote: { sender: '林志玲', text: '这个视频好好笑，笑死我了' },
      } },
      { label: '小表情',      perspective: 'recv', subdivision: 'quote_small_emoji', data: {
        text: '哈哈哈同感', quote: { sender: '林志玲' } } },
      { label: '大表情',      perspective: 'sent', subdivision: 'quote_big_emoji',   data: {
        text: '笑不活了', quote: { sender: '林志玲' } } },
      { label: '表情包',      perspective: 'recv', subdivision: 'quote_sticker',     data: {
        text: '这个表情绝了', quote: { sender: '林志玲' } } },
      { label: '语音',        perspective: 'recv', subdivision: 'quote_voice',       data: {
        text: '稍后听', quote: { sender: '林志玲' } } },
      { label: '语音播放中',   perspective: 'recv', subdivision: 'quote_voice_playing', data: {
        text: '正在听…', quote: { sender: '林志玲' } } },
      { label: '作品',        perspective: 'sent', subdivision: 'quote_video',       data: {
        text: '这个视频我刷到过', quote: { sender: '林志玲' } } },
      { label: '直播',        perspective: 'recv', subdivision: 'quote_live',        data: {
        text: '蹲一个直播', quote: { sender: '林志玲' } } },
      { label: '名片',        perspective: 'recv', subdivision: 'quote_card',        data: {
        text: '我也认识他', quote: { sender: '林志玲' } } },
      { label: '红包',        perspective: 'sent', subdivision: 'quote_redpacket',   data: {
        text: '收到啦 谢谢', quote: { sender: '林志玲' } } },
      { label: '以图换图',     perspective: 'recv', subdivision: 'quote_image_swap',  data: {
        text: '给你换一张', quote: { sender: '林志玲' } } },
    ],
  },
  status: {
    title: '状态',
    cells: [
      { label: '入群', perspective: 'recv', data: { text: '合川路林志玲 加入群聊' } },
      { label: '撤回', perspective: 'recv', data: { text: '你撤回了一条消息' } },
      { label: '好友', perspective: 'recv', data: { text: '你们已成为抖音好友，可以开始聊天了' } },
    ],
  },
  read: {
    title: '已读',
    cells: [
      { label: '1 人 · 头像', perspective: 'sent', format: 'read_avatars', data: { avatars: [AVATAR_L] } },
      { label: '3 人 · 头像', perspective: 'sent', format: 'read_avatars', data: { avatars: [AVATAR_L, AVATAR_R, AVATAR_L] } },
      { label: '多人 · 文字', perspective: 'sent', format: 'read_text',    data: { count: 12 } },
    ],
  },
  linkcard: {
    title: '通用链接卡',
    cells: [
      {
        label: '主标题 + 副标题 · 客态',
        perspective: 'recv',
        data: {
          card: {
            thumb: SAMPLE_IMG_SQ,
            title: '主标题',
            subtitle: '副标题信息内容',
            brand: { name: '来源信息', color: '#8C7AE6' },
          },
        },
      },
      {
        label: '带播放按钮 · 客态',
        perspective: 'recv',
        data: {
          card: {
            thumb: SAMPLE_IMG_SQ,
            title: '主标题',
            subtitle: '副标题信息内容',
            brand: { name: '汽水音乐', color: '#FE2C55' },
            action: { type: 'play' },
          },
        },
      },
      {
        label: '仅主标题（2 行）· 主态',
        perspective: 'sent',
        data: {
          card: {
            thumb: SAMPLE_IMG_SQ,
            title: '这是一条可以占两行展示的较长主标题内容示例',
            brand: { name: '抖音话题', color: '#161823' },
          },
        },
      },
      {
        label: '长标题截断 · 主态',
        perspective: 'sent',
        data: {
          card: {
            thumb: SAMPLE_IMG_SQ,
            title: '超长的主标题会在单行截断超长的主标题会在单行截断',
            subtitle: '副标题信息内容也会单行截断超出省略',
            brand: { name: '今日头条', color: '#D93A49' },
          },
        },
      },
      {
        label: '网页链接 · 客态',
        perspective: 'recv',
        data: {
          card: {
            thumb: SAMPLE_IMG_SQ,
            title: 'Clawdbot 教程01 模型训练的基础原则',
            subtitle: 'https://x.com/op7418/status/2017647987854610930',
            brand: { name: '网页链接', isWebLink: true },
          },
        },
      },
    ],
  },
}

/* ═══════════════════════════════════════════════════════════
   Preview shell
   ═══════════════════════════════════════════════════════════ */

function Cell({ type, cell }) {
  const isFullWidth = type === 'status' || type === 'read'
  const alignCls =
    cell.perspective === 'sent' ? 'bp-cell__body--sent' :
    cell.perspective === 'recv' ? 'bp-cell__body--recv' :
    ''
  return (
    <div className="bp-cell">
      <div className="bp-cell__meta">
        <span className="bp-cell__label">{cell.label}</span>
        <span className="bp-cell__axes">
          {[
            cell.format && cell.format !== '-'           && `format=${cell.format}`,
            cell.subdivision && cell.subdivision !== '-' && `sub=${cell.subdivision}`,
            cell.state && cell.state !== 'normal'        && `state=${cell.state}`,
          ].filter(Boolean).join(' · ')}
        </span>
      </div>
      <div className={`bp-cell__body ${isFullWidth ? 'bp-cell__body--full' : alignCls}`}>
        <Bubble
          type={type}
          format={cell.format}
          subdivision={cell.subdivision}
          state={cell.state || 'normal'}
          perspective={cell.perspective}
          data={cell.data}
        />
      </div>
    </div>
  )
}

function TypeSection({ typeKey, theme }) {
  const entry = MATRIX[typeKey]
  if (!entry) return null
  return (
    <section className="bp-section" id={`section-${typeKey}`}>
      <div className="bp-section__head">
        <h2 className="bp-section__title">{entry.title}</h2>
        <code className="bp-section__key">type="{typeKey}"</code>
      </div>
      <div className="bp-section__grid">
        {entry.cells.map((cell, i) => (
          <Cell key={i} type={typeKey} cell={cell} />
        ))}
      </div>
    </section>
  )
}

export default function BubblePreview({ onChange }) {
  const [theme, setTheme] = useState('light')
  const [activeType, setActiveType] = useState('all')

  const visibleTypes = useMemo(
    () => activeType === 'all' ? TYPES : [activeType],
    [activeType],
  )

  return (
    <div className={`bp-page cht-page`} data-theme={theme}>
      {/* Top bar */}
      <header className="bp-topbar">
        <button className="bp-topbar__back" type="button" aria-label="返回" onClick={() => onChange?.('chat')}>
          ←
        </button>
        <h1 className="bp-topbar__title">IMBasicMessage · 变体走查</h1>
        <div className="bp-topbar__actions">
          <div className="bp-theme-toggle" role="radiogroup" aria-label="主题">
            <button
              type="button"
              className={`bp-theme-toggle__btn ${theme === 'light' ? 'is-active' : ''}`}
              onClick={() => setTheme('light')}
              aria-pressed={theme === 'light'}
            >Light</button>
            <button
              type="button"
              className={`bp-theme-toggle__btn ${theme === 'dark' ? 'is-active' : ''}`}
              onClick={() => setTheme('dark')}
              aria-pressed={theme === 'dark'}
            >Dark</button>
          </div>
        </div>
      </header>

      <div className="bp-layout">
        {/* Sidebar nav — filter by type */}
        <aside className="bp-sidebar" aria-label="类型导航">
          <button
            type="button"
            className={`bp-nav__item ${activeType === 'all' ? 'is-active' : ''}`}
            onClick={() => setActiveType('all')}
          >
            <span className="bp-nav__dot" /> 全部 (16)
          </button>
          {TYPES.map(t => (
            <button
              key={t}
              type="button"
              className={`bp-nav__item ${activeType === t ? 'is-active' : ''}`}
              onClick={() => setActiveType(t)}
            >
              <span className="bp-nav__dot" /> {MATRIX[t]?.title || t}
            </button>
          ))}
        </aside>

        {/* Matrix */}
        <main className="bp-main">
          {visibleTypes.map(t => <TypeSection key={t} typeKey={t} theme={theme} />)}
          <footer className="bp-footer">
            对齐自 Figma · IM UI Kit 2.0 · IMBasicMessage (node 16125:45127)
          </footer>
        </main>
      </div>
    </div>
  )
}
