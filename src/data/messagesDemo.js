/**
 * Messages 页示例数据 — demo only
 * 从 src/pages/Messages.jsx 抽出。
 *
 * 说明：decorative 分类下的 URL 是 Figma cut 的装饰图（故事环、加号底、拍摄 tab、在线指示等），
 *       属于设计师沉淀的视觉资产，非可替换的图标；
 *       未来若能用 CSS 或 L2 组件表达，再继续替换。
 */

/* ── Figma cut PNG assets ──
   说明：所有 icon 级视觉统一用 Figma 导出的 PNG 切图，不用 inline SVG，
         避免后续 stroke/shape 与设计稿漂移。 */
export const DECORATIVE_ASSETS = {
  // Title bar icons (PNG cuts from Figma)
  menuIcon:     'https://www.figma.com/api/mcp/asset/3cd67837-ec94-4ad1-a00e-8a3751644923',
  searchIcon:   'https://www.figma.com/api/mcp/asset/c7d6ef42-4cd7-4e3b-af60-8bc368fb4c63',
  addIcon:      'https://www.figma.com/api/mcp/asset/f8c78cf1-2dc9-4c09-b366-4d8e2b2f0e95',
  // Story rings (gradient artwork)
  ringActive:   'https://www.figma.com/api/mcp/asset/b617a970-6788-4fae-8216-ceae7a9fbe1d',
  ringMuted:    'https://www.figma.com/api/mcp/asset/583f82b8-5ed2-4cd0-8bd2-04966a841ec9',
  // Story add plus button
  storyAddBg:   'https://www.figma.com/api/mcp/asset/845195e2-8ff6-45d5-aa43-e1d1392070d2',
  storyAddIcon: 'https://www.figma.com/api/mcp/asset/e23cac87-06c2-4e34-b6fa-c8ab03b5f0e8',
  // Online indicator (story variant)
  onlineStory:  'https://www.figma.com/api/mcp/asset/5fbc7d09-96c9-4ab7-9a30-63e77e9d2f2b',
  // Bottom nav center capture tab (brand artwork)
  captureTab:   'https://www.figma.com/api/mcp/asset/634790b7-8f77-426f-ad9e-93f9a51539c7',
  // Cell decorations (used by ConversationRow)
  muteIcon:      'https://www.figma.com/api/mcp/asset/c43e4a4b-8faf-4224-b8a9-efe9a5d9412f',
  reactionLaugh: 'https://www.figma.com/api/mcp/asset/5e265c06-9983-4cbb-99f9-ac2f0d7e8fae',
}

/* ── Avatars ── */
const AVATAR = {
  mine:     'https://www.figma.com/api/mcp/asset/8cdbe76b-4142-4da0-95fb-40ff08cab7e9',
  anka:     'https://www.figma.com/api/mcp/asset/7a15bf86-b693-4ead-afd0-375cb937a941',
  weiyi:    'https://www.figma.com/api/mcp/asset/a6cb7859-b6ec-435f-bfa7-d9d569a6cc2f',
  zoe:      'https://www.figma.com/api/mcp/asset/0c86a603-8908-454d-909b-50ed25d4ef4f',
  yezi:     'https://www.figma.com/api/mcp/asset/9e946d7b-1a7b-4eee-831f-8254e78ec4df',
  hudong:   'https://www.figma.com/api/mcp/asset/55f86530-9f64-4eab-9787-8602a1cbaaf8',
  sliva:    'https://www.figma.com/api/mcp/asset/69f6571f-6575-48b3-a780-06c25f4c71c6',
  jianzhao: 'https://www.figma.com/api/mcp/asset/647ff3d3-f34e-4ec0-ba55-f6cb5e1c27b4',
  f3:       'https://www.figma.com/api/mcp/asset/e8d2e757-b505-4c4d-9bac-926ba8e92127',
  huohuo:   'https://www.figma.com/api/mcp/asset/9091b541-b1a7-4056-8ed0-2ca07f18ae80',
  chengzi:  'https://www.figma.com/api/mcp/asset/4f320bcd-1704-40b9-918e-40af07ef93a0',
  simin:    'https://www.figma.com/api/mcp/asset/7331803f-6d54-4719-b372-1ddd7b6d7e63',
  goususu:  'https://www.figma.com/api/mcp/asset/e70ec2b4-398e-4517-8601-5008f729ff06',
  xuyuan:   'https://www.figma.com/api/mcp/asset/2147c95a-c4b2-4904-897e-bd909f7868c1',
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
