import { useMemo, useState } from 'react'
import Feed from './pages/Feed'
import UserProfile from './pages/UserProfile'
import Capture from './pages/Capture'
import Messages from './pages/Messages'
import VideoDetail from './pages/VideoDetail'
import NavBar from './shared/NavBar'
import TabBar from './shared/TabBar'
import StatusBar from './shared/StatusBar'

const screens = {
  feed:     Feed,
  profile:  UserProfile,
  capture:  Capture,
  messages: Messages,
  detail:   VideoDetail,
}

const screenMeta = {
  feed:     { title: '首页 Feed', subtitle: '核心视频流基座' },
  profile:  { title: '个人主页',  subtitle: '账号展示与内容网格' },
  capture:  { title: '拍摄页',    subtitle: '拍摄与创作入口' },
  messages: { title: '消息页',    subtitle: '对话与通知中心' },
  detail:   { title: '视频详情',  subtitle: '评论抽屉与沉浸播放' },
}

export default function App() {
  const [activeScreen, setActiveScreen] = useState('messages')
  const ActiveScreen = useMemo(() => screens[activeScreen], [activeScreen])
  const meta = screenMeta[activeScreen]
  const isMessages = activeScreen === 'messages'

  return (
    <div className="app-shell">
      <div className={`phone-frame${isMessages ? ' phone-frame--light' : ''}`}>
        {!isMessages && <StatusBar />}
        {!isMessages && <NavBar title={meta.title} subtitle={meta.subtitle} />}
        <main className={`screen-content${isMessages ? ' screen-content--flush' : ''}`}>
          <ActiveScreen activeScreen={activeScreen} onChange={setActiveScreen} />
        </main>
        {!isMessages && <TabBar activeScreen={activeScreen} onChange={setActiveScreen} />}
      </div>
    </div>
  )
}
