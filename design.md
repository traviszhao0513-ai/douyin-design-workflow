# design.md

## Purpose / 目标

This is the primary design-input document for visual generation in this repository.

这个文件是当前仓库默认的出图主文档。

For visual requests in this repo, Claude should read this file first, then `project_douyin_design_system.md`, then inspect the local Douyin component source directory:

`./Douyin_design_system/ui/components/`

Unless the user explicitly overrides the source, this document defines how Douyin-style pages should be composed, what visual principles to preserve, and how local components should be reused.

---

## Style Identity / 风格定义

### Tone / 调性
- **克制** — 不过度装饰，功能驱动，留白有意义
- **简洁** — 信息层级清晰，减少视觉噪音，一屏一焦点
- **iOS-native** — 毛玻璃质感、系统字体优先、原生手势交互、安全区适配
- **内容驱动** — 界面服务于内容，chrome 最小化
- **动效有意义** — 转场解释关系，反馈确认操作，不做炫技

### What this means in practice / 实践含义
- 优先使用系统控件和原生交互模式
- 避免渐变背景、多余阴影、花哨动画
- 文字层级通过字重和透明度区分，而非颜色数量
- 圆角跟随组件库，不单独发明新圆角体系
- 深浅色切换时保持视觉层级一致，不只是翻转颜色

---

## Design Principles / 设计原则

### 1. Content-first hierarchy / 内容优先
- 主内容必须占据视觉主导。
- 导航和装饰层服务内容，不喧宾夺主。

### 2. High-density but legible / 高密度但可读
- 信息密度可以高，但层级必须清晰。
- 关键操作和关键数据要一眼可扫到。

### 3. Strong feedback / 强反馈
- 交互元素要有明确的按下、选中、加载反馈。
- 合理使用 toast、badge、sheet、modal 提供反馈。

### 4. Reuse before invention / 复用优先
- 优先复用本地抖音组件，而不是重新发明新组件。
- 先组合现有组件，再考虑扩展。

### 5. Mobile-native rhythm / 移动端原生节奏
- 布局、导航、交互都应体现移动端原生节奏。
- 适当优先单手可达、安全区意识和底部主操作。

### 6. Restrained & purposeful / 克制与留白
- 不过度装饰，功能驱动，每个元素都有存在的理由。
- 留白是设计的一部分，不是「没填满」。
- 减法优于加法：能用一个元素表达的，不用两个。

---

## Design Tokens / 设计令牌

> Source: Figma「Douyin Delight Styles」(`YpbpN10qMQLTarfcjZti4H`)
> 每个 token 包含 Light / Dark 两套值，深浅色自动适配。

### Colors / 颜色

#### System Colors / 系统色

| Token | Light | Dark | 用途 |
|-------|-------|------|------|
| Primary | #FE2C55 | #FE2C55 | 抖音品牌色 |
| Primary2 | #161823 | #FACE15 | 阅读器下的品牌色 |
| Secondary | #FACE15 | #FACE15 | 金黄色系列色 |
| Secondary2 | #FE2C55 | #FE2C55 | 深浅切换后品牌色 |
| Negative | #FE3824 | #FE3824 | 错误/危险/负面 |
| Positive | #13C15A | #13C15A | 成功/正面 |
| LiveColorStart | #FF17B4 | #FF17B4 | 直播渐变起始色 |
| LiveColorEnd | #ED3495 | #ED3495 | 直播渐变结束色 |
| TextActionPrimary | #FF1F65 | #FF1F65 | 品牌操作红色 |
| CloseFriend | #9963FF | #9963FF | 密友功能色 |
| UpdateAlert | #4E922A | #76FF44 | 更新提示色 |
| DouyinSelected | #00CCC4 | #00CCC4 | 抖音精选主题色 |
| DouyinSelectedAction | #FE2C55 | #FE2C55 | 抖音精选二主色 |

#### Text Colors / 文本色

基于 `#161823` (Light) 和 `#FFFFFF` (Dark) 的透明度体系。

| Token | Light | Dark | 用途 |
|-------|-------|------|------|
| TextPrimary | #161823 100% | #FFFFFF 90% | 一级文字/icon |
| TextSecondary | #161823 75% | #FFFFFF 75% | 二级文字/icon/协议条款 |
| TextTertiary | #161823 60% | #FFFFFF 50% | 三级文字/icon |
| TextTertiary2 | #161823 75% | #FFFFFF 50% | 暂无明确场景，不建议使用 |
| TextTertiary3 | #161823 100% | #FFFFFF 60% | 标签文字用色 |
| TextQuaternary | #161823 34% | #FFFFFF 34% | 四级文字/提示/置灰态 |
| TextQuaternary2 | #161823 34% | #FFFFFF 20% | 文字置灰态 |
| TextQuaternary3 | #FFFFFF 100% | #FFFFFF 34% | 二级按钮置灰态 |
| ConstTextInverse | #FFFFFF 100% | #FFFFFF 100% | 视频页/工具一级文字 |
| ConstTextInverse2 | #FFFFFF 90% | #FFFFFF 90% | 视频页/工具二级文字 |
| ConstTextInverse3 | #FFFFFF 75% | #FFFFFF 75% | 视频页/工具三级文字 |
| ConstTextInverse4 | #FFFFFF 50% | #FFFFFF 50% | 视频页/工具四级文字 |
| ConstTextInverse5 | #FFFFFF 34% | #FFFFFF 34% | 视频页/工具五级文字 |
| TextReverse | #161823 100% | #161823 100% | 白底一级文字(深浅不变) |
| TextReverse2 | #161823 75% | #161823 75% | 白底二级文字(深浅不变) |
| TextReverse3 | #161823 60% | #161823 60% | 白底三级文字(深浅不变) |
| TextReverse4 | #161823 34% | #161823 34% | 白底四级文字(深浅不变) |
| TextVIP | #392719 100% | #392719 100% | VIP/付费内容文字 |
| TextTabHighlight | #FE2C55 100% | #FFFFFF 90% | 筛选标签选中态 |
| TextAlert | #AD6507 100% | #E09D00 100% | 警示贴士文字 |
| TextAlertSecondary | #AD6507 60% | #E09D00 60% | 警示贴士二级文字 |
| TextPositive | #057548 100% | #0D9E5A 100% | 积极贴士文字 |
| TextPositiveSecondary | #057548 60% | #0D9E5A 60% | 积极贴士二级文字 |
| TextNegativeSecondary | #FE2C55 60% | #FE2C55 60% | 消极贴士二级文字 |

#### Background Colors / 背景色

##### 基础背景

| Token | Light | Dark | 用途 |
|-------|-------|------|------|
| BGPrimary | #FFFFFF | #161823 | 主场景背景 |
| BGPrimary2 | #161823 3% | #161823 100% | 个人页/同城/IM背景 |
| BGSecondary | #FFFFFF | #000000 95% | 二级背景(不建议使用) |
| BGSecondary3 | #FFFFFF | #161616 | 底部Bar背景 |
| BGTertiary2 | #FFFFFF | #FFFFFF 15% | 二级按钮背景 |
| BGTransparentWhite | #FFFFFF 34% | #FFFFFF 6% | 轻量透明白背景 |
| BGEntrance | #FFFFFF | #FFFFFF 6% | 入口背景 |

##### 面板背景

| Token | Light | Dark | 用途 |
|-------|-------|------|------|
| BGPanelGray | #F3F3F4 | #161823 | 深浅对照背景 |
| BGPanelTint | #FFFFFF | #262626 | 面板背景 |
| BGPanelTintiOS | #FFFFFF | #262626 90% | 面板背景(支持模糊) |
| BGPanelTone | #F3F3F4 | #262626 | 面板背景(灰底) |
| BGPanelToneiOS | #F3F3F4 | #262626 90% | 面板背景(支持模糊) |

##### 卡片背景

| Token | Light | Dark | 用途 |
|-------|-------|------|------|
| BGCard | #FFFFFF | #FFFFFF 3% | 同城/双列视频背景 |
| BGCard2 | #161823 3% | #FFFFFF 6% | 页面卡片背景 |
| BGCard3 | #FFFFFF 0% | #FFFFFF 6% | 个人页推荐卡片 |
| BGCardSolid | #FFFFFF | #1D1F2A | 纯色卡片背景 |
| BGCardGroup | #161823 5% | #161823 | 卡片集合背景 |
| BGView | #161823 3% | #0E0F1A | 区分背景的卡片 |
| BGViewSolid | #F8F8F8 | #0E0F1A | BGView 纯色版 |
| BGDoubleRowCard | #FFFFFF | #1F1F1F | 双列卡片背景 |

##### 输入场景

| Token | Light | Dark | 用途 |
|-------|-------|------|------|
| BGInput | #161823 5% | #FFFFFF 15% | 输入框/标签背景 |
| BGInput2 | #161823 5% | #FFFFFF 3% | Cell 按下/标签背景 |
| BGInput3 | #161823 15% | #FFFFFF 15% | 置灰按钮背景 |
| BGInput4 | #FFFFFF | #000000 | 评论面板输入框 |
| BGInputReverse | #161823 5% | #161823 5% | 搜索框背景(不变) |

##### 组件背景

| Token | Light | Dark | 用途 |
|-------|-------|------|------|
| BGIMBubble | #F3F3F4 | #373738 | IM消息气泡背景 |
| BGPopoverDefault | #FFFFFF | #393B44 | 气泡菜单背景 |
| BGPopoverPressed | #F3F3F4 | #45474F | 气泡菜单按下 |
| BGToast | #FFFFFF | #393B44 | 深浅对照气泡提示 |
| ToastDefault | #393B44 | #393B44 | Toast 固定色 |
| BGButtonPressMask | #000000 5% | #000000 5% | 按钮按下蒙层 |

##### 占位背景

| Token | Light | Dark | 用途 |
|-------|-------|------|------|
| Vacant | #161823 15% | #FFFFFF 20% | 缺省图形填充 |
| BGPlaceholderDefault | #161823 5% | #FFFFFF 6% | 占位颜色 |
| BGPlaceholderOpaque | #EDEDED | #242630 | 非透明头像/视频占位 |

##### 特殊用途

| Token | Light | Dark | 用途 |
|-------|-------|------|------|
| BGTabHighlight | #FE2C55 12% | #FFFFFF 15% | 筛选标签选中态 |
| BGTagHighlight | #FE2C55 6% | #FACE15 12% | 高亮标签背景 |
| BGLightPrimary | #FE2C55 8% | #FE2C55 20% | 浅红色主题按钮 |
| BGBadge | #FE2C55 | #FE2C55 | 飘新提示背景 |
| BGAlert | #FFBC1F 12% | #FFBC1F 12% | 警示贴士背景 |
| BGNegative | #FE2C55 6% | #FE2C55 12% | 消极贴士背景 |
| BGPositive | #19CC6D 12% | #00FF78 12% | 积极贴士背景 |

##### Const 系列 (深浅不变)

| Token | Value | 用途 |
|-------|-------|------|
| ConstBGInverse | #000000 | 视频/工具黑色底色 |
| ConstBGInverse2 | #000000 60% | 分享/评论/工具面板 |
| ConstBGFloatBtn | #444444 70% | 悬浮音乐按钮 |
| ConstBGPanelReverse | #F3F3F4 | 浅色灰色面板 |
| ConstBGTrack | #161823 15% | 元素默认背景 |
| ConstBGContainer | #3A3A3A 34% | 首页商业化按钮 |
| ConstBGContainer4 | #0F0F0F | 直播天窗底层 |
| ConstBGContainer5 | #FFFFFF 15% | 视频页二级按钮 |
| ConstBGContainer7 | #4D4D4D 50% | 首页锚点背景 |

#### Line Colors / 线条色

| Token | Light | Dark | 用途 |
|-------|-------|------|------|
| LinePrimary | #161823 12% | #FFFFFF 8% | 一级分割线 |
| LinePrimary2 | #161823 20% | #FFFFFF 20% | 二级分割线 |
| LineSecondary | #FFFFFF 8% | #FFFFFF 8% | 页面基础分隔 |
| LineSecondary2 | #161823 50% | #FFFFFF 0% | 二级较重边框 |
| LineTertiary | #FFFFFF 0% | #FFFFFF 12% | 三级分割线 |
| LineCardStroke | #161823 8% | #FFFFFF 0% | 卡片描边(深色0%) |
| ConstLineInverse | #FFFFFF 20% | #FFFFFF 20% | 视频页分割线(不变) |
| ConstLineInverse2 | #FFFFFF 12% | #FFFFFF 12% | 工具栏分割(不变) |
| ConstLineInverse3 | #161823 34% | #161823 34% | 工具更强分割(不变) |
| LineReverse | #161823 20% | #161823 20% | 白底分割线(不变) |
| LineReverse2 | #161823 12% | #161823 12% | 白底弱分割(不变) |

#### Overlay Colors / 蒙层色

| Token | Light | Dark | 用途 |
|-------|-------|------|------|
| SDPrimary | #000000 85% | #000000 85% | 授权文字/视频蒙层 |
| SDSecondary | #000000 50% | #000000 50% | 弹窗蒙层 |
| SDTertiary | #000000 34% | #000000 34% | 轻量蒙层 |
| SDCover | #000000 75% | #000000 75% | 卡片/视频封面 |
| ConstBGInverse2 | #000000 60% | #000000 60% | 分享/评论面板 |
| ShadowInverse | #000000 18% | #000000 15% | 阴影建议用色 |

#### Link Colors / 链接色

| Token | Light | Dark | 用途 |
|-------|-------|------|------|
| Link | #FE2C55 | #FACE15 | 常规功能链接(品牌) |
| Link2 | #EBA825 | #EBA825 | 收藏/评论区用户 |
| Link3 | #04498D | #FACE15 | 协议/公告文字链 |
| Link4 | #04498D | #04498D | 白色地址链接 |
| Link6 | #168EF9 | #FACE15 | 个人页网站地址 |
| Link7 | #EBA825 | #FACE15 | 执行链数字用色 |
| TextActionSecondary | #04498D | #848BF2 | 文字链用色 |
| ConstTextActionSecondary | #848BF2 | #848BF2 | 文字链一级用色(不变) |

#### Assist Colors / 辅助色

辅助色在 Light/Dark 模式下不变。

| Token | Hex | 用途 |
|-------|-----|------|
| AssistColorRed | #FF4C13 | 红 |
| AssistColorOrange | #FF851D | 橘黄 |
| AssistColorYellow | #FEB400 | 黄 |
| AssistColorBrown | #8B3312 | 棕 |
| AssistColorPink | #FA436E | 洋红 |
| AssistColorPurple | #AB4CFA | 紫 |
| AssistColorBlue | #20D5EC | 蓝 |
| AssistColorGreen | #30EEC0 | 绿 |

### Typography / 字体

- **Font Family**: PingFang SC, SF Pro Display, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif
- **Mono**: SF Mono, Cascadia Code, Menlo, monospace

| Scale | Size | Typical Use |
|-------|------|-------------|
| xs | 10px | 极小标签 |
| sm | 12px | 辅助文字、时间戳 |
| base | 14px | 正文、列表项 |
| md | 15px | 略大正文 |
| lg | 16px | 标题三级 |
| xl | 17px | 标题二级 |
| 2xl | 18px | 页面标题 |
| 3xl | 20px | 大标题 |
| 4xl-8xl | 22-36px | 数据展示、特大标题 |

| Weight | Value | Use |
|--------|-------|-----|
| Regular | 400 | 正文 |
| Medium | 500 | 强调 |
| Semibold | 600 | 标题 |
| Bold | 700 | 极重强调 |

| Line Height | Value |
|-------------|-------|
| tight | 1.2 |
| snug | 1.375 |
| normal | 1.5 |
| relaxed | 1.625 |

### Spacing / 间距

Base unit: **4px**

0 / 4 / 8 / 12 / 16 / 20 / 24 / 28 / 32 / 40 / 48 / 56 / 64

### Border Radius / 圆角

| Token | Value |
|-------|-------|
| none | 0px |
| xs | 4px |
| sm | 8px |
| md | 12px |
| lg | 16px |
| xl | 20px |
| 2xl | 24px |
| full | 9999px |

### Shadows / 阴影

| Token | Value |
|-------|-------|
| small | 0 1px 4px rgba(22,24,35,0.08) |
| medium | 0 4px 12px rgba(22,24,35,0.12) |
| large | 0 8px 24px rgba(22,24,35,0.16) |
| xl | 0 16px 40px rgba(22,24,35,0.20) |
| focus | 0 0 0 3px rgba(43,121,255,0.24) |

### Motion / 动效

| Duration | Value | Use |
|----------|-------|-----|
| fast | 100ms | 微交互 |
| normal | 200ms | 常规转场 |
| slow | 300ms | 复杂动画 |

| Easing | Value | Use |
|--------|-------|-----|
| standard | cubic-bezier(0.4, 0, 0.2, 1) | 通用 |
| enter | cubic-bezier(0, 0, 0.2, 1) | 进入 |
| exit | cubic-bezier(0.4, 0, 1, 1) | 退出 |

### Z-Index / 层级

| Token | Value | Use |
|-------|-------|-----|
| base | 0 | 基础层 |
| raised | 10 | 浮起 |
| dropdown | 100 | 下拉 |
| sticky | 200 | 粘滞 |
| overlay | 300 | 蒙层 |
| modal | 400 | 弹窗 |
| toast | 500 | 提示 |

---

## Component Mapping / 组件映射

> **完整组件清单和复用规则见 `project_douyin_design_system.md`。**
> 以下仅列出各场景下的推荐映射关系。

Default local design-system source:
`./Douyin_design_system/ui/components/`

Available component families (22):
`ActionBar` / `Actionsheets` / `Avatar` / `Badge` / `BottomNav` / `Button` / `Card` / `Checkbox` / `Divider` / `Form` / `Input` / `List` / `Modal` / `PushNotification` / `Radio` / `Select` / `Skeleton` / `Tabs` / `Toast` / `Toggle` / `Tooltip` / `VideoCard`

### Recommended mapping by scenario / 场景推荐映射

| 场景 | 推荐组件 |
|------|---------|
| 底部主导航 | `BottomNav` |
| 分栏/二级导航 | `Tabs` |
| 页面动作区/工具栏 | `ActionBar` |
| 视频流/推荐流/内容卡片 | `VideoCard` |
| 通用内容容器 | `Card` |
| 列表/消息条目/设置项 | `List` |
| 用户身份/作者信息 | `Avatar` |
| 状态标记/未读数 | `Badge` |
| 主次 CTA/确认/提交 | `Button` |
| 底部动作选择 | `Actionsheets` |
| 阻断式确认/弹层 | `Modal` |
| 短反馈 | `Toast` |
| 轻提示 | `Tooltip` |
| 强提醒参考 | `PushNotification` |
| 单行输入 | `Input` |
| 表单容器 | `Form` |
| 选择器 | `Select` |
| 离散选择/开关 | `Checkbox` / `Radio` / `Toggle` |
| 加载占位 | `Skeleton` |
| 分隔（节制使用） | `Divider` |

### Reuse rule / 复用规则
1. 先复用现有组件
2. 再组合多个组件
3. 最后才新建结构
4. 超出组件库时必须明确说明

---

## Screen Composition Patterns / 页面构成模式

### Feed / 首页 Feed
1. Top content context or minimal chrome
2. Primary immersive content block
3. Interaction rail or nearby action affordances
4. Persistent `BottomNav`

优先复用：`VideoCard` / `BottomNav` / `Badge` / `ActionBar`

### User Profile / 个人主页
1. Identity header
2. Follow / stats / primary CTA
3. Tab or segmented content switch
4. Content grid or list

优先复用：`Avatar` / `Button` / `Tabs` / `Card` / `List`

### Capture / 拍摄页
1. Full-screen capture surface
2. Bottom-centered primary action
3. Secondary controls around the action surface
4. Lightweight overlay controls

优先复用：`ActionBar` / `Button` / `Modal` / `Actionsheets`

### Messages / 消息页
1. Title and inbox segmentation
2. Message list or grouped entries
3. Unread badges and state labels
4. Lightweight search or filters if needed

优先复用：`List` / `Avatar` / `Badge` / `Tabs` / `BottomNav`

背景色：`BGPrimary2`（浅色 #161823 3%，深色 #161823 100%）

> **IM 详细模式（对话列表、聊天详情、群聊、系统通知）待后续补充。**
> 相关 IM 专属 token 已在 Design Tokens 中定义（如 `BGIMBubble`、`BGInput` 等），可直接引用。

### Video Detail / 视频详情
1. Main media surface
2. Nearby interaction actions
3. Comment or related-content drawer/sheet
4. Optional author and CTA block

优先复用：`VideoCard` / `ActionBar` / `Actionsheets` / `Modal` / `Button`

---

## Interaction & State / 交互与状态

### Required state coverage / 必备状态
- loading — 使用 `Skeleton` 占位
- empty — 缺省图 + 引导文案
- error — 错误提示 + 重试操作
- success — Toast 或状态变化反馈
- selected — 颜色/背景变化
- disabled — 置灰（`TextQuaternary` + `BGInput3`）
- pressed — 按下态（`BGButtonPressMask`）

### Drawer / Sheet / Modal usage
- 移动端动作选择优先使用 `Actionsheets`
- 阻断式确认或危险操作使用 `Modal`

### Feedback
- 用 `Toast` 表达短反馈（背景 `ToastDefault` #393B44）
- 用 `Badge` 表达持续状态或未读数量（背景 `BGBadge` #FE2C55）

---

## Output Contract / 出图约束

For `/design`, `/prototype`, and default "出图" requests in this repository:

1. Read `design.md` first
2. Read `project_douyin_design_system.md` second
3. Inspect `./Douyin_design_system/ui/components/`
4. Reuse local components first
5. Compose from multiple local components when no single component fits
6. Only create new structures as a fallback
7. When extending beyond the local component library, state that clearly
8. **Always specify Light + Dark values when defining colors**
9. **Use semantic token names (e.g. `BGPrimary`, `TextSecondary`) rather than raw hex values**

### Reporting expectation
When generating a page or screen, Claude should state:
- which local components were reused
- which parts were composed from existing components
- which parts required fallback beyond the current library
- **which color tokens were applied (by semantic name)**

---

## Override Rule / 覆盖规则

如果用户明确指定别的设计系统、视觉方向或更自由的探索模式，则用户指令优先于本文件。

---

## Learning Protocol / 自学习协议

### 显式学习 — /learn 命令
设计师通过 `/learn "规则描述"` 主动教学。

示例：
- `/learn "消息气泡圆角用 16px，发送方右下角用 4px"`
- `/learn "对话列表中置顶消息用 BGPrimary2 背景区分"`

写入路径：`memory/team_style_preferences.md` 对应 section。

### 自动沉淀
当同一设计决策在 **≥ 3 次迭代** 中被确认，系统会提议沉淀到 memory。

沉淀规则：
- 沉淀前 **必须经设计师确认**（保护设计师主权）
- design.md 本身 **不自动修改**，只在设计师确认后更新
- 沉淀内容记录到 `memory/team_style_preferences.md`

### 版本日志 / Changelog

| Date | Change |
|------|--------|
| 2026-03-31 | SP1: 重构 design.md，新增完整 Figma token 体系、IM 页面模式、自学习协议、风格定义调整为「克制/简洁/iOS-native」 |
