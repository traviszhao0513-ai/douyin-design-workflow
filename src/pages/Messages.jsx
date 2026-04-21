import Avatar from '../../Douyin_design_system/ui/components/Avatar/Avatar'
import Badge from '../../Douyin_design_system/ui/components/Badge/Badge'
import BottomNav from '../../Douyin_design_system/ui/components/BottomNav/BottomNav'
import './Messages.css'

/* ── Figma cut assets (fresh URLs, valid 7 days from session) ── */
const ASSETS = {
  // Status bar
  cellular:       'https://www.figma.com/api/mcp/asset/e6ad5e36-4e95-4927-9c96-5ac3892ea296',
  wifi:           'https://www.figma.com/api/mcp/asset/01f395b2-3bbb-4c41-bcfd-e501a7855330',
  batteryOutline: 'https://www.figma.com/api/mcp/asset/62e9da0d-bf30-4c33-9ebf-03e7ea0afbca',
  batteryCap:     'https://www.figma.com/api/mcp/asset/abb0e133-33b9-4230-87ce-84d1f852c6c1',
  batteryFill:    'https://www.figma.com/api/mcp/asset/495a70fd-feb3-4b2e-ac43-21e0ea0f30f4',
  // Title bar
  menuIcon:       'https://www.figma.com/api/mcp/asset/3cd67837-ec94-4ad1-a00e-8a3751644923',
  searchIcon:     'https://www.figma.com/api/mcp/asset/c7d6ef42-4cd7-4e3b-af60-8bc368fb4c63',
  addIcon:        'https://www.figma.com/api/mcp/asset/f8c78cf1-2dc9-4c09-b366-4d8e2b2f0e95',
  // Story rings (Figma gradient ring images)
  ringActive:     'https://www.figma.com/api/mcp/asset/b617a970-6788-4fae-8216-ceae7a9fbe1d',
  ringMuted:      'https://www.figma.com/api/mcp/asset/583f82b8-5ed2-4cd0-8bd2-04966a841ec9',
  // Story add button (two-layer: bg circle + plus icon)
  storyAddBg:     'https://www.figma.com/api/mcp/asset/845195e2-8ff6-45d5-aa43-e1d1392070d2',
  storyAddIcon:   'https://www.figma.com/api/mcp/asset/e23cac87-06c2-4e34-b6fa-c8ab03b5f0e8',
  // Online indicators
  onlineStory:    'https://www.figma.com/api/mcp/asset/5fbc7d09-96c9-4ab7-9a30-63e77e9d2f2b',
  onlineCell:     'https://www.figma.com/api/mcp/asset/1f7a4396-c715-4f85-97c4-0f3f760c1c5b',
  // Story avatars (Figma photos)
  avatarMine:     'https://www.figma.com/api/mcp/asset/8cdbe76b-4142-4da0-95fb-40ff08cab7e9',
  avatarAnka:     'https://www.figma.com/api/mcp/asset/7a15bf86-b693-4ead-afd0-375cb937a941',
  avatarWeiyi:    'https://www.figma.com/api/mcp/asset/a6cb7859-b6ec-435f-bfa7-d9d569a6cc2f',
  avatarZoe:      'https://www.figma.com/api/mcp/asset/0c86a603-8908-454d-909b-50ed25d4ef4f',
  avatarYezi:     'https://www.figma.com/api/mcp/asset/9e946d7b-1a7b-4eee-831f-8254e78ec4df',
  // Conversation avatars
  avatarHudong:   'https://www.figma.com/api/mcp/asset/55f86530-9f64-4eab-9787-8602a1cbaaf8',
  avatarSliva:    'https://www.figma.com/api/mcp/asset/69f6571f-6575-48b3-a780-06c25f4c71c6',
  avatarJianzhao: 'https://www.figma.com/api/mcp/asset/647ff3d3-f34e-4ec0-ba55-f6cb5e1c27b4',
  avatarF3:       'https://www.figma.com/api/mcp/asset/e8d2e757-b505-4c4d-9bac-926ba8e92127',
  avatarHuohuo:   'https://www.figma.com/api/mcp/asset/9091b541-b1a7-4056-8ed0-2ca07f18ae80',
  avatarChengzi:  'https://www.figma.com/api/mcp/asset/4f320bcd-1704-40b9-918e-40af07ef93a0',
  avatarSimin:    'https://www.figma.com/api/mcp/asset/7331803f-6d54-4719-b372-1ddd7b6d7e63',
  avatarGoususu:  'https://www.figma.com/api/mcp/asset/e70ec2b4-398e-4517-8601-5008f729ff06',
  avatarXuyuan:   'https://www.figma.com/api/mcp/asset/2147c95a-c4b2-4904-897e-bd909f7868c1',
  // Cell decoration assets
  muteIcon:       'https://www.figma.com/api/mcp/asset/c43e4a4b-8faf-4224-b8a9-efe9a5d9412f',
  reactionLaugh:  'https://www.figma.com/api/mcp/asset/5e265c06-9983-4cbb-99f9-ac2f0d7e8fae',
  streakMask:     'https://www.figma.com/api/mcp/asset/53bb9b78-b450-4568-97ed-55d07788db7b',
  streakBase:     'https://www.figma.com/api/mcp/asset/253cf483-6897-4dea-92a6-738b6437d68c',
  streakTop:      'https://www.figma.com/api/mcp/asset/db40e93d-dcf0-49f3-8c44-da3ae8f75009',
  // Bottom nav center tab
  centerTab:      'https://www.figma.com/api/mcp/asset/634790b7-8f77-426f-ad9e-93f9a51539c7',
}

const STORIES = [
  { id: 'mine',  name: '我的日常', avatar: ASSETS.avatarMine,  ring: 'active', add: true },
  { id: 'anka',  name: '安卡',     avatar: ASSETS.avatarAnka,  ring: 'active', online: true },
  { id: 'weiyi', name: '为益',     avatar: ASSETS.avatarWeiyi, ring: 'active' },
  { id: 'zoe',   name: 'Zoe',      avatar: ASSETS.avatarZoe,   ring: 'muted' },
  { id: 'yezi',  name: '椰子🥥',  avatar: ASSETS.avatarYezi,  online: true },
]

const CONVERSATIONS = [
  { id: 'hudong',   name: '互动消息',     avatar: ASSETS.avatarHudong,   preview: '小YY 赞了你的作品', time: '11:12' },
  { id: 'sliva',    name: 'Sliva',        avatar: ASSETS.avatarSliva,    preview: '明天去干嘛', time: '11:12', unread: 9 },
  { id: 'jianzhao', name: '建昭',         avatar: ASSETS.avatarJianzhao, preview: '30 分钟内在线', time: '11:12', unread: 1 },
  { id: 'f3',       name: 'F3 缺一',      avatar: ASSETS.avatarF3,       preview: '今晚豆角胡同？大跃啤酒走起？？？', time: '11:12', muted: true },
  { id: 'huohuo',   name: '火火',         avatar: ASSETS.avatarHuohuo,   preview: '今晚豆角胡同？大跃啤酒走起？？？', time: '11:12', online: true, reaction: true },
  { id: 'chengzi',  name: '橙子味大叔',   avatar: ASSETS.avatarChengzi,  preview: '[分享视频]', time: '11:12' },
  { id: 'simin',    name: 'simin',        avatar: ASSETS.avatarSimin,    preview: '已读 · 这个天气热死了，想在空调里吃西瓜啦啦啦啦', time: '11:12', streak: 3 },
  { id: 'goususu',  name: '狗酥酥',       avatar: ASSETS.avatarGoususu,  redPreview: "[语音] 2''", time: '11:12' },
  { id: 'xuyuan',   name: '徐圆圆在这里', avatar: ASSETS.avatarXuyuan,   redPreview: '[红包]', grayPreview: '[分享视频]', time: '11:12' },
]

/* ── Online indicator — Figma cut image ── */
function OnlineIndicator({ kind }) {
  const src = kind === 'story' ? ASSETS.onlineStory : ASSETS.onlineCell
  const cls = kind === 'story' ? 'msg-story__online-image' : 'msg-cell__online-image'
  return <img className={cls} src={src} alt="" aria-hidden="true" />
}

/* ── Streak badge — flame image + count ── */
function StreakBadge({ count }) {
  return (
    <span className="msg-cell__streak" aria-label={`${count} 连续互动`}>
      <img
        className="msg-cell__streak-icon"
        src="/assets/streak-flame.png"
        alt=""
        aria-hidden="true"
      />
      <span className="msg-cell__streak-count">{count}</span>
    </span>
  )
}

/* ── Status bar ── */
function MessageStatusBar() {
  return (
    <div className="msg-status-bar" aria-hidden="true">
      <span className="msg-status-bar__time">9:41</span>
      <div className="msg-status-bar__icons">
        <img className="msg-status-bar__cellular" src={ASSETS.cellular} alt="" />
        <img className="msg-status-bar__wifi" src={ASSETS.wifi} alt="" />
        <div className="msg-status-bar__battery">
          <img className="msg-status-bar__battery-outline" src={ASSETS.batteryOutline} alt="" />
          <img className="msg-status-bar__battery-fill"    src={ASSETS.batteryFill}    alt="" />
          <img className="msg-status-bar__battery-cap"     src={ASSETS.batteryCap}     alt="" />
        </div>
      </div>
    </div>
  )
}

/* ── Title bar ── */
function MessageTitleBar() {
  return (
    <header className="msg-title-bar">
      <button className="msg-title-bar__touch msg-title-bar__touch--menu" type="button" aria-label="打开菜单">
        <div className="msg-title-bar__menu-icon">
          <img src={ASSETS.menuIcon} alt="" />
        </div>
      </button>
      <h1 className="msg-title-bar__title">消息</h1>
      <div className="msg-title-bar__actions">
        <button className="msg-title-bar__touch msg-title-bar__touch--search" type="button" aria-label="搜索">
          <img className="msg-title-bar__search-icon" src={ASSETS.searchIcon} alt="" />
        </button>
        <button className="msg-title-bar__touch msg-title-bar__touch--add" type="button" aria-label="新建会话">
          <div className="msg-title-bar__add-icon-shell">
            <img className="msg-title-bar__add-icon" src={ASSETS.addIcon} alt="" />
          </div>
        </button>
      </div>
    </header>
  )
}

/* ── Story item — Figma ring image + Figma avatar ── */
function StoryItem({ name, avatar, ring, online, add }) {
  return (
    <div className="msg-story">
      <button className="msg-story__pressable" type="button" aria-label={name}>
        <div className="msg-story__avatar-shell">
          {ring === 'active' && (
            <img className="msg-story__ring" src={ASSETS.ringActive} alt="" aria-hidden="true" />
          )}
          {ring === 'muted' && (
            <img className="msg-story__ring" src={ASSETS.ringMuted} alt="" aria-hidden="true" />
          )}
          <Avatar className="msg-story__avatar" size="xl" src={avatar} alt={name} />
          {online && <OnlineIndicator kind="story" />}
          {add && (
            <>
              <img className="msg-story__add-bg"   src={ASSETS.storyAddBg}   alt="" aria-hidden="true" />
              <img className="msg-story__add-icon" src={ASSETS.storyAddIcon} alt="" aria-hidden="true" />
            </>
          )}
        </div>
      </button>
      <span className="msg-story__name">{name}</span>
    </div>
  )
}

function StoryRail() {
  return (
    <section className="msg-story-rail" aria-label="故事头像">
      {STORIES.map((story) => (
        <StoryItem key={story.id} {...story} />
      ))}
    </section>
  )
}

/* ── Conversation row ── */
function ConversationRow({ name, avatar, preview, time, unread, online, muted, reaction, streak, redPreview, grayPreview, onTap }) {
  return (
    <button className="msg-cell" type="button" onClick={onTap}>
      <div className="msg-cell__avatar-shell">
        <Avatar className="msg-cell__avatar" size="56" src={avatar} alt={name} />
        {online && <OnlineIndicator kind="cell" />}
      </div>

      <div className="msg-cell__content">
        <div className="msg-cell__header">
          <div className="msg-cell__name-wrap">
            <span className="msg-cell__name">{name}</span>
            {streak && <StreakBadge count={streak} />}
          </div>
          <div className="msg-cell__meta">
            {muted && (
              <span className="msg-cell__mute" aria-label="已静音">
                <img className="msg-cell__mute-glyph" src={ASSETS.muteIcon} alt="" aria-hidden="true" />
              </span>
            )}
            <span className="msg-cell__time">{time}</span>
          </div>
        </div>

        <div className="msg-cell__preview-row">
          {reaction && (
            <span className="msg-cell__reaction" aria-hidden="true">
              <img className="msg-cell__reaction-emoji" src={ASSETS.reactionLaugh} alt="" />
              <span className="msg-cell__reaction-divider" />
            </span>
          )}

          {redPreview && grayPreview && (
            <span className="msg-cell__mixed-preview">
              <span className="msg-cell__preview msg-cell__preview--accent">{redPreview}</span>
              <span className="msg-cell__preview msg-cell__preview--muted">{grayPreview}</span>
            </span>
          )}

          {redPreview && !grayPreview && (
            <span className="msg-cell__preview msg-cell__preview--accent">{redPreview}</span>
          )}

          {!redPreview && (
            <span className="msg-cell__preview msg-cell__preview--muted">{preview}</span>
          )}

          {unread && <Badge count={unread} color="danger" className="msg-cell__badge" />}
        </div>
      </div>
    </button>
  )
}

function MessageList({ onChange }) {
  return (
    <section className="msg-list" aria-label="会话列表">
      {CONVERSATIONS.map((item) => (
        <ConversationRow
          key={item.id}
          {...item}
          onTap={() => onChange?.('chat', { contactName: item.name, contactAvatar: item.avatar })}
        />
      ))}
    </section>
  )
}

/* ── Bottom bar with Figma capture tab image ── */
function MessageBottomBar({ onChange }) {
  const items = [
    { key: 'feed',     icon: <span className="msg-bottom-nav__text">首页</span> },
    { key: 'friends',  icon: <span className="msg-bottom-nav__text">朋友</span> },
    {
      key: 'capture',
      icon: (
        <img
          className="msg-bottom-nav__capture-image"
          src={ASSETS.centerTab}
          alt="拍摄"
          aria-hidden="true"
        />
      ),
    },
    {
      key: 'messages',
      icon: <span className="msg-bottom-nav__text">消息</span>,
      badge: <span className="msg-bottom-nav__badge-number">6</span>,
    },
    { key: 'profile', icon: <span className="msg-bottom-nav__text">我</span> },
  ]

  const handleChange = (key) => {
    if (!onChange) return
    if (key === 'friends') { onChange('feed'); return }
    onChange(key)
  }

  return (
    <div className="msg-bottom-bar">
      <div className="msg-bottom-bar__divider" />
      <div className="msg-bottom-bar__nav-shell">
        <BottomNav activeKey="messages" className="msg-bottom-nav" items={items} onChange={handleChange} showLabel={false} />
      </div>
      <div className="msg-bottom-bar__home-indicator" aria-hidden="true">
        <div className="msg-bottom-bar__home-pill" />
      </div>
    </div>
  )
}

export default function Messages({ onChange }) {
  return (
    <div className="msg-page">
      <MessageStatusBar />
      <MessageTitleBar />
      <StoryRail />
      <MessageList onChange={onChange} />
      <MessageBottomBar onChange={onChange} />
    </div>
  )
}
