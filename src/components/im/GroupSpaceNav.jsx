import Badge from '../../../Douyin_design_system/ui/components/Badge/Badge'
import Tabs from '../../../Douyin_design_system/ui/components/Tabs/Tabs'
import { Icon } from '../../icons'
import { GROUP_SPACE_SECTIONS } from './groupSpaceData'

function DotBadge() {
  return <Badge dot color="danger" className="gsp-nav__dot" />
}

function buildSummary({ role, dots }) {
  const updatedTargets = []
  if (dots.announcements) updatedTargets.push('群公告')
  if (dots.pins) updatedTargets.push('置顶')
  if (updatedTargets.length) return `${updatedTargets.join('、')}有更新`
  if (role === 'owner') return '群空间已展开，可继续管理内容'
  return '收起后也能从这里快速复访'
}

export default function GroupSpaceNav({
  activeKey,
  dots,
  expanded,
  role,
  variant,
  onSelect,
  onToggleExpanded,
}) {
  const pendingCount = Number(Boolean(dots.announcements)) + Number(Boolean(dots.pins))
  const summary = buildSummary({ role, dots })

  if (variant === 'experiment2' && !expanded) {
    return (
      <section className="gsp-nav gsp-nav--collapsed" aria-label="群空间导航">
        <button className="gsp-nav__collapsed" type="button" onClick={onToggleExpanded}>
          <span className="gsp-nav__collapsed-leading">
            <Icon name="ic_s_s_mygroup" size={20} variant="outlined" />
          </span>
          <span className="gsp-nav__collapsed-copy">
            <span className="gsp-nav__collapsed-title">群空间</span>
            <span className="gsp-nav__collapsed-summary">{summary}</span>
          </span>
          {pendingCount > 0 && <span className="gsp-nav__collapsed-count">{pendingCount}</span>}
          <span className="gsp-nav__collapsed-trailing">
            <Icon name="ic_s_s_arrowdown" size={20} variant="outlined" />
          </span>
        </button>
      </section>
    )
  }

  const tabItems = [
    { key: 'chat', label: GROUP_SPACE_SECTIONS.chat },
    {
      key: 'announcements',
      label: GROUP_SPACE_SECTIONS.announcements,
      badge: dots.announcements ? <DotBadge /> : null,
    },
    {
      key: 'pins',
      label: GROUP_SPACE_SECTIONS.pins,
      badge: dots.pins ? <DotBadge /> : null,
    },
    { key: 'collections', label: GROUP_SPACE_SECTIONS.collections },
  ]

  if (variant === 'experiment2') {
    tabItems.push({ key: 'settings', label: GROUP_SPACE_SECTIONS.settings })
  }

  return (
    <section className="gsp-nav" aria-label="群空间导航">
      <div className="gsp-nav__header">
        <div className="gsp-nav__header-copy">
          <span className="gsp-nav__eyebrow">群空间</span>
          <span className="gsp-nav__summary">{summary}</span>
        </div>
        {variant === 'experiment2' && (
          <button
            className="gsp-nav__collapse-btn"
            type="button"
            aria-label="收起群空间导航"
            onClick={onToggleExpanded}
          >
            <Icon name="ic_s_s_arrowup" size={20} variant="outlined" />
          </button>
        )}
      </div>
      <Tabs
        activeKey={activeKey}
        className="gsp-nav__tabs"
        items={tabItems}
        onChange={onSelect}
        size="sm"
        variant="pill"
      />
    </section>
  )
}
