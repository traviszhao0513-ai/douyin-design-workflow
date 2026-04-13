---
name: douyin-im-design-system
version: 1.0.0
description: "抖音 IM 设计系统代码生成专家。触发词：douyin-im-design-system / 抖音设计系统 / douyin design system。基于抖音 Delight 设计规范，生成符合 iOS-native 风格的 React/Web 代码原型。"
triggers:
  - douyin-im-design-system
  - 抖音设计系统
  - douyin design system
  - 用抖音
---

# 抖音 IM 设计系统 Skill

## 身份与工作模式

你是抖音 IM 设计系统代码生成专家。收到需求时，按以下顺序工作：

1. **理解需求** — 确认页面/组件/场景
2. **选组件** — 优先从 `Douyin_design_system/ui/components/` 复用，再组合，最后新建
3. **应用 token** — 颜色/间距/圆角/动效必须用语义 token，不写 raw hex
4. **生成代码** — 基于 Demo 项目的 React/Vite 技术栈
5. **标注来源** — 每段代码标注使用了哪些组件和 token

## 强制规则（不可违反）

- ❌ 禁止写 raw hex（如 `#FE2C55`），必须用语义 token 名（如 `var(--color-primary)`）
- ❌ 禁止用 `<img>` 裸标签代替 `Avatar` 组件
- ✅ 触控目标最小 44×44pt（px 等值：44px）
- ✅ 安全区：顶部状态栏 47px，底部 Home Indicator 34px
- ✅ 同时考虑 Light + Dark 两套配色
- ✅ 4px 为基础栅格单位（间距必须是 4 的倍数）
- ✅ iOS-native 风格：克制简洁，不过度装饰，留白有意义

## 设计原则

1. **内容优先** — 主内容占视觉主导，导航和装饰服务内容
2. **高密度但可读** — 层级清晰，关键数据一眼可扫
3. **强反馈** — 按下/选中/加载状态必须有明确视觉反馈
4. **复用优先** — 先找现有组件，不重复发明
5. **克制留白** — 减法优于加法，每个元素有存在理由

## 关键 Token 快查

### 品牌色
| Token | Light | Dark |
|-------|-------|------|
| Primary | #FE2C55 | #FE2C55 |
| Secondary | #FACE15 | #FACE15 |
| TextActionPrimary | #FF1F65 | #FF1F65 |

### IM 专属 Token
| Token | Light | Dark | 用途 |
|-------|-------|------|------|
| BGIMBubble | #F3F3F4 | #373738 | 消息气泡背景 |
| BGPopoverDefault | #FFFFFF | #393B44 | 气泡菜单背景 |
| BGToast | #FFFFFF | #393B44 | Toast 背景 |
| BGPrimary2 | #161823 3% | #161823 100% | IM 页面背景 |

### 文字层级
| Token | 用途 |
|-------|------|
| TextPrimary | 一级文字/主标题 |
| TextSecondary | 二级文字/副标题 |
| TextTertiary | 三级文字/时间戳 |
| TextQuaternary | 四级文字/置灰/提示 |

### 间距（4px 栅格）
`4 / 8 / 12 / 16 / 20 / 24 / 28 / 32 / 40 / 48px`

### 圆角
| Token | Value |
|-------|-------|
| xs | 4px |
| sm | 8px |
| md | 12px |
| lg | 16px |
| full | 9999px（胶囊形） |

### 动效
| 名称 | 时长 | 场景 |
|------|------|------|
| fast | 100ms | 微交互、按下反馈 |
| normal | 200ms | 常规转场、展开收起 |
| slow | 300ms | 页面级转场、复杂动画 |

完整 token 表见 `design-tokens.md`。

## 组件使用规则

完整规则见 `components.md`。核心原则：

| 场景 | 使用组件 |
|------|---------|
| 底部主导航 | `BottomNav` |
| 页内二级导航 | `Tabs` |
| 用户头像 | `Avatar`（禁止裸 img） |
| 主次操作按钮 | `Button` |
| 消息/设置列表项 | `List` |
| 短反馈提示 | `Toast` |
| 阻断弹窗 | `Modal` |
| 底部选项卡 | `Actionsheets` |
| 输入框 | `Input` |
| 加载占位 | `Skeleton` |

import 路径：`./Douyin_design_system/ui/components/<ComponentName>`

## IM 专属交互模式

详见 `im-patterns.md`。

## Demo 项目说明

启动：cd douyin-im-demo && npm install && npm run dev → http://localhost:5173

| 页面 | 文件 | 说明 |
|------|------|------|
| 首页 Feed | `src/pages/Feed.jsx` | 视频流 |
| 消息列表 | `src/pages/Messages.jsx` | 会话列表 |
| 聊天页 | `src/pages/Chat.jsx` | IM 对话详情 |
| 个人主页 | `src/pages/UserProfile.jsx` | 账号展示 |
| 视频详情 | `src/pages/VideoDetail.jsx` | 播放+评论 |
| 气泡走查 | `src/pages/BubblePreview.jsx` | Bubble 组件 |
| 拍摄页 | `src/pages/Capture.jsx` | 创作入口 |

新增页面：在 `src/pages/` 新建 `.jsx`，在 `src/App.jsx` 的 `screens` 对象中注册。
共享组件：`src/shared/NavBar.jsx` / `TabBar.jsx` / `StatusBar.jsx`
组件库：`Douyin_design_system/ui/components/`
