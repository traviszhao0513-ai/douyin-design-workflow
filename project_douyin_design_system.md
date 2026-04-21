# Project Douyin Design System

## Role / 角色

This file is the Douyin design-system entrypoint and compatibility alias for this repository.

For visual work in this repository, the default reading order is:
1. `design.md`
2. `project_douyin_design_system.md`
3. `./Douyin_design_system/ui/components/`

---

## Source of Truth / 真实来源

| 来源 | 路径 |
|------|------|
| 本地组件代码 | `./Douyin_design_system/ui/components/` |
| Figma 组件库 | [Douyin Delight Variants](https://www.figma.com/design/lvq7nDFgdhswnLfCBRpNQF) |
| Figma 样式库 | file key `YpbpN10qMQLTarfcjZti4H` (Douyin Delight Styles) |
| **Figma 图标库** | file key `ARvYQu8qBDaMF3312hSym3` ([Douyin Delight Icons](https://www.figma.com/design/ARvYQu8qBDaMF3312hSym3/Douyin-Delight-Icons)) |

---

## Reuse Rule / 复用规则

1. **先复用** — 查本地 `./Douyin_design_system/ui/components/`
2. **再组合** — 组合现有组件
3. **最后新建** — 说明来源（对齐 Figma 命名）

---

## Component Inventory / 组件清单

图例：`✅ 完整` `⚠️ 部分实现` `❌ 本地缺失（仅 Figma）` `🔵 本地独有（Figma 无对应）`

---

### 🎛️ Controls 控件

| Figma 名称 | 本地组件 | 状态 | 说明 |
|---|---|---|---|
| DUXAvatar 头像 | `Avatar` | ✅ | size×5, shape×2, status×4, AvatarGroup with overflow |
| DuxButton 按钮 | `Button` | ✅ | variant×4, size×3, loading, block, prefix/suffix icon |
| DuxCheckbox 复选框 | `Checkbox` | ✅ | size×2, indeterminate, CheckboxGroup horizontal/vertical |
| DuxRadio 单选框 | `Radio` | ✅ | size×2, RadioGroup horizontal/vertical |
| DuxSwitch 开关 | `Toggle` | ✅ | size×3, label, labelPlacement×2（Figma 命名为 Switch）|
| DuxLine 分割线 | `Divider` | ✅ | orientation×2, weight×3, label+labelAlign×3 |
| DuxBadges 飘新提示 | `Badge` | ✅ | count/dot mode, max, color×5；Tag 也在同文件（closable, variant×3, color×7）|
| **DuxTag 标签** | — | ❌ | 本地 Badge.tsx 内有 Tag 子组件，但未在文档注册为独立入口 |
| **DuxFilter 筛选器** | — | ❌ | 多条件筛选标签行，需新建 |
| **DuxStepper 步进器** | — | ❌ | +/- 数量步进控件，需新建 |

---

### 🧭 Navigations 导航

| Figma 名称 | 本地组件 | 状态 | 说明 |
|---|---|---|---|
| DuxTabBars 标签栏 | `BottomNav` + `Tabs` | ⚠️ | BottomNav = 底部主导航；Tabs = 页内二级导航；Figma 合并为一个组件 |
| **DuxTitleBar 标题栏** | — | ❌ | 页面顶部导航栏（back + title + actions），本地 ActionBar 是视频侧边操作栏，非同一组件 |
| **DuxPopoverMenus 气泡菜单** | — | ❌ | 长按/点击弹出的气泡式菜单，需新建 |

---

### 🔔 Notifications 提示

| Figma 名称 | 本地组件 | 状态 | 说明 |
|---|---|---|---|
| DuxToast 轻提示 | `Toast` | ✅ | type×5, ToastProvider, auto-dismiss, placement×2 |
| DuxTooltips 气泡提示 | `Tooltip` | ✅ | placement×4, trigger×3, delay, maxWidth |
| DuxPushNotifications 端内提醒 | `PushNotification` | ✅ | theme×3, avatar, appIcon overlay, action button |
| **DuxBottomNotification 底部提醒** | — | ❌ | 从底部弹出的通知条（不同于 Toast），需新建 |
| **DuxTips 贴士条** | — | ❌ | 页面内嵌提示条（info/warning/error），需新建 |

---

### ⌨️ Inputs 输入

| Figma 名称 | 本地组件 | 状态 | 说明 |
|---|---|---|---|
| DuxForm 表单 | `Form` | ⚠️ | 结构完整，**但缺少验证逻辑**（rules 字段已定义但未执行 pattern/validator）|
| DuxListItem 列表 | `List` | ✅ | type×2, divider, icon/title/subtitle/rightSlot，56px min-height |
| **DuxSearchBars 搜索栏** | — | ⚠️ | 本地 `Input` 内含 `SearchInput` 变体（pill 形态 + search icon），但未注册为独立组件 |

---

### 📦 Containers 容器

| Figma 名称 | 本地组件 | 状态 | 说明 |
|---|---|---|---|
| DuxActionsheets 动作菜单 | `Actionsheets` | ✅ | items+variant×3, showCancel, mode×2 (standard/immersive), showDescription |
| DuxDialog 对话框 | `Modal` | ✅ | size×4(含 fullscreen), maskClosable, closable, escape key, body-scroll lock |
| **DuxPickerPanel 滚轮选择器面板** | — | ❌ | 底部弹出 + 滚轮列，需新建 |
| **DuxPicker 滚轮选择器** | — | ❌ | 内嵌滚轮选择器（单/多列），需新建 |
| **DuxSelectionPanel 选择器面板** | — | ❌ | 底部弹出多选/单选面板，需新建 |
| **DuFliterPanel 筛选器面板** | — | ❌ | 底部弹出多维筛选器，需新建 |
| **DuxInfoPanel 信息面板** | — | ❌ | 信息展示型底部面板，需新建 |
| **DuxBanner 横幅** | — | ❌ | 页面内固定横幅广告/公告条，需新建 |
| **DuxBasicPanel 基础面板** | — | ❌ | 通用底部 Sheet 容器（grabber + 内容区），需新建 |
| `Card` | `Card` | 🔵 | 本地有，Figma 无直接对应。variant×3, CardGrid, cover/header/footer |

---

### ⚡ Capabilities 能力

| Figma 名称 | 本地组件 | 状态 | 说明 |
|---|---|---|---|
| **DuxUploader 上传器** | — | ❌ | 图片/文件上传选择器，需新建 |
| **DuxRatings 评分器** | — | ❌ | 星级评分组件，需新建 |
| **DuxSliders 滑动选择器** | — | ❌ | 单/双滑块 Range Slider，需新建 |
| **DuxProgressIndicators 进度指示器** | — | ❌ | 线形/环形进度条，需新建 |
| **DuxVacantView 缺省视图** | — | ❌ | 空状态占位（无数据/无网络/无结果），需新建 |
| **DuxCarouselIndicators 轮播指示器** | — | ❌ | Swiper 页码点指示器，需新建 |
| **Duxprotocols 协议文本** | — | ❌ | 隐私协议 checkbox + 链接文本组合，需新建 |
| `Skeleton` | `Skeleton` | 🔵 | 本地有，Figma 无对应。variant×5, shimmer, SkeletonCard preset |

---

### 🖥️ System 系统

| Figma 名称 | 本地组件 | 状态 | 说明 |
|---|---|---|---|
| **DuxStatusBar 状态栏** | — | ❌ | iOS 状态栏（时间 + 信号 + 电量），需新建 |
| **DuxHomeIndicator 主屏幕指示器** | — | ❌ | iPhone Home Indicator 黑条，需新建 |
| **DuxKeyboards 键盘** | — | ❌ | 系统键盘占位（用于界面布局），需新建 |
| **DUXDynamicIsland 灵动岛** | — | ❌ | iPhone 14 Pro+ 灵动岛，需新建 |
| **DuxScrollbars 滚动条** | — | ❌ | 自定义滚动条样式，需新建 |
| **DuxGrabber 拖拽控制器** | — | ❌ | 底部 Sheet 顶部拖拽条，需新建 |

---

### 🎬 Douyin 业务专属（本地独有）

| 本地组件 | 状态 | 说明 |
|---|---|---|
| `ActionBar` | 🔵 ✅ | 视频侧边操作栏（like/comment/share），direction×2, animated states |
| `VideoCard` | 🔵 ✅ | 视频流卡片，ratio×3, isLive, plays/likes, author section |

---

## Known Issues / 已知问题

| 组件 | 问题 | 优先级 |
|---|---|---|
| `Form` | `rules` 中 `pattern`/`validator` 已定义但未执行，验证逻辑为 stub | 🔴 高 |
| `Badge` (Tag) | `Tag` 子组件存在于 Badge.tsx 中但未在清单中独立注册；与 Figma DuxTag 命名不对齐 | 🟡 中 |
| `Input` (SearchInput) | SearchInput 变体存在于 Input.tsx 中但未独立注册，与 Figma DuxSearchBars 不对齐 | 🟡 中 |
| `BottomNav` + `Tabs` | Figma 中 DuxTabBars 合并了两种导航，本地拆分为两个组件，语义略有差异 | 🟢 低 |

---

## Recommended Mapping / 推荐映射

| 场景 | 使用组件 |
|---|---|
| 底部主导航 | `BottomNav` (→ DuxTabBars) |
| 页内二级导航 | `Tabs` (→ DuxTabBars) |
| 页面顶部导航栏 | ❌ 待实现 DuxTitleBar |
| CTA 操作 | `Button` |
| 列表内容 | `List` |
| 身份展示 | `Avatar` + `Badge` |
| 弹层操作菜单 | `Actionsheets` |
| 确认/表单弹窗 | `Modal` |
| 系统通知 | `PushNotification` |
| 轻提示反馈 | `Toast` |
| 视频内容流 | `VideoCard` |
| 视频侧边互动 | `ActionBar` |
| 加载占位 | `Skeleton` |

---

## Fallback Policy / 兜底策略

1. 组合现有本地组件
2. 使用 `douyin-design-system` skill
3. 使用 Figma/设计生成工具新建
4. 明确标注超出本地组件库范围

---

## Relationship to `design.md`

- `design.md` → 出图规范（tokens、组件映射、页面模式）
- `project_douyin_design_system.md` → 本地组件源与复用策略
- `./Douyin_design_system/ui/components/` → 实际组件代码
