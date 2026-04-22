import { useEffect, useMemo, useRef, useState } from 'react'
import './Chat.css'
import ChatMessageRow from '../components/im/ChatMessageRow'
import ChatTopBar from '../components/im/ChatTopBar'
import InputBar from '../components/im/InputBar'
import MockIOSKeyboard from '../components/im/MockIOSKeyboard'
import { buildReplyPreview } from '../components/im/replyMeta'

const ASSETS = {
  avatarLeft: 'https://i.pravatar.cc/100?u=leftavatar',
  avatarRight: 'https://i.pravatar.cc/100?u=rightavatar',
}

const QUICK_REPLIES = [
  { id: 'poke', emoji: '👋', label: '戳一戳' },
  { id: 'heart', emoji: '❤️', label: '比个心' },
  { id: 'laugh', emoji: '🤔', label: '在干嘛' },
  { id: 'happy', emoji: '😊', label: '很开心' },
  { id: 'poke2', emoji: '🤩', label: '好开心' },
  { id: 'happy2', emoji: '💩', label: '转便便' },
]

const MESSAGES = [
  { id: 1, kind: 'time', text: '周六 上午 9:18' },
  { id: 2, kind: 'text', dir: 'recv', text: '今天真想出去透口气，周末要不要去露营？我刚看到一个离市区不远的营地。' },
  { id: 3, kind: 'text', dir: 'sent', text: '可以啊，我最近也特别想看日落。别太野就行，我第一次在外面过夜。' },
  { id: 4, kind: 'text', dir: 'recv', text: '放心，是轻露营路线。有洗手间、热水和停车位，车程大概一个多小时。' },
  { id: 5, kind: 'text', dir: 'sent', text: '那太友好了。你那边天幕和椅子都有吗？如果缺东西我今天中午去补。' },
  { id: 6, kind: 'text', dir: 'recv', text: '天幕、折叠椅、卡式炉我都有，你带睡袋、厚外套和自己想吃的东西就好。' },
  { id: 7, kind: 'text', dir: 'sent', text: '那我负责吃的。我想带牛排、玉米、口蘑，再买点棉花糖晚上烤。' },
  { id: 8, kind: 'text', dir: 'recv', text: '这个菜单很可以，再带一壶热红茶吧，晚上湖边肯定会有点风。' },
  { id: 9, kind: 'text', dir: 'sent', text: '行，我再加一瓶热红酒料包，真冷的话煮一锅会很有氛围。' },
  { id: 10, kind: 'quote', dir: 'recv', quote: { sender: '你', text: '行，我再加一瓶热红酒料包，真冷的话煮一锅会很有氛围。' }, text: '这个好，我已经开始提前觉得幸福了。' },
  { id: 11, kind: 'text', dir: 'sent', text: '哈哈哈，你负责氛围组，我负责后勤组。对了，驱蚊喷雾是不是也要带？' },
  { id: 12, kind: 'text', dir: 'recv', text: '必须带，湖边蚊子特别积极。还有头灯和备用电池，晚上找东西会方便很多。' },
  { id: 13, kind: 'time', text: '下午 2:06' },
  { id: 14, kind: 'text', dir: 'recv', text: '我刚看了天气，白天 23 度，太阳下山后会掉到 11 度左右。' },
  { id: 15, kind: 'text', dir: 'sent', text: '那我带冲锋衣和厚袜子，再塞一个薄毯在后备箱，宁愿多带一点。' },
  { id: 16, kind: 'text', dir: 'recv', text: '可以，保暖真的比拍照重要。我们三点出发的话，四点半前应该能把营地搭好。' },
  { id: 17, kind: 'text', dir: 'sent', text: '没问题，我两点五十到你楼下。你出门前提醒我一声，我怕我装冰块装到忘记时间。' },
  { id: 18, kind: 'text', dir: 'recv', text: '收到。我顺手把咖啡豆磨了，路上给你做一杯冰手冲，保证你精神满格。' },
  { id: 19, kind: 'time', text: '晚上 8:41' },
  { id: 20, kind: 'text', dir: 'recv', text: '刚把灯串挂好，风吹起来的时候真的很像电影场景，旁边那片湖面也特别安静。' },
  { id: 21, kind: 'text', dir: 'sent', text: '我这边把玉米翻面了，已经开始有点焦香。你回头看看，天边那层粉橘色还没完全退掉。' },
  { id: 22, kind: 'quote', dir: 'recv', quote: { sender: '你', text: '我这边把玉米翻面了，已经开始有点焦香。你回头看看，天边那层粉橘色还没完全退掉。' }, text: '看到了，真的好漂亮。等会儿牛排下锅的时候你记得叫我，我想录一小段火声。' },
  { id: 23, kind: 'text', dir: 'sent', text: '行，先把这锅热红酒煮上。今天这趟来得太值了，感觉最近的累都被风吹走了一点。' },
  { id: 24, kind: 'text', dir: 'recv', text: '明早我们去栈道那边看日出吧，我设 5:20 的闹钟。你要是赖床，我就拿咖啡把你香醒。' },
  { id: 25, kind: 'text', dir: 'sent', text: '成交。但如果我真的起不来，你就说棉花糖还剩最后三颗，我应该会立刻坐起来。' },
]

function ChatStatusBar() {
  return (
    <div className="cht-status-bar" aria-hidden="true">
      <span className="cht-status-bar__time">9:41</span>
      <div className="cht-status-bar__icons">
        <svg width="17" height="11" viewBox="0 0 17 11" fill="currentColor">
          <rect x="0" y="7" width="3.5" height="4" rx="0.7" />
          <rect x="4.5" y="4.5" width="3.5" height="6.5" rx="0.7" />
          <rect x="9" y="2" width="3.5" height="9" rx="0.7" />
          <rect x="13.5" y="0" width="3.5" height="11" rx="0.7" opacity="0.3" />
        </svg>
        <svg width="16" height="11" viewBox="0 0 16 11" fill="currentColor">
          <circle cx="8" cy="9.5" r="1.5" />
          <path d="M4.8 6.8a4.5 4.5 0 0 1 6.4 0l1.1-1.1a6.1 6.1 0 0 0-8.6 0l1.1 1.1z" />
          <path d="M1.9 3.9a8.6 8.6 0 0 1 12.2 0L15.2 2.8A10.2 10.2 0 0 0 .8 2.8l1.1 1.1z" />
        </svg>
        <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
          <rect x="0.5" y="0.5" width="21" height="11" rx="2.5" stroke="currentColor" strokeWidth="1" />
          <rect x="22" y="3.5" width="2" height="5" rx="1" fill="currentColor" />
          <rect x="2" y="2" width="16" height="8" rx="1.5" fill="currentColor" />
        </svg>
      </div>
    </div>
  )
}

function ConversationFlow({ contactAvatar, myAvatar, onReply }) {
  return (
    <section className="cht-flow" aria-label="对话内容">
      <div className="cht-flow__inner">
        {MESSAGES.map((message) => (
          <ChatMessageRow
            key={message.id}
            contactAvatar={contactAvatar}
            message={message}
            myAvatar={myAvatar}
            onReply={onReply}
          />
        ))}
      </div>
    </section>
  )
}

function QuickReplyChips({ hidden }) {
  return (
    <div className={`cht-acb${hidden ? ' cht-acb--hidden' : ''}`} aria-label="快捷回复">
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

export default function Chat({ onChange, contactName, contactAvatar }) {
  const devParams = useMemo(() => {
    if (!import.meta.env.DEV || typeof window === 'undefined') return null
    return new URLSearchParams(window.location.search)
  }, [])
  const forcedTheme = devParams?.get('theme') === 'dark' ? 'dark' : undefined
  const forcedKeyboard = devParams?.get('keyboard') === '1'
  const forcedReplyId = Number(devParams?.get('reply') || 0)
  const displayName = contactName || '阿雯'
  const displayAvatar = contactAvatar || ASSETS.avatarLeft
  const seededReply = useMemo(() => {
    if (!forcedReplyId) return null

    return buildReplyPreview(
      MESSAGES.find((message) => message.id === forcedReplyId),
      displayName,
    )
  }, [displayName, forcedReplyId])
  const [showKeyboard, setShowKeyboard] = useState(Boolean(seededReply || forcedKeyboard))
  const [replyingTo, setReplyingTo] = useState(seededReply)
  const inputBarRef = useRef(null)

  useEffect(() => {
    setReplyingTo(seededReply)
    setShowKeyboard(Boolean(seededReply || forcedKeyboard))
  }, [displayAvatar, displayName, forcedKeyboard, seededReply])

  const handleReply = (message) => {
    setReplyingTo(buildReplyPreview(message, displayName))
    inputBarRef.current?.focusComposer()
  }

  return (
    <div className="cht-page" data-theme={forcedTheme}>
      <ChatStatusBar />
      <ChatTopBar
        contactName={displayName}
        contactAvatar={displayAvatar}
        onBack={() => onChange?.('messages')}
        onPreview={() => onChange?.('bubblepreview')}
      />
      <ConversationFlow
        contactAvatar={displayAvatar}
        myAvatar={ASSETS.avatarRight}
        onReply={handleReply}
      />
      <QuickReplyChips hidden={Boolean(replyingTo || showKeyboard)} />
      <InputBar
        ref={inputBarRef}
        onClearReply={() => setReplyingTo(null)}
        replyingTo={replyingTo}
        showKeyboard={showKeyboard}
        onToggleKeyboard={setShowKeyboard}
      />
      {showKeyboard ? <MockIOSKeyboard /> : <HomeIndicator />}
    </div>
  )
}
