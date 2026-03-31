const tabs = [
  { key: 'feed', label: '首页' },
  { key: 'profile', label: '我' },
  { key: 'capture', label: '拍摄' },
  { key: 'messages', label: '消息' },
  { key: 'detail', label: '详情' },
]

export default function TabBar({ activeScreen, onChange }) {
  return (
    <nav className="tab-bar">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          type="button"
          className={activeScreen === tab.key ? 'active' : ''}
          onClick={() => onChange(tab.key)}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  )
}
