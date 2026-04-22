export const GROUP_SPACE_SECTIONS = {
  chat: '聊天',
  announcements: '群公告',
  pins: '置顶',
  collections: '群收藏',
  settings: '群设置',
}

export const NAV_EXPERIMENTS = {
  experiment1: '导航交互 1',
  experiment2: '导航交互 2',
}

export const GROUP_ANNOUNCEMENTS = [
  {
    id: 'ann-0422',
    title: '本周资源目录已更新',
    summary: '新增直播切片、飞书资料索引和公开课回放，今晚 20:00 后统一开放复访。',
    publisher: '群主·洛桑',
    publishedAt: '今天 19:40',
    category: '最新公告',
    emphasis: '高价值内容会优先进入群空间，聊天流不再承担长期复访入口。',
  },
  {
    id: 'ann-0419',
    title: '群内资料命名规范',
    summary: '图片与视频按主题归档，文件统一带日期前缀，方便后续检索与收藏。',
    publisher: '管理员·阿芙',
    publishedAt: '04-19 09:30',
    category: '历史公告',
    emphasis: '未来会支持更多历史公告，这轮原型先把入口和复访链路做完整。',
  },
]

export const GROUP_PINNED_ITEMS = [
  {
    id: 'pin-1',
    messageId: 'grp-msg-2',
    senderName: '群主·洛桑',
    senderAvatar: 'https://i.pravatar.cc/100?u=group-owner',
    pinnedBy: '管理员·阿芙',
    addedAt: '今天 19:42',
    typeLabel: '直播资料',
    excerpt: '上周直播切片、口播脚本和飞书资料目录都整理好了，群收藏里可直接复访。',
    visibility: '全员可见',
  },
  {
    id: 'pin-2',
    messageId: 'grp-msg-5',
    senderName: '内容整理员·Mia',
    senderAvatar: 'https://i.pravatar.cc/100?u=group-mia',
    pinnedBy: '群主·洛桑',
    addedAt: '今天 18:20',
    typeLabel: '课程通知',
    excerpt: '本周公开课录播会在周五补到群收藏，资料链接会跟着一起更新。',
    visibility: '部分成员可见',
  },
  {
    id: 'pin-3',
    messageId: 'grp-msg-7',
    senderName: '资料官·Neil',
    senderAvatar: 'https://i.pravatar.cc/100?u=group-neil',
    pinnedBy: '管理员·阿芙',
    addedAt: '昨天 22:06',
    typeLabel: '群规说明',
    excerpt: '允许把部分可见消息加入群收藏，消费侧会按每位成员自己的可见性做过滤。',
    visibility: '自见消息可收藏',
  },
]

export const GROUP_COLLECTION_MEDIA = [
  {
    id: 'media-1',
    kind: 'image',
    title: '直播切片封面',
    cover: 'https://picsum.photos/seed/groupspace-1/480/640',
    addedBy: '群主·洛桑',
    addedAt: '今天 20:03',
  },
  {
    id: 'media-2',
    kind: 'video',
    title: '公开课回放',
    cover: 'https://picsum.photos/seed/groupspace-2/480/640',
    addedBy: '管理员·阿芙',
    addedAt: '今天 19:58',
    duration: '12:40',
  },
  {
    id: 'media-3',
    kind: 'image',
    title: '分镜模板',
    cover: 'https://picsum.photos/seed/groupspace-3/480/640',
    addedBy: '内容整理员·Mia',
    addedAt: '今天 17:16',
  },
  {
    id: 'media-4',
    kind: 'image',
    title: '评论区选题池',
    cover: 'https://picsum.photos/seed/groupspace-4/480/640',
    addedBy: '资料官·Neil',
    addedAt: '昨天 22:10',
  },
]

export const GROUP_COLLECTION_FILES = [
  {
    id: 'file-1',
    kind: 'file',
    title: '4月公开群资料总表.pdf',
    ext: 'PDF',
    size: '18.2 MB',
    addedBy: '群主·洛桑',
    addedAt: '今天 20:05',
  },
  {
    id: 'file-2',
    kind: 'file',
    title: '直播脚本拆解.docx',
    ext: 'DOCX',
    size: '2.4 MB',
    addedBy: '管理员·阿芙',
    addedAt: '今天 19:41',
  },
  {
    id: 'file-3',
    kind: 'file',
    title: '剪辑模板.zip',
    ext: 'ZIP',
    size: '26.8 MB',
    addedBy: '资料官·Neil',
    addedAt: '昨天 21:08',
  },
]

export const GROUP_COLLECTION_PICKER = {
  media: [
    {
      id: 'picker-media-1',
      kind: 'image',
      title: '直播切片封面',
      cover: 'https://picsum.photos/seed/picker-1/480/640',
    },
    {
      id: 'picker-media-2',
      kind: 'image',
      title: '公开群海报',
      cover: 'https://picsum.photos/seed/picker-2/480/640',
    },
    {
      id: 'picker-media-3',
      kind: 'video',
      title: '公开视频 01',
      cover: 'https://picsum.photos/seed/picker-3/480/640',
      duration: '00:34',
    },
    {
      id: 'picker-media-4',
      kind: 'image',
      title: '分镜模板',
      cover: 'https://picsum.photos/seed/picker-4/480/640',
    },
    {
      id: 'picker-media-5',
      kind: 'video',
      title: '公开视频 02',
      cover: 'https://picsum.photos/seed/picker-5/480/640',
      duration: '01:12',
    },
    {
      id: 'picker-media-6',
      kind: 'image',
      title: '选题脑图',
      cover: 'https://picsum.photos/seed/picker-6/480/640',
    },
  ],
  files: [
    {
      id: 'picker-file-1',
      kind: 'file',
      title: '直播排期表.xlsx',
      ext: 'XLSX',
      size: '1.2 MB',
    },
    {
      id: 'picker-file-2',
      kind: 'file',
      title: '课程讲义.pdf',
      ext: 'PDF',
      size: '16.4 MB',
    },
    {
      id: 'picker-file-3',
      kind: 'file',
      title: '剪辑素材包.zip',
      ext: 'ZIP',
      size: '28.3 MB',
    },
    {
      id: 'picker-file-4',
      kind: 'file',
      title: '参考文案.docx',
      ext: 'DOCX',
      size: '0.9 MB',
    },
  ],
}
