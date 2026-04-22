import Divider from '../../../Douyin_design_system/ui/components/Divider/Divider'

function AnnouncementCard({ item }) {
  return (
    <article className="gsp-card gsp-announcement-card">
      <div className="gsp-announcement-card__meta">
        <span className="gsp-announcement-card__category">{item.category}</span>
        <span className="gsp-announcement-card__time">{item.publishedAt}</span>
      </div>
      <h2 className="gsp-announcement-card__title">{item.title}</h2>
      <p className="gsp-announcement-card__summary">{item.summary}</p>
      <div className="gsp-announcement-card__footer">
        <span>{item.publisher}</span>
        <span>{item.emphasis}</span>
      </div>
    </article>
  )
}

export default function GroupAnnouncementsView({ announcements }) {
  return (
    <section className="gsp-panel" aria-label="群公告内容">
      <div className="gsp-card gsp-panel__hero">
        <span className="gsp-panel__eyebrow">高价值内容容器</span>
        <h2 className="gsp-panel__title">群公告从聊天浮条升级为可复访页面</h2>
        <p className="gsp-panel__body">
          每次进入公开群先落到聊天，但群公告会保留独立入口，支持用户回看最新规则、内容更新和历史沉淀。
        </p>
      </div>
      <Divider className="gsp-panel__divider" label="公告列表" spacing="none" />
      <div className="gsp-panel__stack">
        {announcements.map((item) => (
          <AnnouncementCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  )
}
