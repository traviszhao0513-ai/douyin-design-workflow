/**
 * InputBar — L3 IM molecule
 * 聊天页底部输入栏：模块 · 输入框 · 语音 · 表情 · 展开。
 *
 * Figma: IM UI Kit 2.0 · Input Bar
 */
import { forwardRef, useImperativeHandle, useRef } from 'react'
import IcModule  from '../../icons/chat/ic_im_module.svg?react'
import IcVoice   from '../../icons/chat/ic_im_voice.svg?react'
import IcSticker from '../../icons/chat/ic_im_sticker.svg?react'
import IcPlus    from '../../icons/chat/ic_im_plus.svg?react'

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function ReplyPreview({ onClearReply, replyingTo }) {
  if (!replyingTo) return null

  return (
    <div className="cht-input-bar__reply" key={replyingTo.id}>
      <div className="cht-input-bar__reply-copy">
        <span className="cht-input-bar__reply-eyebrow">回复 {replyingTo.author}</span>
        <p className="cht-input-bar__reply-text">{replyingTo.summary}</p>
      </div>
      <button
        className="cht-input-bar__reply-close"
        type="button"
        aria-label="取消引用回复"
        onPointerDown={(event) => event.preventDefault()}
        onClick={onClearReply}
      >
        <CloseIcon />
      </button>
    </div>
  )
}

const InputBar = forwardRef(function InputBar({ onClearReply, replyingTo, showKeyboard, onToggleKeyboard }, ref) {
  const inputRef = useRef(null)

  const focusComposer = () => {
    onToggleKeyboard(true)
    inputRef.current?.focus({ preventScroll: true })
  }

  useImperativeHandle(ref, () => ({
    focusComposer,
  }), [onToggleKeyboard])

  return (
    <div className={`cht-input-bar${replyingTo ? ' cht-input-bar--replying' : ''}`}>
      <div className="cht-input-bar__composer">
        <div className={`cht-input-bar__reply-shell${replyingTo ? ' is-visible' : ''}`}>
          <ReplyPreview replyingTo={replyingTo} onClearReply={onClearReply} />
        </div>
        <div className="cht-input-bar__row">
          <button className="cht-input-bar__icon-btn" type="button" aria-label="更多功能"><IcModule width={24} height={24} /></button>
          <div className="cht-input-bar__field" onClick={focusComposer}>
            {!showKeyboard && <span className="cht-input-bar__placeholder">{replyingTo ? '回复消息' : '发消息'}</span>}
            <input
              ref={inputRef}
              className="cht-input-bar__input"
              type="text"
              enterKeyHint="send"
              onFocus={() => onToggleKeyboard(true)}
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
    </div>
  )
})

export default InputBar
