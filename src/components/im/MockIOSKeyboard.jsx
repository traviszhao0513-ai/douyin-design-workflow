const KEY_ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'delete'],
]

function Key({ className = '', label, wide = false }) {
  return (
    <button
      className={`cht-kbd__key${wide ? ' cht-kbd__key--wide' : ''}${className ? ` ${className}` : ''}`}
      type="button"
      onPointerDown={(event) => event.preventDefault()}
    >
      {label}
    </button>
  )
}

function renderLabel(key) {
  if (key === 'shift') return '⇧'
  if (key === 'delete') return '⌫'
  return key
}

export default function MockIOSKeyboard() {
  return (
    <div className="cht-kbd" aria-hidden="true">
      <div className="cht-kbd__panel">
        {KEY_ROWS.map((row, index) => (
          <div key={index} className={`cht-kbd__row cht-kbd__row--${index + 1}`}>
            {row.map((key) => (
              <Key
                key={key}
                className={key === 'shift' ? 'cht-kbd__key--muted' : ''}
                label={renderLabel(key)}
                wide={key === 'shift' || key === 'delete'}
              />
            ))}
          </div>
        ))}

        <div className="cht-kbd__row cht-kbd__row--bottom">
          <button className="cht-kbd__key cht-kbd__key--muted cht-kbd__key--bottom" type="button" onPointerDown={(event) => event.preventDefault()}>
            123
          </button>
          <button className="cht-kbd__key cht-kbd__key--emoji cht-kbd__key--bottom" type="button" onPointerDown={(event) => event.preventDefault()}>
            😊
          </button>
          <button className="cht-kbd__key cht-kbd__key--space" type="button" onPointerDown={(event) => event.preventDefault()}>
            space
          </button>
          <button className="cht-kbd__key cht-kbd__key--bottom" type="button" onPointerDown={(event) => event.preventDefault()}>
            发送
          </button>
        </div>
      </div>
    </div>
  )
}
