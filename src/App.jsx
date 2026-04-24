import { useCallback, useRef, useState } from 'react'
import Feed from './pages/Feed'
import UserProfile from './pages/UserProfile'
import Capture from './pages/Capture'
import Messages from './pages/Messages'
import Chat from './pages/Chat'
import VideoDetail from './pages/VideoDetail'
import BubblePreview from './pages/BubblePreview'
import NavBar from './shared/NavBar'
import TabBar from './shared/TabBar'
import StatusBar from './shared/StatusBar'

const screens = {
  feed:          Feed,
  profile:       UserProfile,
  capture:       Capture,
  messages:      Messages,
  chat:          Chat,
  detail:        VideoDetail,
  bubblepreview: BubblePreview,
}

const screenMeta = {
  feed:          { title: '首页 Feed', subtitle: '核心视频流基座' },
  profile:       { title: '个人主页',  subtitle: '账号展示与内容网格' },
  capture:       { title: '拍摄页',    subtitle: '拍摄与创作入口' },
  messages:      { title: '消息页',    subtitle: '对话与通知中心' },
  chat:          { title: '聊天页',    subtitle: 'IM 对话详情' },
  detail:        { title: '视频详情',  subtitle: '评论抽屉与沉浸播放' },
  bubblepreview: { title: '气泡走查',  subtitle: 'Bubble Component Preview' },
}

const TRANSITION_MS = 350
const PUSH_PAIRS = { messages: 'chat' }

export default function App() {
  const [activeScreen, setActiveScreen] = useState('messages')
  const [chatContact, setChatContact] = useState(null)
  /* Once chat has been opened, keep it mounted forever */
  const [chatMounted, setChatMounted] = useState(false)
  const [theme, setTheme] = useState('light')

  const [trans, setTrans] = useState(null)
  const timerRef = useRef(null)

  const handleChange = useCallback((next, extra) => {
    setActiveScreen((prev) => {
      if (prev === next) return prev

      if (extra?.contactName) {
        setChatContact({ name: extra.contactName, avatar: extra.contactAvatar, streak: extra.streak })
      }

      const isPush = PUSH_PAIRS[prev] === next
      const isPop = PUSH_PAIRS[next] === prev

      if (isPush) setChatMounted(true)

      if (isPush || isPop) {
        clearTimeout(timerRef.current)
        setTrans({ type: isPush ? 'push' : 'pop', from: prev, to: next })
        timerRef.current = setTimeout(() => setTrans(null), TRANSITION_MS)
      }

      return next
    })
  }, [])

  const meta = screenMeta[activeScreen]
  const isIM = activeScreen === 'messages' || activeScreen === 'chat' || activeScreen === 'bubblepreview'
  const isFlush = isIM
  const isTransitioning = !!trans

  /* Messages is always mounted when in IM flow (except bubblepreview which is standalone) */
  const inIMFlow = (isIM && activeScreen !== 'bubblepreview') || isTransitioning

  /* Animation classes */
  let chatAnimClass = ''
  let msgAnimClass = ''
  if (isTransitioning) {
    if (trans.type === 'push') {
      chatAnimClass = ' ios-slide-enter'
      msgAnimClass = ' ios-slide-back'
    } else {
      chatAnimClass = ' ios-slide-exit'
      msgAnimClass = ' ios-slide-forward'
    }
  }

  /* Chat visibility: visible when active or transitioning away */
  const chatVisible = activeScreen === 'chat' || isTransitioning
  /* When not visible and not transitioning, keep mounted but hidden off-screen */
  const chatHiddenClass = (!chatVisible && chatMounted) ? ' ios-page--hidden' : ''

  return (
    <div className="app-shell">
      <button
        type="button"
        className="theme-toggle"
        onClick={() => setTheme((t) => (t === 'light' ? 'dark' : 'light'))}
        aria-label="切换深浅色"
      >
        {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
      </button>
      <div
        className={`phone-frame${isFlush ? ' phone-frame--light' : ''}${theme === 'dark' ? ' phone-frame--dark' : ''}`}
        data-theme={theme}
      >
        {!isFlush && <StatusBar />}
        {!isFlush && <NavBar title={meta.title} subtitle={meta.subtitle} />}
        <main className={`screen-content${isFlush ? ' screen-content--flush' : ''}`}>
          {inIMFlow && (
            <>
              {/* Messages: always mounted, always in DOM */}
              <div className={`ios-page ios-page--base${msgAnimClass}`}>
                <Messages activeScreen={activeScreen} onChange={handleChange} />
              </div>

              {/* Chat: mounted once opened, hidden off-screen when inactive */}
              {chatMounted && (
                <div className={`ios-page ios-page--overlay${chatAnimClass}${chatHiddenClass}`}>
                  <Chat
                    onChange={handleChange}
                    contactName={chatContact?.name}
                    contactAvatar={chatContact?.avatar}
                    streak={chatContact?.streak}
                  />
                </div>
              )}
            </>
          )}

          {activeScreen === 'bubblepreview' && (
            <div className="ios-page ios-page--overlay">
              <BubblePreview onChange={handleChange} />
            </div>
          )}

          {!inIMFlow && activeScreen !== 'bubblepreview' && (() => {
            const Screen = screens[activeScreen]
            return <Screen activeScreen={activeScreen} onChange={handleChange} />
          })()}
        </main>
        {!isFlush && <TabBar activeScreen={activeScreen} onChange={handleChange} />}
      </div>
    </div>
  )
}
