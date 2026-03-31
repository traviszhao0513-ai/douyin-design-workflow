export default function UserProfile() {
  return (
    <div>
      <section className="profile-header">
        <div className="avatar" />
        <h2>设计系统基座号</h2>
        <p className="helper-text">统一承载头像、数据、CTA 与内容网格结构。</p>
      </section>

      <section className="profile-stats" style={{ gridTemplateColumns: 'repeat(3, 1fr)', marginBottom: 16 }}>
        <div className="stat-tile"><strong>128</strong><span>关注</span></div>
        <div className="stat-tile"><strong>32.4w</strong><span>粉丝</span></div>
        <div className="stat-tile"><strong>210.7w</strong><span>获赞</span></div>
      </section>

      <section className="section-card">
        <h3 className="section-title">内容网格</h3>
        <div className="grid-preview">
          {Array.from({ length: 9 }).map((_, index) => (
            <div key={index} />
          ))}
        </div>
      </section>
    </div>
  )
}
