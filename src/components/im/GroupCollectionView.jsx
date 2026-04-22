import { useMemo, useState } from 'react'
import Button from '../../../Douyin_design_system/ui/components/Button/Button'
import Divider from '../../../Douyin_design_system/ui/components/Divider/Divider'
import Tabs from '../../../Douyin_design_system/ui/components/Tabs/Tabs'

function CollectionGridCard({ item }) {
  return (
    <article className="gsp-card gsp-collection-card">
      <div className="gsp-collection-card__media">
        <img className="gsp-collection-card__cover" src={item.cover} alt={item.title} />
        {item.duration && <span className="gsp-collection-card__duration">{item.duration}</span>}
      </div>
      <div className="gsp-collection-card__copy">
        <span className="gsp-collection-card__title">{item.title}</span>
        <span className="gsp-collection-card__meta">
          {item.addedBy} · {item.addedAt}
        </span>
      </div>
    </article>
  )
}

function CollectionFileCard({ item }) {
  return (
    <article className="gsp-card gsp-file-card">
      <div className="gsp-file-card__badge">{item.ext}</div>
      <div className="gsp-file-card__copy">
        <span className="gsp-file-card__title">{item.title}</span>
        <span className="gsp-file-card__meta">
          {item.size} · {item.addedBy} · {item.addedAt}
        </span>
      </div>
    </article>
  )
}

function PickerCard({ item, selected, onToggle }) {
  return (
    <button
      className={`gsp-picker-card${selected ? ' is-selected' : ''}`}
      type="button"
      onClick={() => onToggle(item)}
    >
      {item.kind === 'file' ? (
        <>
          <span className="gsp-picker-card__file-badge">{item.ext}</span>
          <span className="gsp-picker-card__title">{item.title}</span>
          <span className="gsp-picker-card__meta">{item.size}</span>
        </>
      ) : (
        <>
          <img className="gsp-picker-card__cover" src={item.cover} alt={item.title} />
          <span className="gsp-picker-card__title">{item.title}</span>
          <span className="gsp-picker-card__meta">{item.duration || '图片'}</span>
        </>
      )}
    </button>
  )
}

function CollectionComposer({ activeTab, pickerItems, onClose, onSubmit }) {
  const [currentTab, setCurrentTab] = useState(activeTab)
  const [selectedIds, setSelectedIds] = useState([])
  const visibleItems = pickerItems[currentTab]
  const selectedItems = visibleItems.filter((item) => selectedIds.includes(item.id))

  const helperText = useMemo(() => {
    if (!selectedItems.length) return '最多选择 20 个，发送后会自动回到聊天页'
    return `已选择 ${selectedItems.length} 个内容，发送后会同步写入群收藏`
  }, [selectedItems.length])

  const toggleItem = (item) => {
    setSelectedIds((prev) => {
      if (prev.includes(item.id)) return prev.filter((id) => id !== item.id)
      if (prev.length >= 20) return prev
      return [...prev, item.id]
    })
  }

  return (
    <div className="gsp-sheet" role="presentation" onClick={onClose}>
      <div className="gsp-sheet__panel gsp-sheet__panel--composer" role="dialog" aria-label="发送并添加" onClick={(event) => event.stopPropagation()}>
        <span className="gsp-sheet__eyebrow">发送并添加</span>
        <h3 className="gsp-sheet__title">选择要同步到群收藏的内容</h3>
        <p className="gsp-sheet__body">{helperText}</p>
        <Tabs
          activeKey={currentTab}
          className="gsp-sheet__tabs"
          items={[
            { key: 'media', label: '图片与视频' },
            { key: 'files', label: '文件' },
          ]}
          onChange={(next) => {
            setCurrentTab(next)
            setSelectedIds([])
          }}
          size="sm"
          variant="pill"
        />
        <div className="gsp-picker-grid">
          {pickerItems[currentTab].map((item) => (
            <PickerCard
              key={item.id}
              item={item}
              onToggle={toggleItem}
              selected={selectedIds.includes(item.id)}
            />
          ))}
        </div>
        <div className="gsp-sheet__actions">
          <Button block size="lg" variant="primary" disabled={!selectedItems.length} onClick={() => onSubmit(currentTab, selectedItems)}>
            发送并添加
          </Button>
          <Button block size="lg" variant="ghost" onClick={onClose}>
            返回当前页面
          </Button>
        </div>
      </div>
    </div>
  )
}

export default function GroupCollectionView({
  activeFilter,
  mediaItems,
  fileItems,
  pickerItems,
  onFilterChange,
  onSendAndAdd,
}) {
  const [composerOpen, setComposerOpen] = useState(false)
  const cards = activeFilter === 'media' ? mediaItems : fileItems

  return (
    <section className="gsp-panel" aria-label="群收藏内容">
      <div className="gsp-card gsp-panel__hero">
        <span className="gsp-panel__eyebrow">群收藏二级页</span>
        <h2 className="gsp-panel__title">把高价值内容从深入口拉到群空间里</h2>
        <p className="gsp-panel__body">
          发送并添加会复用原有发消息路径，但把图片、视频和文件一并写入群收藏，减少成员二次回找成本。
        </p>
      </div>
      <div className="gsp-collection-toolbar">
        <Tabs
          activeKey={activeFilter}
          className="gsp-collection-toolbar__tabs"
          items={[
            { key: 'media', label: '图片与视频' },
            { key: 'files', label: '文件' },
          ]}
          onChange={onFilterChange}
          size="sm"
          variant="pill"
        />
        <Button size="md" variant="primary" onClick={() => setComposerOpen(true)}>
          发送并添加
        </Button>
      </div>
      <Divider className="gsp-panel__divider" label="内容列表" spacing="none" />
      {activeFilter === 'media' ? (
        <div className="gsp-collection-grid">
          {cards.map((item) => (
            <CollectionGridCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="gsp-panel__stack">
          {cards.map((item) => (
            <CollectionFileCard key={item.id} item={item} />
          ))}
        </div>
      )}
      <div className="gsp-card gsp-collection-note">
        <span className="gsp-collection-note__title">可见性修复已纳入原型</span>
        <p className="gsp-collection-note__body">
          非全员可见消息也允许添加到群收藏；消费侧会按当前用户的可见性过滤，因此不同成员看到的收藏内容可能不同。
        </p>
      </div>
      {composerOpen && (
        <CollectionComposer
          activeTab={activeFilter}
          onClose={() => setComposerOpen(false)}
          onSubmit={(kind, items) => {
            onSendAndAdd(kind, items)
            setComposerOpen(false)
          }}
          pickerItems={pickerItems}
        />
      )}
    </section>
  )
}
