const FALLBACK_SUMMARY = '[消息]'

function normalizeText(value) {
  if (!value) return ''
  return value.replace(/\s+/g, ' ').trim()
}

function summarizeSegments(segments = []) {
  return normalizeText(segments.map((segment) => segment.text || '').join(''))
}

function summarizeCard(card = {}) {
  return normalizeText(card.title || card.subtitle || '')
}

function summarizeLegacyMessage(message) {
  switch (message.kind) {
    case 'text':
    case 'quote':
      return normalizeText(message.text)
    case 'link':
    case 'mention':
      return summarizeSegments(message.segments)
    case 'voice':
      return normalizeText(`[语音] ${message.duration || ''}`)
    case 'image':
      return '[图片]'
    case 'call':
      return message.callType === 'video' ? '[视频通话]' : '[语音通话]'
    case 'card_link':
      return summarizeCard(message.card) || '[链接卡片]'
    default:
      return ''
  }
}

function summarizeV2Message(message) {
  const data = message.data || {}

  switch (message.type) {
    case 'text':
    case 'quote':
    case 'announcement':
    case 'commentshare':
      return normalizeText(data.text || data.body || data.title)
    case 'link':
    case 'mention':
      return summarizeSegments(data.segments)
    case 'voice':
      return normalizeText(`[语音] ${data.duration || ''}`)
    case 'image':
      return '[图片]'
    case 'video':
      return '[视频]'
    case 'sticker':
      return '[表情包]'
    case 'viewonce':
      return '[仅看一次]'
    case 'audiocall':
      return '[语音通话]'
    case 'videocall':
      return '[视频通话]'
    case 'linkcard':
    case 'card_link':
      return summarizeCard(data.card || data) || '[链接卡片]'
    default:
      return ''
  }
}

function summarizeMessage(message) {
  if (!message) return ''
  if (message.kind === 'v2') return summarizeV2Message(message)
  return summarizeLegacyMessage(message)
}

export function buildReplyPreview(message, contactName) {
  const author = message?.dir === 'sent' ? '你' : (contactName || '对方')
  const summary = summarizeMessage(message) || FALLBACK_SUMMARY

  return {
    author,
    id: message?.id,
    summary,
  }
}
