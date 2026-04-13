# 抖音组件使用规则

> 组件库路径：./Douyin_design_system/ui/components/
> 复用原则：先复用 → 再组合 → 最后新建（新建需说明理由）

## 复用优先级

1. 直接复用 — 在下表找到匹配组件，直接 import 使用
2. 组合使用 — 多个组件组合满足需求
3. 新建 — 必须说明：为何现有组件无法满足，命名对齐 Figma

## 组件清单与规则

### Avatar 头像
- import: ./Douyin_design_system/ui/components/Avatar
- 何时用: 任何展示用户/作者身份的场景
- size: xs / sm / md / lg / xl（5档）
- shape: circle（默认）/ square
- status: online / offline / busy / none
- 禁止: 用裸 img 标签代替；自定义边框颜色
- AvatarGroup: 多人头像叠加，超出显示 +N

### Button 按钮
- import: ./Douyin_design_system/ui/components/Button
- variant: primary / secondary / ghost / danger
- size: sm / md / lg
- 何时用: 主操作用 primary；次要用 secondary；危险用 danger
- 禁止: 自定义颜色 hex；用 div/span 模拟按钮
- 注意: 支持 loading、block（全宽）、prefix/suffix icon

### Badge 徽章 & Tag 标签
- import: ./Douyin_design_system/ui/components/Badge
- Badge 模式: count（数字）/ dot（红点）；max 属性控制最大数字
- Tag 模式: closable；variant×3；color×7
- 何时用: 未读消息数用 Badge count；功能标签用 Tag

### List 列表
- import: ./Douyin_design_system/ui/components/List
- 何时用: 消息会话列表、设置项列表、搜索结果列表
- 禁止: 用裸 div 手写列表项

### Tabs 标签页
- import: ./Douyin_design_system/ui/components/Tabs
- 何时用: 页面内二级导航（For You / Following 等）
- 禁止: 用于主导航（主导航用 BottomNav）

### BottomNav 底部导航
- import: ./Douyin_design_system/ui/components/BottomNav
- 何时用: App 全局底部主导航 Tab Bar
- 注意: 底部需预留 34px Home Indicator 安全区

### Modal 弹窗
- import: ./Douyin_design_system/ui/components/Modal
- 何时用: 阻断式操作确认、重要信息展示
- 禁止: 非必要阻断（轻提示用 Toast）

### Toast 短提示
- import: ./Douyin_design_system/ui/components/Toast
- 何时用: 操作成功/失败的短暂反馈（2-3秒自动消失）
- 禁止: 用于需要用户操作的信息（用 Modal）

### Actionsheets 底部选项
- import: ./Douyin_design_system/ui/components/Actionsheets
- 何时用: 底部弹出的多选项操作（分享、更多操作等）

### Input 输入框
- import: ./Douyin_design_system/ui/components/Input
- 何时用: 单行文本输入（搜索框、聊天输入等）
- 禁止: 裸 input 标签

### Skeleton 骨架屏
- import: ./Douyin_design_system/ui/components/Skeleton
- 何时用: 列表/卡片/头像加载中的占位
- 禁止: 用 spinner/loading 圈代替列表骨架屏

### Card 卡片
- import: ./Douyin_design_system/ui/components/Card
- 何时用: 通用内容容器

### Checkbox / Radio / Toggle
- Checkbox: ./Douyin_design_system/ui/components/Checkbox（多选）
- Radio: ./Douyin_design_system/ui/components/Radio（单选）
- Toggle: ./Douyin_design_system/ui/components/Toggle（开关，Figma 命名 Switch）

### Divider 分割线
- import: ./Douyin_design_system/ui/components/Divider
- 慎用: 优先用间距区分层级，而非分割线

### Tooltip 轻提示
- import: ./Douyin_design_system/ui/components/Tooltip
- 何时用: 悬停/长按触发的说明性提示

### PushNotification 推送通知
- import: ./Douyin_design_system/ui/components/PushNotification
- 何时用: 模拟 App 内横幅通知

### VideoCard 视频卡片
- import: ./Douyin_design_system/ui/components/VideoCard
- 何时用: 双列视频流、推荐卡片

### Select 选择器
- import: ./Douyin_design_system/ui/components/Select
- 何时用: 下拉选择场景

## 场景快查

| 场景 | 组件 |
|------|------|
| 用户头像 | Avatar |
| 底部主导航 | BottomNav |
| 页内二级导航 | Tabs |
| 会话列表 / 设置列表 | List |
| 主 CTA 按钮 | Button（variant=primary） |
| 危险操作 | Button（variant=danger） |
| 未读消息数 | Badge（count 模式） |
| 操作成功反馈 | Toast |
| 重要确认弹窗 | Modal |
| 底部多选操作 | Actionsheets |
| 搜索框 / 聊天输入框 | Input |
| 加载中占位 | Skeleton |
| 功能标签 | Badge（Tag 模式） |
| 视频流卡片 | VideoCard |
| 图文内容卡片 | Card |
