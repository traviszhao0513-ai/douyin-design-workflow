/**
 * StoryRail — L3 IM molecule
 * 消息页顶部故事头像横滑。
 *
 * Props:
 *   items  — [{ id, name, avatar, ring: 'active' | 'muted' | null, online, add }]
 *   assets — { ringActive, ringMuted, storyAddBg, storyAddIcon, onlineStory }
 *            装饰性图片资源（由 src/data/messagesDemo.js 注入）
 */
import Avatar from '../../../Douyin_design_system/ui/components/Avatar/Avatar'

function StoryItem({ story, assets }) {
  const { name, avatar, ring, online, add } = story
  return (
    <div className="msg-story">
      <button className="msg-story__pressable" type="button" aria-label={name}>
        <div className="msg-story__avatar-shell">
          {ring === 'active' && assets.ringActive && (
            <img className="msg-story__ring" src={assets.ringActive} alt="" aria-hidden="true" />
          )}
          {ring === 'muted' && assets.ringMuted && (
            <img className="msg-story__ring" src={assets.ringMuted} alt="" aria-hidden="true" />
          )}
          <Avatar className="msg-story__avatar" size="xl" src={avatar} alt={name} />
          {online && assets.onlineStory && (
            <img className="msg-story__online-image" src={assets.onlineStory} alt="" aria-hidden="true" />
          )}
          {add && (
            <>
              {assets.storyAddBg && (
                <img className="msg-story__add-bg" src={assets.storyAddBg} alt="" aria-hidden="true" />
              )}
              {assets.storyAddIcon && (
                <img className="msg-story__add-icon" src={assets.storyAddIcon} alt="" aria-hidden="true" />
              )}
            </>
          )}
        </div>
      </button>
      <span className="msg-story__name">{name}</span>
    </div>
  )
}

export default function StoryRail({ items = [], assets = {} }) {
  return (
    <section className="msg-story-rail" aria-label="故事头像">
      {items.map((story) => (
        <StoryItem key={story.id} story={story} assets={assets} />
      ))}
    </section>
  )
}
