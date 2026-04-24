/**
 * StoryRail — L3 IM molecule
 * 消息页顶部故事头像横滑。
 *
 * Props:
 *   items  — [{ id, name, avatar, ring: 'active' | 'muted' | null, online, add }]
 *   assets — {
 *     RingActiveIcon, RingMutedIcon,
 *     StoryAddBgIcon, StoryAddPlusIcon,
 *     OnlineStoryIcon
 *   }  均为 React 组件（SVG via svgr）
 */
import Avatar from '../../../Douyin_design_system/ui/components/Avatar/Avatar'

function StoryItem({ story, assets }) {
  const { name, avatar, ring, online, add } = story
  const {
    RingActiveIcon,
    RingMutedIcon,
    StoryAddBgIcon,
    StoryAddPlusIcon,
    OnlineStoryIcon,
  } = assets

  return (
    <div className="msg-story">
      <button className="msg-story__pressable" type="button" aria-label={name}>
        <div className="msg-story__avatar-shell">
          {ring === 'active' && RingActiveIcon && (
            <RingActiveIcon className="msg-story__ring msg-story__ring--active" aria-hidden="true" />
          )}
          {ring === 'muted' && RingMutedIcon && (
            <RingMutedIcon className="msg-story__ring msg-story__ring--muted" aria-hidden="true" />
          )}
          <Avatar className="msg-story__avatar" size="xl" src={avatar} alt={name} />
          {online && OnlineStoryIcon && (
            <span className="msg-story__online" aria-hidden="true">
              <OnlineStoryIcon className="msg-story__online-image" />
            </span>
          )}
          {add && (
            <span className="msg-story__add" aria-hidden="true">
              {StoryAddBgIcon && (
                <StoryAddBgIcon className="msg-story__add-bg" />
              )}
              {StoryAddPlusIcon && (
                <StoryAddPlusIcon className="msg-story__add-icon" />
              )}
            </span>
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
