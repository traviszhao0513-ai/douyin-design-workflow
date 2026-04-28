/**
 * Chat 页示例数据 — demo only
 * 从 src/pages/Chat.jsx 抽出，页面只负责装配。
 */

/* ── Avatar URLs ──
 * 主态（avatarRight）固定用本地 mine.png，保证在任何会话里"我"都是同一张脸。
 * 对方头像（avatarLeft）仍然走会话上下文传进来的 contactAvatar；
 * 这里的 avatarLeft 只在未提供时作为 fallback。 */
export const CHAT_ASSETS = {
  avatarLeft:  'https://i.pravatar.cc/100?u=leftavatar',
  avatarRight: '/assets/avatars/mine.png',
}

/* ── Quick reply chips — emoji strings ── */
export const QUICK_REPLIES = [
  { id: 'poke',   emoji: '/assets/IMCard/emoji_chuo.png',     label: '戳一戳' },
  { id: 'heart',  emoji: '/assets/IMCard/emoji_xin.png',      label: '比个心' },
  { id: 'laugh',  emoji: '/assets/IMCard/emoji_dazhaohu.png', label: '在干嘛' },
  { id: 'happy',  emoji: '/assets/IMCard/emoji_kaixin.png',   label: '很开心' },
  { id: 'poke2',  emoji: '/assets/IMCard/emoji_dazhaohu.png', label: '好开心' },
  { id: 'happy2', emoji: '/assets/IMCard/emoji_bianbian.png', label: '转便便' },
]

/* ══════════════════════════════════════════════════════════
   Demo message data — covers every bubble variant
   ══════════════════════════════════════════════════════════ */
export const MESSAGES = [
  // ── Timestamp divider
  { id: 1,  kind: 'time',    text: '周一 下午 3:40' },

  // ── Plain text
  { id: 2,  kind: 'text',    dir: 'recv', text: '这个视频好好笑，笑死我了' },
  { id: 3,  kind: 'text',    dir: 'sent', text: '哈哈哈，果断关注了' },

  // ── Link text
  { id: 4,  kind: 'link',    dir: 'recv',
    segments: [
      { type: 'text', text: '你看看这个：' },
      { type: 'link', text: 'https://www.douyin.com' },
    ]
  },

  // ── Mention
  { id: 5,  kind: 'mention', dir: 'recv',
    segments: [
      { type: 'mention', text: '@所有人' },
      { type: 'text', text: ' 欢迎加入本群！' },
    ]
  },

  // ── Voice message (received)
  { id: 6,  kind: 'voice',   dir: 'recv', duration: "9''", waveform: [3,5,8,13,10,6,9,4,7,11,8,5] },

  // ── Voice message (sent)
  { id: 7,  kind: 'voice',   dir: 'sent', duration: "23''", waveform: [5,9,14,8,12,6,10,15,7,9,5,11] },

  // ── Timestamp divider
  { id: 8,  kind: 'time',    text: '下午 4:10' },

  // ── Quote / reply (received)
  { id: 9,  kind: 'quote',   dir: 'recv',
    quote: { sender: '合川路林志玲', text: '这个视频好好笑，笑死我了' },
    text: '是的，太好笑了！',
  },

  // ── Quote / reply (sent)
  { id: 10, kind: 'quote',   dir: 'sent',
    quote: { sender: '合川路林志玲', text: '你看看这个：https://www.douyin.com' },
    text: '好的，我去看看',
  },

  // ── Image (received)
  { id: 11, kind: 'image',   dir: 'recv',
    src: 'https://picsum.photos/seed/dy1/200/260',
    width: 168, height: 224,
  },

  // ── Image (sent)
  { id: 12, kind: 'image',   dir: 'sent',
    src: 'https://picsum.photos/seed/dy2/260/200',
    width: 218, height: 168,
  },

  // ── Video call record
  { id: 13, kind: 'call',    dir: 'recv', callType: 'video', status: '已拒绝',  sub: '点击回拨' },
  { id: 14, kind: 'call',    dir: 'sent', callType: 'video', status: '视频通话', sub: '时长 12:45' },

  // ── Voice call record
  { id: 15, kind: 'call',    dir: 'recv', callType: 'audio', status: '未接通',  sub: '点击回拨' },

  // ── System message
  { id: 16, kind: 'system',  text: '你们已成为抖音好友，可以开始聊天了' },

  // ── Long multi-line text
  { id: 17, kind: 'text',    dir: 'sent', text: '刚到，马上。顺便帮我带杯咖啡吧，最近有点困' },
  { id: 18, kind: 'text',    dir: 'recv', text: '好的，拿铁还是美式？' },
  { id: 19, kind: 'text',    dir: 'sent', text: '美式，谢了' },

  // ── Timestamp divider
  { id: 20, kind: 'time',    text: '下午 4:30' },

  // ── Link card — shared video (received)
  { id: 21, kind: 'card_link', dir: 'recv',
    card: {
      thumb: '/assets/cards/card_topic.png',
      title: '这个视频也太好笑了😂 周末去哪玩 #日常生活',
      subtitle: '抖音短视频',
      brand: { icon: '/assets/card_icon_topic.png', name: '抖音' },
    }
  },

  // ── Link card — shared product (sent)
  { id: 22, kind: 'card_link', dir: 'sent',
    card: {
      thumb: '/assets/cards/card_pet.png',
      title: '夏季新款休闲短裤男宽松运动裤纯棉薄款',
      subtitle: '¥ 89.00',
      brand: { icon: '/assets/card_icon_pet.png', name: '抖音小店' },
    }
  },

  // ── Link card — news / 今日头条 (received)
  { id: 23, kind: 'card_link', dir: 'recv',
    card: {
      thumb: '/assets/cards/card_news.png',
      title: '北京今晚有雨，记得带伞',
      subtitle: '本地天气推送',
      brand: { icon: '/assets/card_icon_hot.png', name: '今日头条' },
    }
  },

  // ── Timestamp divider
  { id: 24, kind: 'time', text: '下午 5:00' },

  // ── Link card — music, play state (received)
  { id: 25, kind: 'card_link', dir: 'recv',
    card: {
      thumb: '/assets/cards/card_music_play.png',
      title: '任我行',
      subtitle: '陈奕迅',
      brand: { icon: '/assets/card_icon_music.png', name: '汽水音乐' },
      action: { type: 'play' },
    }
  },

  // ── Link card — music, pause state (sent)
  { id: 26, kind: 'card_link', dir: 'sent',
    card: {
      thumb: '/assets/cards/card_music_pause.png',
      title: '任我行',
      subtitle: '陈奕迅',
      brand: { icon: '/assets/card_icon_music.png', name: '汽水音乐' },
      action: { type: 'pause' },
    }
  },

  // ── Link card — effect / sticker with camera button (received)
  { id: 27, kind: 'card_link', dir: 'recv',
    card: {
      thumb: '/assets/cards/card_effect.png',
      title: '落日黄昏',
      subtitle: '8.7 万次使用',
      brand: { icon: '/assets/card_icon_effect.png', name: '特效' },
      action: { type: 'camera' },
    }
  },

  // ── Link card — webpage link (received)
  { id: 28, kind: 'card_link', dir: 'recv',
    card: {
      thumb: '/assets/cards/card_xlink.png',
      title: 'Clawdbot 教程01 模型推理和思维链',
      subtitle: 'https://x.com/op7418/status/1234567890',
      brand: { isWebLink: true, name: '网页链接' },
    }
  },

  // ── Extended types — routed via unified <Bubble>
  { id: 29, kind: 'v2', type: 'sticker',  dir: 'recv',
    data: { src: 'https://picsum.photos/seed/sticker1/264/264' } },
  { id: 30, kind: 'v2', type: 'video',    dir: 'sent', format: 'sq',
    data: { src: 'https://picsum.photos/seed/v1/300/300', duration: '00:12' } },
  { id: 31, kind: 'v2', type: 'viewonce', dir: 'recv', data: {} },
  { id: 32, kind: 'v2', type: 'notice',   data: { text: '你撤回了一条消息' } },
  { id: 33, kind: 'v2', type: 'announcement', dir: 'recv', data: {
    title: '【周会通知】', body: '本周三下午 3 点在 3 楼会议室召开例会，请各位同学准时参加。',
  } },
  { id: 35, kind: 'v2', type: 'read', dir: 'sent', format: 'read_text', data: { count: 3 } },
]
