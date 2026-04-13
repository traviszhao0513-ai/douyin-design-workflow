export default function Capture() {
  return (
    <div>
      <section className="video-surface">
        <div className="video-overlay">
          <h2>拍摄工作台</h2>
          <p className="helper-text">用于串联录制按钮、滤镜、音乐与模板入口。</p>
        </div>
        <div className="video-side-rail">
          <div className="rail-pill">滤镜</div>
          <div className="rail-pill">音乐</div>
          <div className="rail-pill">模板</div>
        </div>
      </section>

      <section className="capture-actions" style={{ marginTop: 16 }}>
        <div className="capture-tile">
          <strong>录制按钮</strong>
          <div className="meta-text">主操作，后续可扩展快拍 / 长拍 / 导入</div>
        </div>
        <div className="capture-tile">
          <strong>创作工具层</strong>
          <div className="meta-text">道具、提词器、比例、倒计时</div>
        </div>
      </section>
    </div>
  )
}
