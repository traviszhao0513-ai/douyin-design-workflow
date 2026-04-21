# 设计系统审计报告（Phase 1）

> 目标：在开始重构前，把仓库内每一段页面 CSS / JSX 归类到应归属的层次，作为 Phase 2-4 的依据。

## 一、当前状态快照

| 指标 | 数值 |
|------|------|
| `Douyin_design_system/ui/components/` 已有原子件 | **20** (Avatar, Badge, Button, Card, Divider, Form, Input, List, Modal, Tabs, Toggle, …) |
| `Douyin_design_system/ui/components/` 被 `src/` 页面 import 次数 | **0** |
| `Douyin_design_system/tokens.json` 被任何 CSS 引用 | **0**（未生成 CSS 变量） |
| `src/pages/Chat.css` 行数 | 1086 |
| `src/pages/Messages.css` 行数 | 677 |
| `src/pages/BubblePreview.css` 行数 | ~220 |
| 本地自定义变量命名空间 | `--cht-*`（Chat）、`--msg-*`（Messages）各自一套 |

**结论**：设计系统已被构建，但未被消费。页面层重复造了 token 和基础原子件。

## 二、分层归属规则

| 层 | 文件路径（目标） | 职责 |
|---|---|---|
| **L1 · Tokens** | `src/design-system/tokens.css` | 所有视觉量的单一来源。从 `Douyin_design_system/tokens.json` 生成 `--dux-*` 变量 |
| **L2 · 原子件** | `Douyin_design_system/ui/components/*` | 通用、无业务语义。Avatar / Button / ListItem / Badge / Divider / Input / Card / … |
| **L3 · IM 分子** | `src/components/im/*` | 业务特化，内部组合 L2。`Bubble.jsx` 已是范例 |
| **L4 · 页面** | `src/pages/*` | 只做组装 + 页面级布局 |

## 三、Chat.css 归属表（关键规则，共 1086 行）

| 规则段 | 当前行数估计 | 归属 | 处理动作 |
|--------|------------|------|---------|
| `:root` / `[data-theme="dark"]` 的 `--cht-text-*` / `--cht-bubble-*` 等 token 块 | ~120 行 | **L1** | Phase 2：改为 `var(--dux-color-text-primary)` 等引用，不再定义原始 hex |
| `.cht-page` / `.cht-topbar` / `.cht-input` 等页面外壳 | ~180 行 | **L4** | 保留，但 topbar 可进一步抽成 L3 `<ChatTopBar>` |
| `.cht-avatar*`（如有） | ~10 行 | **L2 (Avatar)** | Phase 3a：删除，改用 `<Avatar size="md">` |
| `.cht-bbl*` 所有气泡变体（text/link/image/video/quote/…） | ~600 行 | **L3 (Bubble)** | 已在 `src/components/Bubble.jsx`，本轮保留 |
| `.cht-acb*`（快捷回复 chip） | ~50 行 | **L2 (Chip) 待建** 或 **L3** | 先保留，Phase 4 视情况抽出 |
| 图标尺寸 / `svg` 规则 | ~30 行 | **L2 (Icon)** | 暂保留，Icon 已有统一入口 `src/icons/` |

## 四、Messages.css 归属表（677 行）

| 规则段 | 归属 | 处理动作 |
|--------|------|---------|
| `.msg-header` / 搜索栏 / 吸顶 | **L4** | 保留；搜索栏内部用 L2 `<Input>` |
| `.msg-avatar`（36×36 圆形） | **L2** | 删 → `<Avatar size="sm">`（注：L2 sm=28 与 36 不符，需给 Avatar 添加 `36` 预设或用 `style={{width:36,height:36}}` 临时） |
| `.msg-row` / `.msg-item`（会话行） | **L3 (ConversationRow)** 新建 | 内部组合 `<Avatar>` + `<Badge>` + 标题/副标题/时间 |
| `.msg-unread` 红点 | **L2 (Badge)** | 删 → `<Badge>` |
| `.msg-separator` | **L2 (Divider)** | 删 → `<Divider>` |
| `.msg-tab-bar`（置顶 tab） | **L2 (Tabs) 或自留 L4** | 视设计是否跨页复用 |

## 五、Phase 2-4 行动清单（按顺序）

### Phase 2 · Token 统一（0.5 天）✓ 下一步执行
- [ ] 创建 `src/design-system/tokens.css`，从 `tokens.json` 生成全量 `--dux-*` 变量（light + dark）
- [ ] 在 `src/main.jsx` 顶部 import
- [ ] `Chat.css` 中的 `--cht-*` token 块改为引用 `--dux-*`（保留别名，零业务破坏）
- [ ] 删除 `src/styles.css` 中过时的硬编码颜色（radial-gradient / rgba 字面量）

### Phase 3 · 原子件接入（2 天，按优先级）
- [ ] **3a** · `<Avatar>`：替换 Messages 的 `.msg-avatar`（需给 Avatar 加 36px 预设）
- [ ] **3b** · `<Badge>`：替换 `.msg-unread`
- [ ] **3c** · `<Divider>`：替换 Messages / Chat 中手写的 `0.5px border`
- [ ] **3d** · `<IconButton>`（待建或用 Button size="icon"）：Chat topbar / Messages toolbar

### Phase 4 · IM 分子（1 天）
- [ ] `src/components/im/ConversationRow.jsx`：Messages 列表每行
- [ ] `src/components/im/ChatTopBar.jsx`：Chat 顶栏
- [ ] `src/components/im/InputBar.jsx`：Chat 底部输入
- [ ] 把现有 `src/components/Bubble.jsx` 挪到 `src/components/im/Bubble.jsx`

### 治理 · 写入决策树
- [ ] 在 `CLAUDE.md` 追加「新需求决策树」：L3 有现成？→ L2 能组合？→ 新增 L2 → 咨询设计师
- [ ] BubblePreview 扩展成 ComponentPreview 子路由（/preview/bubble, /preview/avatar, …）

## 六、风险与权衡

1. **L2 组件是 .tsx，项目是 .jsx** → Vite 已支持 tsx 混用，但类型检查可能未开启。先不纠结，接上再说。
2. **Avatar 尺寸预设不足**：IM 用 36px（sm 28 太小，md 40 太大）。方案：给 `dux-avatar--im` 添加 36px 尺寸，或保留 style 覆盖。
3. **`--cht-*` 别名保留 vs 一次性全删**：建议保留一轮迭代，Phase 3 验收后再整体清理，避免 diff 爆炸。
4. **Chat.css 里 Bubble 相关 ~600 行不能挪走**，只能挪命名空间（`.cht-bbl-*` → `.im-bubble-*`），这是 Phase 4 的事。

---

**下一步**：开始 Phase 2。
