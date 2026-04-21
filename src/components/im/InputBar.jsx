/**
 * InputBar — L3 IM molecule
 * 聊天页底部输入栏：模块 · 输入框 · 语音 · 表情 · 展开。
 *
 * Figma: IM UI Kit 2.0 · Input Bar
 */
import { useRef } from 'react'
import IcModule  from '../../icons/chat/ic_im_module.svg?react'
import IcVoice   from '../../icons/chat/ic_im_voice.svg?react'
import IcSticker from '../../icons/chat/ic_im_sticker.svg?react'
import IcPlus    from '../../icons/chat/ic_im_plus.svg?react'

export default function InputBar({ showKeyboard, onToggleKeyboard }) {
  const inputRef = useRef(null)

  const handleFieldClick = () => {
    onToggleKeyboard(true)
    setTimeout(() => inputRef.current?.focus(), 50)
  }

  return (
    <div className="cht-input-bar">
      <div className="cht-input-bar__row">
        <button className="cht-input-bar__icon-btn" type="button" aria-label="更多功能"><IcModule width={24} height={24} /></button>
        <div className="cht-input-bar__field" onClick={handleFieldClick}>
          {!showKeyboard && <span className="cht-input-bar__placeholder">发消息</span>}
          <input
            ref={inputRef}
            className="cht-input-bar__input"
            type="text"
            enterKeyHint="send"
            onBlur={() => onToggleKeyboard(false)}
          />
        </div>
        <div className="cht-input-bar__actions">
          <button className="cht-input-bar__icon-btn" type="button" aria-label="语音消息"><IcVoice width={24} height={24} /></button>
          <button className="cht-input-bar__icon-btn" type="button" aria-label="表情"><IcSticker width={24} height={24} /></button>
          <button className="cht-input-bar__icon-btn" type="button" aria-label="展开"><IcPlus width={24} height={24} /></button>
        </div>
      </div>
    </div>
  )
}
