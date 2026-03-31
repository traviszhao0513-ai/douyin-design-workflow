const comments = [
  '评论抽屉用于承载讨论、表情和回复结构。',
  '这里的布局用于后续实验不同的评论排序与交互方式。',
  '需求分支可以只改这里，不必重建整页。',
]

export default function VideoDetail() {
  return (
    <div>
      <section className="video-surface">
        <div className="video-overlay">
          <h2>视频详情</h2>
          <p className="helper-text">全屏播放区 + 评论抽屉，是互动链路的核心承接页。</p>
        </div>
        <div className="video-side-rail">
          <div className="rail-pill">赞</div>
          <div className="rail-pill">藏</div>
          <div className="rail-pill">转</div>
        </div>
      </section>

      <section className="section-card comment-drawer">
        <h3 className="section-title">评论抽屉基座</h3>
        <div className="comment-list">
          {comments.map((comment) => (
            <div className="comment-item" key={comment}>{comment}</div>
          ))}
        </div>
      </section>
    </div>
  )
}
