/**
 * Messages 页示例数据 — demo only
 *
 * 资产路径约定：
 * - 装饰 icon → 统一走 `src/assets/im/index.js` 导出的 SVG React 组件，
 *   fill/stroke 用 currentColor，在 light/dark 下通过父级 CSS `color:` 继承语义 token；
 * - 头像 / 表情 PNG → 放在 `public/assets/` 下，通过绝对路径 `/assets/...` 引用；
 * - 不再使用 Figma MCP 会话绑定 URL（session 过期会 404）。
 */
import {
  MenuIcon,
  SearchIcon,
  AddIcon,
  RingActiveIcon,
  RingMutedIcon,
  StoryAddBgIcon,
  StoryAddPlusIcon,
  OnlineStoryIcon,
  OnlineCellIcon,
  MuteIcon,
  CaptureTabIcon,
} from '../assets/im'

/* ── Decorative assets ──
   Icon 全部是 React 组件（SVG via svgr），彩色 PNG 走 src 字段。 */
export const DECORATIVE_ASSETS = {
  // Title bar
  MenuIcon,
  SearchIcon,
  AddIcon,
  // Story rings
  RingActiveIcon,
  RingMutedIcon,
  // Story add-plus
  StoryAddBgIcon,
  StoryAddPlusIcon,
  // Online indicators
  OnlineStoryIcon,
  OnlineCellIcon,
  // Cell decorations
  MuteIcon,
  // Reaction sticker (raster — emoji is theme-neutral)
  reactionLaughSrc: '/assets/im/reaction-laugh.png',
  // Bottom nav capture tab
  CaptureTabIcon,
}

/* ── Avatars (local PNGs) ── */
const AVATAR = {
  mine:     '/assets/avatars/mine.png',
  anka:     '/assets/avatars/anka.png',
  weiyi:    '/assets/avatars/weiyi.png',
  zoe:      '/assets/avatars/zoe.png',
  yezi:     '/assets/avatars/yezi.png',
  hudong:   '/assets/avatars/hudong.png',
  sliva:    '/assets/avatars/sliva.png',
  jianzhao: '/assets/avatars/jianzhao.png',
  f3:       '/assets/avatars/f3.png',
  huohuo:   '/assets/avatars/huohuo.png',
  chengzi:  '/assets/avatars/chengzi.png',
  simin:    '/assets/avatars/simin.png',
  goususu:  '/assets/avatars/goususu.png',
  xuyuan:   '/assets/avatars/xuyuan.png',
}

/* ── Stories ── */
export const STORIES = [
  { id: 'mine',  name: '我的日常', avatar: AVATAR.mine,  ring: 'active', add: true },
  { id: 'anka',  name: '安卡',     avatar: AVATAR.anka,  ring: 'active', online: true },
  { id: 'weiyi', name: '为益',     avatar: AVATAR.weiyi, ring: 'active' },
  { id: 'zoe',   name: 'Zoe',      avatar: AVATAR.zoe,   ring: 'muted' },
  { id: 'yezi',  name: '椰子🥥',  avatar: AVATAR.yezi,  online: true },
]

/* ── Conversations ── */
export const CONVERSATIONS = [
  { id: 'hudong',   name: '互动消息',     avatar: AVATAR.hudong,   preview: '小YY 赞了你的作品', time: '11:12' },
  { id: 'sliva',    name: 'Sliva',        avatar: AVATAR.sliva,    preview: '明天去干嘛', time: '11:12', unread: 9 },
  { id: 'jianzhao', name: '建昭',         avatar: AVATAR.jianzhao, preview: '30 分钟内在线', time: '11:12', unread: 1 },
  { id: 'f3',       name: 'F3 缺一',      avatar: AVATAR.f3,       preview: '今晚豆角胡同？大跃啤酒走起？？？', time: '11:12', muted: true },
  { id: 'huohuo',   name: '火火',         avatar: AVATAR.huohuo,   preview: '今晚豆角胡同？大跃啤酒走起？？？', time: '11:12', online: true, reaction: true },
  { id: 'chengzi',  name: '橙子味大叔',   avatar: AVATAR.chengzi,  preview: '[分享视频]', time: '11:12' },
  { id: 'simin',    name: 'simin',        avatar: AVATAR.simin,    preview: '已读 · 这个天气热死了，想在空调里吃西瓜啦啦啦啦', time: '11:12', streak: 3 },
  { id: 'goususu',  name: '狗酥酥',       avatar: AVATAR.goususu,  redPreview: "[语音] 2''", time: '11:12' },
  { id: 'xuyuan',   name: '徐圆圆在这里', avatar: AVATAR.xuyuan,   redPreview: '[红包]', grayPreview: '[分享视频]', time: '11:12' },
]
