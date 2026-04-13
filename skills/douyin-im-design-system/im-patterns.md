# IM 专属交互模式

> 本文件定义抖音 IM 场景（会话列表、聊天页、消息气泡等）的专属设计规范。

## 1. 会话列表（Messages 页）

### 布局规则
- 使用 List 组件承载每个会话项
- 每项高度：72px（头像 44px + 上下 padding 各 14px）
- 头像：Avatar size=md（44px），shape=circle
- 未读数：Badge count 模式，叠加在头像右上角
- 分割线：LinePrimary（12% 透明度），左侧缩进对齐头像右边

### 信息层级
1. 用户名：TextPrimary，size=base(14px)，weight=Medium(500)
2. 最新消息预览：TextTertiary，size=sm(12px)，单行截断
3. 时间戳：TextTertiary，size=sm(12px)，右对齐
4. 未读角标：Primary 色背景，白色数字

### 背景
- 页面背景：BGPrimary2（IM 专属背景）
- 列表项背景：BGPrimary
- 列表项按下：BGInput2

## 2. 消息气泡（Chat 页）

### 气泡布局
- 自己发送（右侧）：Primary 背景，白色文字
- 对方发送（左侧）：BGIMBubble 背景，TextPrimary 文字
- 气泡最大宽度：屏幕宽度的 70%
- 圆角：radius-lg(16px)，发送方右下角 radius-xs(4px)，接收方左下角 radius-xs(4px)

### 气泡内容类型
| 类型 | 规则 |
|------|------|
| 文字 | padding: 10px 14px；行高 relaxed(1.625) |
| 图片 | 圆角 radius-md(12px)；最大高度 240px |
| 语音 | 高度 40px；左侧波形图标；时长文字 TextSecondary |
| 时间分割 | 居中；TextTertiary；size=xs(10px)；上下 margin 12px |

### 长按菜单（Popover）
- 背景：BGPopoverDefault
- 按下：BGPopoverPressed
- 圆角：radius-md(12px)
- 阴影：shadow-medium
- 使用 Actionsheets 组件承载菜单项

### 输入区域
- 背景：BGSecondary3（底部 Bar 背景）
- 输入框：Input 组件，背景 BGInput，圆角 radius-full
- 底部安全区：34px padding-bottom
- 发送按钮：Button variant=primary，size=sm，圆形

## 3. 通知与反馈

### Toast 使用规则
- 消息发送失败：Toast + 错误图标，Negative 色
- 消息撤回成功：Toast，TextPrimary 色，自动消失 2s
- 网络断开：Toast，吸顶固定（z-index: toast = 500）

### Push 通知
- 使用 PushNotification 组件
- 头像：Avatar size=sm
- 标题：TextPrimary，weight=Medium
- 预览文字：TextSecondary，单行截断

## 4. 页面导航模式

### 进入聊天页（Push 转场）
- 动效：从右侧滑入，duration=slow(300ms)，easing=enter
- NavBar：显示联系人名 + 返回箭头
- 返回：从右侧滑出，duration=slow(300ms)，easing=exit

### NavBar 规范
- 背景：BGPrimary（支持毛玻璃时用 BGPanelTintiOS）
- 标题：TextPrimary，size=xl(17px)，weight=Semibold(600)
- 返回图标：icon/arrow-left-line，24px，TextPrimary
- 顶部安全区：47px status bar

## 5. 空状态

- 无会话时：居中插画 + TextTertiary 说明文字
- 无搜索结果：居中图标 + TextTertiary「未找到相关内容」
- 图标/插画尺寸：80-120px

## 6. 图标使用（IM 场景）

| 场景 | 图标名 | 尺寸 | 颜色 Token |
|------|--------|------|-----------|
| 返回 | arrow-left-line | 24px | TextPrimary |
| 更多操作 | more-horizontal-line | 24px | TextPrimary |
| 发送 | send-fill | 20px | ConstTextInverse |
| 语音消息 | microphone-line | 20px | TextSecondary |
| 图片发送 | image-line | 20px | TextSecondary |
| 表情 | emoji-line | 20px | TextSecondary |
