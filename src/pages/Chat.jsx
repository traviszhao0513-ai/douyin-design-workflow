import { useState } from 'react'
import './Chat.css'
import IMStatusBar    from '../components/im/IMStatusBar'
import ChatTopBar     from '../components/im/ChatTopBar'
import MessageRow     from '../components/im/MessageRow'
import QuickReplyBar  from '../components/im/QuickReplyBar'
import InputBar       from '../components/im/InputBar'
import HomeIndicator  from '../components/im/HomeIndicator'
import { CHAT_ASSETS, QUICK_REPLIES, MESSAGES } from '../data/chatDemo'

/**
 * Chat — L4 page
 * 只做页面级装配 + 业务串联，所有 UI 来自 src/components/im/* L3 分子件。
 */
export default function Chat({ onChange, contactName, contactAvatar }) {
  const [showKeyboard, setShowKeyboard] = useState(false)

  const displayName   = contactName   || '合川路林志玲'
  const displayAvatar = contactAvatar || CHAT_ASSETS.avatarLeft

  return (
    <div className="cht-page">
      <IMStatusBar />
      <ChatTopBar
        contactName={displayName}
        contactAvatar={displayAvatar}
        onBack={() => onChange?.('messages')}
        onPreview={() => onChange?.('bubblepreview')}
      />
      <section className="cht-flow" aria-label="对话内容">
        <div className="cht-flow__inner">
          {MESSAGES.map((msg) => (
            <MessageRow
              key={msg.id}
              message={msg}
              contactAvatar={displayAvatar}
              myAvatar={CHAT_ASSETS.avatarRight}
            />
          ))}
        </div>
      </section>
      <QuickReplyBar items={QUICK_REPLIES} />
      <InputBar showKeyboard={showKeyboard} onToggleKeyboard={setShowKeyboard} />
      <HomeIndicator />
    </div>
  )
}
