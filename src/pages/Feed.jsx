export default function Feed() {
  return (
    <div>
      <section className="feed-hero">
        <div className="feed-overlay">
          <h2>推荐流核心基座</h2>
          <p className="helper-text">用于承载 Feed、互动栏、信息层级与主导航关系。</p>
        </div>
        <div className="feed-side-rail">
          <div className="rail-pill">赞</div>
          <div className="rail-pill">评</div>
          <div className="rail-pill">享</div>
        </div>
      </section>

      <section className="section-card" style={{ marginTop: 16 }}>
        <h3 className="section-title">页面职责</h3>
        <div className="metric-grid">
          <div className="metric-tile">
            <strong>全屏视频</strong>
            <span>沉浸式观看与手势切换</span>
          </div>
          <div className="metric-tile">
            <strong>右侧互动栏</strong>
            <span>点赞、评论、分享、收藏</span>
          </div>
          <div className="metric-tile">
            <strong>信息浮层</strong>
            <span>作者、文案、音乐信息</span>
          </div>
          <div className="metric-tile">
            <strong>直播/活动入口</strong>
            <span>后续需求分支做增量实验</span>
          </div>
        </div>
      </section>
    </div>
  )
}
