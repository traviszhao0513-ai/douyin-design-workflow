const messages = [
  { title: '系统通知', preview: '你的设计基座已初始化完成。' },
  { title: '产品经理', preview: '请评估直播入口在 Feed 的露出方式。' },
  { title: '设计评审群', preview: '个人主页 CTA 样式待统一。' },
]

export default function Messages() {
  return (
    <div>
      <section className="section-card">
        <h3 className="section-title">消息与通知</h3>
        <div className="messages-list">
          {messages.map((message) => (
            <div className="message-row" key={message.title}>
              <strong>{message.title}</strong>
              <div className="meta-text">{message.preview}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
