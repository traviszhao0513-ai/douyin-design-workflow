import Avatar from '../../Douyin_design_system/ui/components/Avatar/Avatar'
import Badge from '../../Douyin_design_system/ui/components/Badge/Badge'
import BottomNav from '../../Douyin_design_system/ui/components/BottomNav/BottomNav'
import './Messages.css'

const ASSETS = {
  battery: 'https://www.figma.com/api/mcp/asset/24dd205d-8f20-485f-b4c4-a44741a72ca3',
  wifi: 'https://www.figma.com/api/mcp/asset/66d3a09b-2f12-4e49-b7ac-242aca472358',
  cellular: 'https://www.figma.com/api/mcp/asset/ab89c1ef-0974-4e6a-9d22-0ca4902df618',
  titleMenu: 'https://www.figma.com/api/mcp/asset/58494da4-9e95-4305-bc9c-703874f7caa0',
  titleSearch: 'https://www.figma.com/api/mcp/asset/a2048319-7098-462b-b6b6-43b14583251e',
  titleAdd: 'https://www.figma.com/api/mcp/asset/83e26fac-3e74-44ff-8e02-26877a09206e',
  ringActive: 'https://www.figma.com/api/mcp/asset/9d463d53-ee82-4700-a993-4007ae43be36',
  ringMuted: 'https://www.figma.com/api/mcp/asset/66c481a8-0f5b-409f-9380-98e1a1f9e5c8',
  storyAddBg: 'https://www.figma.com/api/mcp/asset/e266aa4a-0dbd-488b-83d8-def120d33020',
  storyAddIcon: 'https://www.figma.com/api/mcp/asset/fcea8c78-079b-40ef-bfb7-b90985ba9bbe',
  avatarStoryMine: 'https://www.figma.com/api/mcp/asset/294a595d-c9a6-44e6-9703-b055d830cc1d',
  avatarStoryAnka: 'https://www.figma.com/api/mcp/asset/ddb06e4a-2838-4098-a857-55eaf9730abd',
  avatarStoryWeiyi: 'https://www.figma.com/api/mcp/asset/d8ac4e4b-44cc-4006-a3c8-8a0160200727',
  avatarStoryZoe: 'https://www.figma.com/api/mcp/asset/94989453-28c1-4f23-8dc7-5cd7f35406ca',
  avatarStoryYezi: 'https://www.figma.com/api/mcp/asset/b28813a1-fac9-4de3-a36b-bab728cef347',
  avatarHudong: 'https://www.figma.com/api/mcp/asset/7da4938f-932d-4eb1-ba9d-7b5c9f52f876',
  avatarSliva: 'https://www.figma.com/api/mcp/asset/1b9e8248-68a1-4b0f-beeb-d2ee4afa7d68',
  avatarJianzhao: 'https://www.figma.com/api/mcp/asset/4df42ff3-80ad-4289-acec-415f3879a814',
  avatarF3: 'https://www.figma.com/api/mcp/asset/db6678bc-aed6-43d2-abf5-984ec1bb9987',
  avatarHuohuo: 'https://www.figma.com/api/mcp/asset/8ea22de8-af43-4ebb-9a2a-ad8e8d836cdd',
  avatarChengzi: 'https://www.figma.com/api/mcp/asset/857ffd04-51b9-4522-9154-5a35a6f5267c',
  avatarSimin: 'https://www.figma.com/api/mcp/asset/6ba502d0-35d1-4e6b-8874-b9be89810f70',
  avatarGoususu: 'https://www.figma.com/api/mcp/asset/e0ff9a84-645d-4e8a-9c63-5c2d788938dd',
  avatarXuyuan: 'https://www.figma.com/api/mcp/asset/e0ff9a84-645d-4e8a-9c63-5c2d788938dd',
  mute: 'https://www.figma.com/api/mcp/asset/f5a6eeae-432d-41d3-89df-95bd982b418c',
  storyOnline: 'https://www.figma.com/api/mcp/asset/8b9c8105-cf0e-499e-9ea4-bba8f46d87cd',
  cellOnline: 'https://www.figma.com/api/mcp/asset/eef5af1a-2332-4251-b9ec-723f09fcc17a',
  streakMask: 'https://www.figma.com/api/mcp/asset/5655c009-7516-4549-ab14-65bd217b1d26',
  streakBase: 'https://www.figma.com/api/mcp/asset/4bcfd1c6-ed16-41f8-a7b6-f53c286daf39',
  streakTop: 'https://www.figma.com/api/mcp/asset/37a15f1b-3a56-4469-8f55-5d0b5087d3b8',
  reactionLaugh: 'https://www.figma.com/api/mcp/asset/c1dac7e6-603c-4c5a-8ec3-1dc5e9cfa576',
  centerTab: 'https://www.figma.com/api/mcp/asset/a318f80b-d838-4ab3-a804-19090adb8c17',
}

const STORIES = [
  { id: 'mine', name: '我的日常', avatar: ASSETS.avatarStoryMine, ring: 'active', add: true },
  { id: 'anka', name: '安卡', avatar: ASSETS.avatarStoryAnka, ring: 'active', online: true },
  { id: 'weiyi', name: '为益', avatar: ASSETS.avatarStoryWeiyi, ring: 'active' },
  { id: 'zoe', name: 'Zoe', avatar: ASSETS.avatarStoryZoe, ring: 'muted' },
  { id: 'yezi', name: '椰子🥥', avatar: ASSETS.avatarStoryYezi, online: true },
]

const CONVERSATIONS = [
  { id: 'hudong', name: '互动消息', avatar: ASSETS.avatarHudong, preview: '小YY 赞了你的作品', time: '11:12' },
  { id: 'sliva', name: 'Sliva', avatar: ASSETS.avatarSliva, preview: '明天去干嘛', time: '11:12', unread: 9 },
  { id: 'jianzhao', name: '建昭', avatar: ASSETS.avatarJianzhao, preview: '30 分钟内在线', time: '11:12', unread: 1 },
  { id: 'f3', name: 'F3 缺一', avatar: ASSETS.avatarF3, preview: '今晚豆角胡同？大跃啤酒走起？？？', time: '11:12', muted: true },
  {
    id: 'huohuo',
    name: '火火',
    avatar: ASSETS.avatarHuohuo,
    preview: '今晚豆角胡同？大跃啤酒走起？？？',
    time: '11:12',
    online: true,
    reaction: ASSETS.reactionLaugh,
  },
  { id: 'chengzi', name: '橙子味大叔', avatar: ASSETS.avatarChengzi, preview: '[分享视频]', time: '11:12' },
  {
    id: 'simin',
    name: 'simin',
    avatar: ASSETS.avatarSimin,
    preview: '已读 · 这个天气热死了，想在空调里吃西瓜啦啦啦啦',
    time: '11:12',
    streak: 3,
  },
  { id: 'goususu', name: '狗酥酥', avatar: ASSETS.avatarGoususu, redPreview: "[语音] 2''", time: '11:12' },
  { id: 'xuyuan', name: '徐圆圆在这里', avatar: ASSETS.avatarXuyuan, redPreview: '[红包]', grayPreview: '[分享视频]', time: '11:12' },
]

function OnlineIndicator({ kind }) {
  const src = kind === 'story' ? ASSETS.storyOnline : ASSETS.cellOnline
  const className = kind === 'story' ? 'msg-story__online-indicator' : 'msg-cell__online-indicator'
  const imageClassName = kind === 'story' ? 'msg-story__online-image' : 'msg-cell__online-image'

  return (
    <span className={className} aria-hidden="true">
      <img className={imageClassName} src={src} alt="" />
    </span>
  )
}

function StreakBadge({ count }) {
  const maskStyle = {
    WebkitMaskImage: `url(${ASSETS.streakMask})`,
    maskImage: `url(${ASSETS.streakMask})`,
    WebkitMaskRepeat: 'no-repeat',
    maskRepeat: 'no-repeat',
    WebkitMaskSize: '12.584px 16.782px',
    maskSize: '12.584px 16.782px',
  }

  return (
    <span className="msg-cell__streak" aria-label={`${count} 连续互动`}>
      <span className="msg-cell__streak-icon" aria-hidden="true">
        <span
          className="msg-cell__streak-base"
          style={{
            ...maskStyle,
            WebkitMaskPosition: '-1.945px -6.365px',
            maskPosition: '-1.945px -6.365px',
          }}
        >
          <img className="msg-cell__streak-base-fill" src={ASSETS.streakBase} alt="" />
        </span>
        <span className="msg-cell__streak-top-shell">
          <span
            className="msg-cell__streak-top-mask"
            style={{
              ...maskStyle,
              WebkitMaskPosition: '0.178px -0.153px',
              maskPosition: '0.178px -0.153px',
            }}
          >
            <img className="msg-cell__streak-top-fill" src={ASSETS.streakTop} alt="" />
          </span>
        </span>
      </span>
      <span className="msg-cell__streak-count">{count}</span>
    </span>
  )
}

function MessageStatusBar() {
  return (
    <div className="msg-status-bar" aria-hidden="true">
      <span className="msg-status-bar__time">9:41</span>
      <div className="msg-status-bar__icons">
        <img className="msg-status-bar__cellular" src={ASSETS.cellular} alt="" />
        <img className="msg-status-bar__wifi" src={ASSETS.wifi} alt="" />
        <img className="msg-status-bar__battery" src={ASSETS.battery} alt="" />
      </div>
    </div>
  )
}

function MessageTitleBar() {
  return (
    <header className="msg-title-bar">
      <button className="msg-title-bar__touch msg-title-bar__touch--menu" type="button" aria-label="打开菜单">
        <span className="msg-title-bar__menu-icon" aria-hidden="true">
          <img src={ASSETS.titleMenu} alt="" />
        </span>
      </button>
      <h1 className="msg-title-bar__title">消息</h1>
      <div className="msg-title-bar__actions">
        <button className="msg-title-bar__touch msg-title-bar__touch--search" type="button" aria-label="搜索">
          <img className="msg-title-bar__search-icon" src={ASSETS.titleSearch} alt="" />
        </button>
        <button className="msg-title-bar__touch msg-title-bar__touch--add" type="button" aria-label="新建会话">
          <span className="msg-title-bar__add-icon-shell" aria-hidden="true">
            <img className="msg-title-bar__add-icon" src={ASSETS.titleAdd} alt="" />
          </span>
        </button>
      </div>
    </header>
  )
}

function StoryItem({ name, avatar, ring, online, add }) {
  const ringSrc = ring === 'muted' ? ASSETS.ringMuted : ASSETS.ringActive

  return (
    <div className="msg-story">
      <button className="msg-story__pressable" type="button" aria-label={name}>
        <div className={`msg-story__avatar-shell${ring ? '' : ' msg-story__avatar-shell--plain'}`}>
          {ring ? <img className="msg-story__ring" src={ringSrc} alt="" /> : null}
          <Avatar className="msg-story__avatar" size="xl" src={avatar} alt={name} />
          {online ? <OnlineIndicator kind="story" /> : null}
          {add ? (
            <span className="msg-story__add" aria-hidden="true">
              <img className="msg-story__add-bg" src={ASSETS.storyAddBg} alt="" />
              <img className="msg-story__add-icon" src={ASSETS.storyAddIcon} alt="" />
            </span>
          ) : null}
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

function ConversationRow({
  name,
  avatar,
  preview,
  time,
  unread,
  online,
  muted,
  reaction,
  streak,
  redPreview,
  grayPreview,
}) {
  return (
    <button className="msg-cell" type="button">
      <div className="msg-cell__avatar-shell">
        <Avatar className="msg-cell__avatar" size="xl" style={{ width: 56, height: 56 }} src={avatar} alt={name} />
        {online ? <OnlineIndicator kind="cell" /> : null}
      </div>

      <div className="msg-cell__content">
        <div className="msg-cell__header">
          <div className="msg-cell__name-wrap">
            <span className="msg-cell__name">{name}</span>
            {streak ? <StreakBadge count={streak} /> : null}
          </div>

          <div className="msg-cell__meta">
            {muted ? (
              <span className="msg-cell__mute" aria-hidden="true">
                <img className="msg-cell__mute-glyph" src={ASSETS.mute} alt="" />
              </span>
            ) : null}
            <span className="msg-cell__time">{time}</span>
          </div>
        </div>

        <div className="msg-cell__preview-row">
          {reaction ? (
            <span className="msg-cell__reaction" aria-hidden="true">
              <span className="msg-cell__reaction-emoji">
                <img src={reaction} alt="" />
              </span>
              <span className="msg-cell__reaction-divider" />
            </span>
          ) : null}

          {redPreview && grayPreview ? (
            <span className="msg-cell__mixed-preview">
              <span className="msg-cell__preview msg-cell__preview--accent">{redPreview}</span>
              <span className="msg-cell__preview msg-cell__preview--muted">{grayPreview}</span>
            </span>
          ) : null}

          {redPreview && !grayPreview ? (
            <span className="msg-cell__preview msg-cell__preview--accent">{redPreview}</span>
          ) : null}

          {!redPreview ? (
            <span className="msg-cell__preview msg-cell__preview--muted">{preview}</span>
          ) : null}

          {unread ? <Badge count={unread} color="danger" className="msg-cell__badge" /> : null}
        </div>
      </div>
    </button>
  )
}

function MessageList() {
  return (
    <section className="msg-list" aria-label="会话列表">
      {CONVERSATIONS.map((item) => (
        <ConversationRow key={item.id} {...item} />
      ))}
    </section>
  )
}

function MessageBottomBar({ onChange }) {
  const items = [
    { key: 'feed', icon: <span className="msg-bottom-nav__text">首页</span> },
    { key: 'friends', icon: <span className="msg-bottom-nav__text">朋友</span> },
    {
      key: 'capture',
      icon: (
        <img className="msg-bottom-nav__capture-image" src={ASSETS.centerTab} alt="" />
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
    if (key === 'friends') {
      onChange('feed')
      return
    }
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
      <MessageList />
      <MessageBottomBar onChange={onChange} />
    </div>
  )
}
