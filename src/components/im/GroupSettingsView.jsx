import Button from '../../../Douyin_design_system/ui/components/Button/Button'
import { NAV_EXPERIMENTS } from './groupSpaceData'

function ChoiceGroup({ label, options, value, onChange }) {
  return (
    <div className="gsp-choice-group">
      <span className="gsp-choice-group__label">{label}</span>
      <div className="gsp-choice-group__actions">
        {options.map((option) => (
          <Button
            key={option.value}
            size="sm"
            variant={value === option.value ? 'primary' : 'secondary'}
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </Button>
        ))}
      </div>
    </div>
  )
}

export default function GroupSettingsView({ role, experiment, onRoleChange, onExperimentChange }) {
  return (
    <section className="gsp-panel" aria-label="群设置">
      <div className="gsp-card gsp-panel__hero">
        <span className="gsp-panel__eyebrow">实验配置页</span>
        <h2 className="gsp-panel__title">群设置也进入导航，方便承接 AB 实验</h2>
        <p className="gsp-panel__body">
          这里保留了导航交互 1 / 2 以及角色差异的切换，用来验证默认展开、收起和红点消失逻辑是否符合 PRD。
        </p>
      </div>
      <div className="gsp-panel__stack">
        <div className="gsp-card">
          <ChoiceGroup
            label="导航实验"
            onChange={onExperimentChange}
            options={[
              { value: 'experiment1', label: NAV_EXPERIMENTS.experiment1 },
              { value: 'experiment2', label: NAV_EXPERIMENTS.experiment2 },
            ]}
            value={experiment}
          />
        </div>
        <div className="gsp-card">
          <ChoiceGroup
            label="当前身份"
            onChange={onRoleChange}
            options={[
              { value: 'owner', label: '群主/管理员' },
              { value: 'member', label: '群成员' },
            ]}
            value={role}
          />
        </div>
        <div className="gsp-card gsp-settings-note">
          <span className="gsp-settings-note__title">本轮原型约束</span>
          <p className="gsp-settings-note__body">
            公开群默认进聊天，不支持左右滑切导航；浮条先忽略，优先把公告、置顶、群收藏和设置的复访链路打通。
          </p>
        </div>
      </div>
    </section>
  )
}
