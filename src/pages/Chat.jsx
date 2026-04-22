import { useEffect, useMemo, useRef, useState } from 'react'
import './Chat.css'
import ChatMessageRow from '../components/im/ChatMessageRow'
import ChatTopBar from '../components/im/ChatTopBar'
import InputBar from '../components/im/InputBar'
import MockIOSKeyboard from '../components/im/MockIOSKeyboard'
import { buildReplyPreview } from '../components/im/replyMeta'
import IcDouyin from '../icons/svg/ic_s_s_douyin_16_filled.svg?react'
import IcShop from '../icons/svg/ic_s_s_shop_16_filled.svg?react'

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
  { id: 1, kind: 'time', text: '周一 下午 3:40' },
  { id: 2, kind: 'text', dir: 'recv', text: '这个视频好好笑，笑死我了' },
  { id: 3, kind: 'text', dir: 'sent', text: '哈哈哈，果断关注了' },
  { id: 4, kind: 'link', dir: 'recv', segments: [
    { type: 'text', text: '你看看这个：' },
    { type: 'link', text: 'https://www.douyin.com' },
  ] },
  { id: 5, kind: 'mention', dir: 'recv', segments: [
    { type: 'mention', text: '@所有人' },
    { type: 'text', text: ' 欢迎加入本群！' },
  ] },
  { id: 6, kind: 'voice', dir: 'recv', duration: "9''", waveform: [3, 5, 8, 13, 10, 6, 9, 4, 7, 11, 8, 5] },
  { id: 7, kind: 'voice', dir: 'sent', duration: "23''", waveform: [5, 9, 14, 8, 12, 6, 10, 15, 7, 9, 5, 11] },
  { id: 8, kind: 'time', text: '下午 4:10' },
  { id: 9, kind: 'quote', dir: 'recv', quote: { sender: '合川路林志玲', text: '这个视频好好笑，笑死我了' }, text: '是的，太好笑了！' },
  { id: 10, kind: 'quote', dir: 'sent', quote: { sender: '合川路林志玲', text: '你看看这个：https://www.douyin.com' }, text: '好的，我去看看' },
  { id: 11, kind: 'image', dir: 'recv', src: 'https://picsum.photos/seed/dy1/200/260', width: 168, height: 224 },
  { id: 12, kind: 'image', dir: 'sent', src: 'https://picsum.photos/seed/dy2/260/200', width: 218, height: 168 },
  { id: 13, kind: 'call', dir: 'recv', callType: 'video', status: '已拒绝', sub: '点击回拨' },
  { id: 14, kind: 'call', dir: 'sent', callType: 'video', status: '视频通话', sub: '时长 12:45' },
  { id: 15, kind: 'call', dir: 'recv', callType: 'audio', status: '未接通', sub: '点击回拨' },
  { id: 16, kind: 'system', text: '你们已成为抖音好友，可以开始聊天了' },
  { id: 17, kind: 'text', dir: 'sent', text: '刚到，马上。顺便帮我带杯咖啡吧，最近有点困' },
  { id: 18, kind: 'text', dir: 'recv', text: '好的，拿铁还是美式？' },
  { id: 19, kind: 'text', dir: 'sent', text: '美式，谢了' },
  { id: 20, kind: 'time', text: '下午 4:30' },
  { id: 21, kind: 'card_link', dir: 'recv', card: {
    thumb: '/assets/cards/card_topic.png',
    title: '这个视频也太好笑了😂 周末去哪玩 #日常生活',
    subtitle: '抖音短视频',
    brand: { icon: IcDouyin, name: '抖音' },
  } },
  { id: 22, kind: 'card_link', dir: 'sent', card: {
    thumb: '/assets/cards/card_pet.png',
    title: '夏季新款休闲短裤男宽松运动裤纯棉薄款',
    subtitle: '¥ 89.00',
    brand: { icon: IcShop, name: '抖音小店' },
  } },
  { id: 23, kind: 'card_link', dir: 'recv', card: {
    thumb: '/assets/cards/card_news.png',
    title: '北京今晚有雨，记得带伞',
    subtitle: '来自：今日头条',
  } },
  { id: 24, kind: 'time', text: '下午 5:00' },
  { id: 25, kind: 'card_link', dir: 'recv', card: {
    thumb: '/assets/cards/card_music_play.png',
    title: '任我行',
    subtitle: '陈奕迅',
    brand: { icon: '/assets/card_icon_music.png', name: '汽水音乐' },
    action: { type: 'play' },
  } },
  { id: 26, kind: 'card_link', dir: 'sent', card: {
    thumb: '/assets/cards/card_music_pause.png',
    title: '任我行',
    subtitle: '陈奕迅',
    brand: { icon: '/assets/card_icon_music.png', name: '汽水音乐' },
    action: { type: 'pause' },
  } },
  { id: 27, kind: 'card_link', dir: 'recv', card: {
    thumb: '/assets/cards/card_effect.png',
    title: '落日黄昏',
    subtitle: '8.7 万次使用',
    brand: { icon: '/assets/card_icon_effect.png', name: '特效' },
    action: { type: 'camera' },
  } },
  { id: 28, kind: 'card_link', dir: 'recv', card: {
    thumb: '/assets/cards/card_xlink.png',
    title: 'Clawdbot 教程01 模型推理和思维链',
    subtitle: 'https://x.com/op7418/status/1234567890',
    brand: { icon: '/assets/card_icon_link.png', name: '网页链接' },
  } },
  { id: 29, kind: 'v2', type: 'sticker', dir: 'recv', data: { src: 'https://picsum.photos/seed/sticker1/264/264' } },
  { id: 30, kind: 'v2', type: 'video', dir: 'sent', format: 'sq', data: { src: 'https://picsum.photos/seed/v1/300/300', duration: '00:12' } },
  { id: 31, kind: 'v2', type: 'viewonce', dir: 'recv', data: {} },
  { id: 32, kind: 'v2', type: 'status', data: { text: '你撤回了一条消息' } },
  { id: 33, kind: 'v2', type: 'announcement', dir: 'recv', data: {
    title: '【周会通知】',
    body: '本周三下午 3 点在 3 楼会议室召开例会，请各位同学准时参加。',
  } },
  { id: 35, kind: 'v2', type: 'read', dir: 'sent', format: 'read_text', data: { count: 3 } },
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
  const displayName = contactName || '合川路林志玲'
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
