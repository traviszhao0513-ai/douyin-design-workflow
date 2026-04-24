import './Messages.css'
import IMStatusBar        from '../components/im/IMStatusBar'
import MessagesTopBar     from '../components/im/MessagesTopBar'
import StoryRail          from '../components/im/StoryRail'
import ConversationRow    from '../components/im/ConversationRow'
import MessagesBottomBar  from '../components/im/MessagesBottomBar'
import { DECORATIVE_ASSETS, STORIES, CONVERSATIONS } from '../data/messagesDemo'

/**
 * Messages — L4 page
 * 只做页面级装配，所有 UI 来自 src/components/im/* L3 分子件。
 */
export default function Messages({ onChange }) {
  return (
    <div className="msg-page">
      <IMStatusBar />
      <MessagesTopBar
        icons={{
          menu:   DECORATIVE_ASSETS.MenuIcon,
          search: DECORATIVE_ASSETS.SearchIcon,
          add:    DECORATIVE_ASSETS.AddIcon,
        }}
      />
      <div className="msg-scroll">
        <StoryRail items={STORIES} assets={DECORATIVE_ASSETS} />
        <section className="msg-list" aria-label="会话列表">
          {CONVERSATIONS.map((item) => (
            <ConversationRow
              key={item.id}
              {...item}
              onTap={() => onChange?.('chat', { contactName: item.name, contactAvatar: item.avatar, streak: item.streak })}
            />
          ))}
        </section>
      </div>
      <MessagesBottomBar
        unreadCount={6}
        CaptureIcon={DECORATIVE_ASSETS.CaptureTabIcon}
        onChange={onChange}
      />
    </div>
  )
}
