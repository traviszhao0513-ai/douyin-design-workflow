# 组件优先流水线 / Component-First Pipeline

> 本文档记录把"Figma cut 版页面"改造成"页面由原子件/分子件组装"的四阶段流水线，以及每一步落地细节。
> 作为后续需求的参照：**先读本文 → 再按 CLAUDE.md 决策树动手**。

---

## 背景

截至本轮开工前，仓库的 IM 核心页面（Chat、Messages）处于"高度定制 Figma 切图"状态：

- `Douyin_design_system/ui/components/` 里已有 **20** 个原子件，但 **0** 处被 `src/pages/` 使用
- `Chat.css` 1086 行、`Messages.css` 677 行，两套完全重复的 `--cht-*` / `--msg-*` token
- `tokens.json` 被构建出来但从未生成 CSS 变量，设计系统与消费层彻底断开

目标是让主分支的页面布局和组成**尽量由调用原子组件组合而来**，新功能的实现也是尽量组合优先，而不是每次手写一份 Figma 切图。

---

## 四层架构（L1 ~ L4）

| 层 | 路径 | 职责 | 例子 |
|----|------|------|------|
| **L1 · Tokens** | `Douyin_design_system/ui/tokens.css` | 所有视觉量的单一来源 | `--dux-color-brand-primary`, `--dux-spacing-4` |
| **L2 · Atoms** | `Douyin_design_system/ui/components/*` | 通用无业务语义 | Avatar, Badge, Button, Divider, Input |
| **L3 · IM Molecules** | `src/components/im/*` | 业务特化，内部组合 L2 | Bubble, ConversationRow, ChatTopBar, InputBar |
| **L4 · Pages** | `src/pages/*` | 页面级布局 + 业务串联 | Chat.jsx, Messages.jsx |

关键约束：
- **L1 不引用 L1** — tokens 文件不互相 import
- **L2 不依赖 L3/L4** — 原子件完全通用，不写死文案或业务 prop
- **L3 不绕过 L2** — 分子件组合原子件，不自己重画 Avatar / Badge
- **L4 不创造新原子** — 页面只组装，不在页面文件里写新的通用视觉组件

---

## 四阶段流水线

### Phase 1 · 审计 — `docs/design-system-audit.md`

把仓库里每一段 CSS / JSX 归类到目标层。产出规则表：

- `--cht-text-*` / `--cht-bubble-*` → L1（改为引用 `--dux-*`）
- `.cht-avatar` / `.msg-avatar` → L2（删除，用 `<Avatar>`）
- `.msg-row` / `.cht-nav` / `.cht-input-bar` → L3 新建
- `.cht-page` / `.cht-topbar` 外壳 → L4 保留

**产物**：`docs/design-system-audit.md`（规则归属表 + 行动清单 + 风险与权衡）。

---

### Phase 2 · Token 统一

不直接动页面结构，只把颜色/间距的来源统一到 `--dux-*`：

1. `Douyin_design_system/ui/tokens.css` 去掉 `@media (prefers-color-scheme: dark)` 触发，只保留 `.dark` / `[data-theme="dark"]` — 避免操作系统的深色设置污染设计预览。
2. `Chat.css` 里 `:root` 的 `--cht-*` 块改为引用 `--dux-*`，保留 `--cht-*` 作为**业务语义别名**，避免 1000 行 CSS 瞬间爆 diff。
   ```css
   --cht-text-primary:  var(--dux-color-text-primary);
   --cht-bubble-recv:   var(--dux-color-bg-surface);
   --cht-bubble-sent:   #168EF9;   /* IM 专属，暂不进 L1 */
   ```
3. 深色模式只在 `[data-theme="dark"]` 下覆写 IM 专属变量（bubble / link / wave / call-icon）；通用色走 `--dux-*` 的深色覆盖，自动继承。

**commit**：`4404b4f refactor(im): adopt Avatar primitive + align dark theme trigger`（含下一步）

---

### Phase 3 · 原子件接入

#### 3a · Avatar

- 给 `Avatar.css` 新增 IM 尺寸预设 `--36 / --44 / --56`（默认 xs/sm/md/lg/xl 不覆盖 IM 常用的 36 和 56 px）
- `Chat.jsx` 5 处 `<img>` 头像 → `<Avatar size="36">` / `<Avatar size="56">`
- `Messages.jsx` 消息列表行 / 故事头像 → `<Avatar>`，并去掉 `style={{ width: 56, height: 56 }}` 临时覆盖
- 删除冗余的 `.cht-nav__avatar` / `.cht-row__avatar` / `.msg-cell__avatar` / `.msg-story__avatar` 尺寸规则

#### 3b · Badge

已在 Messages.jsx 消费（会话未读数），无需再改。Divider / IconButton 在当前页面没有干净的适配点，推迟。

**commit**：同 `4404b4f`。

---

### Phase 4 · IM 分子抽取

#### 4a · Bubble 归位

`src/components/Bubble.jsx` → `src/components/im/Bubble.jsx`，确立 `src/components/im/` 为 L3 分子件仓库。

**commit**：`1c132d3 refactor(im): move Bubble into src/components/im/ namespace`

#### 4b · ConversationRow / ChatTopBar / InputBar

| 新建文件 | 来源 | 内部调用的 L2 |
|---------|------|-------------|
| `src/components/im/ConversationRow.jsx` | Messages.jsx 里的 `ConversationRow()` + `StreakBadge()` + `OnlineIndicator(cell)` | Avatar, Badge |
| `src/components/im/ChatTopBar.jsx` | Chat.jsx 里的 `ChatNavBar()` | Avatar |
| `src/components/im/InputBar.jsx` | Chat.jsx 里的 `ChatInputBar()` | (仅 SVG 图标) |

页面文件只保留组装：

```jsx
// Chat.jsx
<ChatStatusBar />
<ChatTopBar contactName={...} contactAvatar={...} onBack={...} onPreview={...} />
<ConversationFlow ... />
<QuickReplyChips />
<InputBar showKeyboard={...} onToggleKeyboard={...} />
<HomeIndicator />
```

**commit**：`a9b8c65 refactor(im): extract ConversationRow / ChatTopBar / InputBar molecules`

---

### 治理 · 决策树入 CLAUDE.md

把四层边界和决策流程固化到 `CLAUDE.md`，避免下次新需求又回到 Figma cut 路径：

```
新需求
  ↓
1. 有 L3？ → import 用
2. 能组合 L2？ → 新建 L3
3. 需要新通用能力？ → 与设计师确认 → 新建 L2
4. 业务高度特化不复用？ → 内联，但必须走 token，在审计文档记一行
```

**commit**：`3363e51 docs: add component-first decision tree to CLAUDE.md`

---

## 本轮 commit 汇总

```
3363e51 docs: add component-first decision tree to CLAUDE.md
a9b8c65 refactor(im): extract ConversationRow / ChatTopBar / InputBar molecules
1c132d3 refactor(im): move Bubble into src/components/im/ namespace
4404b4f refactor(im): adopt Avatar primitive + align dark theme trigger
```

---

## 收益对比

| 指标 | 改造前 | 改造后 |
|------|-------|-------|
| `src/components/im/` 分子件 | 1（Bubble，且路径错位） | 4（Bubble, ConversationRow, ChatTopBar, InputBar） |
| 页面里直接 `<img>` 做头像 | 6 处 | 0 |
| `.cht-* / .msg-*` 与 `--dux-*` 关系 | 各自独立的 hex | 别名引用，单一来源 |
| 深色模式触发 | OS 偏好污染 | 显式 `[data-theme="dark"]` |
| 新需求决策路径 | 口口相传 | CLAUDE.md 决策树 |

---

## 后续可继续的方向（未在本轮落地）

1. **StoryItem** 也可以抽成 L3（`MessageStoryItem`），目前还留在 Messages.jsx。
2. **IconButton L2 原子件**：Chat 顶栏/输入栏的 `cht-nav__action` / `cht-input-bar__icon-btn` 重复样式，值得沉淀。
3. **Divider 消费**：msg-bottom-bar 的 0.5 px 分隔线 / 时间戳两侧线可换成 `<Divider>`。
4. **`--cht-*` 别名清理**：当所有 L3 都搬走以后，别名层可以整体删除，统一走 `--dux-*`。
5. **BubblePreview 扩展**：做成 `/preview/<component>` 子路由，每个 L3 都有走查页。

这些都已记在 `docs/design-system-audit.md` 的 Phase 5 预留区或 CLAUDE.md 审查清单里，按需拾起。
