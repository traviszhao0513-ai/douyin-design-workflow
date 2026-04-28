/**
 * QuickReplyBar — L3 IM molecule
 * 输入栏上方的快捷回复 chips 区。
 *
 * Props:
 *   items  — [{ id, emoji, label }]
 *   onPick — (item) => void
 */
export default function QuickReplyBar({ items = [], onPick }) {
  return (
    <div className="cht-acb" aria-label="快捷回复">
      <div className="cht-acb__scroll">
        {items.map((item) => (
          <button
            key={item.id}
            className="cht-acb__chip"
            type="button"
            onClick={() => onPick?.(item)}
          >
            <span className="cht-acb__emoji" aria-hidden="true">
              {typeof item.emoji === 'string' && item.emoji.startsWith('/')
                ? <img src={item.emoji} alt="" />
                : item.emoji}
            </span>
            <span className="cht-acb__label">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
