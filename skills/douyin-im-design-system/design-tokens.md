# 抖音设计系统 Design Tokens

> 来源：Figma「Douyin Delight Styles」(YpbpN10qMQLTarfcjZti4H)
> 每个 token 包含 Light / Dark 两套值。代码中必须使用 token 名，禁止 raw hex。

---

## 颜色 / Colors

### 系统色
| Token | Light | Dark | 用途 |
|-------|-------|------|------|
| Primary | #FE2C55 | #FE2C55 | 抖音品牌色 |
| Secondary | #FACE15 | #FACE15 | 金黄辅助色 |
| Negative | #FE3824 | #FE3824 | 错误/危险 |
| Positive | #13C15A | #13C15A | 成功/正面 |
| TextActionPrimary | #FF1F65 | #FF1F65 | 品牌操作红 |
| CloseFriend | #9963FF | #9963FF | 密友功能色 |

### 文字色
| Token | Light | Dark | 用途 |
|-------|-------|------|------|
| TextPrimary | #161823 100% | #FFFFFF 90% | 一级文字/icon |
| TextSecondary | #161823 75% | #FFFFFF 75% | 二级文字 |
| TextTertiary | #161823 60% | #FFFFFF 50% | 三级文字/时间戳 |
| TextQuaternary | #161823 34% | #FFFFFF 34% | 四级/置灰/提示 |
| ConstTextInverse | #FFFFFF 100% | #FFFFFF 100% | 视频页一级文字 |
| TextTabHighlight | #FE2C55 100% | #FFFFFF 90% | 筛选标签选中 |
| TextAlert | #AD6507 | #E09D00 | 警示文字 |
| TextPositive | #057548 | #0D9E5A | 积极提示文字 |

### 背景色
| Token | Light | Dark | 用途 |
|-------|-------|------|------|
| BGPrimary | #FFFFFF | #161823 | 主场景背景 |
| BGPrimary2 | #161823 3% | #161823 100% | IM/个人页背景 |
| BGSecondary3 | #FFFFFF | #161616 | 底部 Bar 背景 |
| BGPanelGray | #F3F3F4 | #161823 | 深浅对照背景 |
| BGPanelTint | #FFFFFF | #262626 | 面板背景 |
| BGPanelTone | #F3F3F4 | #262626 | 面板背景（灰底） |
| BGCard | #FFFFFF | #FFFFFF 3% | 卡片背景 |
| BGCard2 | #161823 3% | #FFFFFF 6% | 页面卡片背景 |
| BGCardSolid | #FFFFFF | #1D1F2A | 纯色卡片背景 |
| BGInput | #161823 5% | #FFFFFF 15% | 输入框/标签背景 |
| BGInput4 | #FFFFFF | #000000 | 评论面板输入框 |

### IM 专属背景色
| Token | Light | Dark | 用途 |
|-------|-------|------|------|
| BGIMBubble | #F3F3F4 | #373738 | 消息气泡背景 |
| BGPopoverDefault | #FFFFFF | #393B44 | 气泡菜单背景 |
| BGPopoverPressed | #F3F3F4 | #45474F | 气泡菜单按下 |
| BGToast | #FFFFFF | #393B44 | Toast 背景 |
| ToastDefault | #393B44 | #393B44 | Toast 固定色 |

### 线条色
| Token | Light | Dark | 用途 |
|-------|-------|------|------|
| LinePrimary | #161823 12% | #FFFFFF 8% | 一级分割线 |
| LinePrimary2 | #161823 20% | #FFFFFF 20% | 二级分割线 |
| LineSecondary | #FFFFFF 8% | #FFFFFF 8% | 页面基础分隔 |
| LineCardStroke | #161823 8% | #FFFFFF 0% | 卡片描边 |

### 蒙层色
| Token | Value | 用途 |
|-------|-------|------|
| SDPrimary | #000000 85% | 授权文字/视频蒙层 |
| SDSecondary | #000000 50% | 弹窗蒙层 |
| SDTertiary | #000000 34% | 轻量蒙层 |

### 链接色
| Token | Light | Dark |
|-------|-------|------|
| Link | #FE2C55 | #FACE15 |
| TextActionSecondary | #04498D | #848BF2 |

---

## 字体 / Typography

Font Family: PingFang SC, SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif

| Scale | Size | 典型用途 |
|-------|------|---------|
| xs | 10px | 极小标签 |
| sm | 12px | 辅助文字、时间戳 |
| base | 14px | 正文、列表项 |
| md | 15px | 略大正文 |
| lg | 16px | 三级标题 |
| xl | 17px | 二级标题 |
| 2xl | 18px | 页面标题 |
| 3xl | 20px | 大标题 |
| 4xl | 22px | 数据展示 |

| Weight | Value | 用途 |
|--------|-------|------|
| Regular | 400 | 正文 |
| Medium | 500 | 强调 |
| Semibold | 600 | 标题 |
| Bold | 700 | 极重强调 |

---

## 间距 / Spacing

基础单位：4px（所有间距必须是 4 的倍数）
0 / 4 / 8 / 12 / 16 / 20 / 24 / 28 / 32 / 40 / 48 / 56 / 64px

---

## 圆角 / Border Radius

| Token | Value | 场景 |
|-------|-------|------|
| none | 0px | 无圆角 |
| xs | 4px | 标签、小徽章 |
| sm | 8px | 输入框、小卡片 |
| md | 12px | 卡片、面板 |
| lg | 16px | 大卡片、Sheet |
| xl | 20px | 弹窗 |
| 2xl | 24px | 大弹窗 |
| full | 9999px | 胶囊按钮、头像 |

---

## 阴影 / Shadows

| Token | Value |
|-------|-------|
| small | 0 1px 4px rgba(22,24,35,0.08) |
| medium | 0 4px 12px rgba(22,24,35,0.12) |
| large | 0 8px 24px rgba(22,24,35,0.16) |
| xl | 0 16px 40px rgba(22,24,35,0.20) |

---

## 动效 / Motion

| 名称 | 时长 | 场景 |
|------|------|------|
| fast | 100ms | 微交互、按下反馈 |
| normal | 200ms | 常规转场、展开收起 |
| slow | 300ms | 页面级转场、复杂动画 |

| Easing | Value | 场景 |
|--------|-------|------|
| standard | cubic-bezier(0.4, 0, 0.2, 1) | 通用 |
| enter | cubic-bezier(0, 0, 0.2, 1) | 进入动画 |
| exit | cubic-bezier(0.4, 0, 1, 1) | 退出动画 |

---

## 层级 / Z-Index

| Token | Value | 用途 |
|-------|-------|------|
| base | 0 | 基础层 |
| raised | 10 | 浮起元素 |
| dropdown | 100 | 下拉菜单 |
| sticky | 200 | 粘滞导航 |
| overlay | 300 | 蒙层 |
| modal | 400 | 弹窗 |
| toast | 500 | 提示层 |

---

## 平台安全区 / Safe Areas（iOS）

| 区域 | 值 |
|------|-----|
| 状态栏（顶部） | 47px |
| Home Indicator（底部） | 34px |
| 基准屏幕 | 390×844px（iPhone 14） |
| 触控目标最小值 | 44×44px |
