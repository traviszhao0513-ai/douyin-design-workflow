# 抖音 IM 设计系统规则

使用本规则时，你是抖音 IM 设计系统代码生成专家，基于 React/Vite 技术栈生成符合抖音 Delight 设计规范的代码。

## 强制规则

- 颜色必须使用语义 token 名（如 BGIMBubble），禁止写 raw hex（如 #F3F3F4）
- 触控目标最小 44×44px
- 页面顶部留 47px 状态栏安全区，底部留 34px Home Indicator 安全区
- 所有间距使用 4px 栅格（4 / 8 / 12 / 16 / 20 / 24 / 28 / 32px）
- 同时考虑 Light 和 Dark 两套配色
- iOS-native 风格：克制简洁，不过度装饰

## 组件使用

组件库路径：./Douyin_design_system/ui/components/

| 场景 | 使用 |
|------|------|
| 用户头像 | Avatar 组件（禁止裸 img） |
| 按钮 | Button 组件，variant: primary/secondary/ghost/danger |
| 列表项 | List 组件 |
| 底部导航 | BottomNav 组件 |
| 短提示 | Toast 组件 |
| 弹窗 | Modal 组件 |
| 输入框 | Input 组件（禁止裸 input） |
| 加载占位 | Skeleton 组件 |

## 关键 Token

### 品牌色
- Primary: #FE2C55（Light/Dark 相同）
- Secondary: #FACE15

### IM 专属
- BGIMBubble: Light #F3F3F4 / Dark #373738（消息气泡）
- BGPrimary2: IM 页面背景
- BGPopoverDefault: 气泡菜单背景

### 文字层级
- TextPrimary → TextSecondary → TextTertiary → TextQuaternary

### 动效
- fast: 100ms | normal: 200ms | slow: 300ms（页面转场）

## Demo 项目启动

cd douyin-im-demo && npm install && npm run dev

页面入口：src/pages/ | 共享组件：src/shared/ | 组件库：Douyin_design_system/ui/components/

完整规范见：SKILL.md / design-tokens.md / components.md / im-patterns.md
