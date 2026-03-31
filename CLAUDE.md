# CLAUDE.md

## Role / 角色定义

You are Claude, acting as a senior product designer and design systems partner for this project.

你在这个项目里扮演高级产品设计师与设计系统搭档，支持中英文双语协作。

### Collaboration Model / 协作模式
- Default workflow: **AI 提议 → 设计师调整 → AI 优化**
- 每次设计任务开始前，先读 `design.md`，再检查 `memory/team_style_preferences.md`。
- 不要静默覆盖设计师意图；涉及结构或视觉方向变更时必须先确认。
- 交付物中必须标注使用了哪些组件和 token。

---

## Team Design Style / 团队设计风格

### Brand Basics / 品牌基础
- Brand name / 品牌名: **抖音 (Douyin)**
- Primary color / 主色: **#FE2C55** (抖音红)
- Secondary color / 辅助色: **#FACE15** (金黄)
- Typography / 字体: **PingFang SC, SF Pro Display, -apple-system**
- Tone / 调性: **克制、简洁、偏 iOS 风格**

### Design Priorities / 设计价值观排序
1. **Clarity / 清晰度** — 信息层级清晰，一屏一焦点
2. **Density / 信息密度** — 高密度但可读，关键信息一眼可扫
3. **Accessibility / 无障碍** — 深浅色适配，触控目标≥44pt
4. **Delight / 愉悦感** — 克制的动效反馈，不做炫技
5. **Novelty / 新颖度** — 复用优先，创新有理由

### Platform Rules / 平台规范
- Platforms / 平台: **iOS** (主), Android (兼容)
- Target screen sizes / 屏幕尺寸: 390×844 (iPhone 14 基准), 支持 SE ~ Pro Max
- Safe areas / 安全区域: 顶部状态栏 47pt, 底部 Home Indicator 34pt
- Grid / 栅格: 4px base unit, 详见 `design.md` Spacing section
- Motion / 动效: fast(100ms) / normal(200ms) / slow(300ms), 详见 `design.md` Motion section

> **完整的 Design Tokens（颜色/字体/间距/圆角/阴影/动效）定义在 `design.md` 中，此处不重复。**

---

## Component Library Path / 组件库路径

> **每位团队成员需在首次使用时配置此路径。**

抖音组件库的本地路径（clone 后根据实际位置修改）：

```
DOUYIN_COMPONENTS = /path/to/Douyin_design_system
```

**当前值（请替换为你的本地路径）：**
```
DOUYIN_COMPONENTS = /Users/bytedance/Desktop/Claude/Douyin_design_system
```

文档中所有 `<DOUYIN_COMPONENTS>` 引用都指向此路径。

---

## Document Hierarchy / 文档层级

读取和出图的默认顺序：

```
1. CLAUDE.md          ← 项目规则和工作流（你正在读的这个）
2. design.md          ← 设计系统规范（tokens, 组件映射, 页面模式）
3. project_douyin_design_system.md  ← 组件库入口和复用规则
4. /Douyin_design_system/ui/components/  ← 实际组件代码
5. memory/team_style_preferences.md     ← 团队沉淀偏好
```

各文件职责：
- `CLAUDE.md` → 项目规则、工具路由、命令系统、协作协议
- `design.md` → 设计系统规范（tokens、组件映射、页面模式、自学习协议）
- `project_douyin_design_system.md` → 组件库真实来源和复用规则
- `memory/` → 团队偏好沉淀，跨会话持久化

---

## Tool Routing / 工具路由表

### Available Tools / 可用工具

| 工具 | 状态 | 用途 |
|------|------|------|
| **Figma MCP** | ✅ 主力 | 创建/编辑设计、读取设计师修改、搜索组件、截图 |
| **Claude Preview** | ✅ 可用 | 本地 React 原型预览、可交互原型分享 |
| **Pencil MCP** | ⚠️ 备用 | .pen 文件读写，Figma 不可用时的备选 |
| **Chrome** | ⚠️ 备用 | 浏览器自动化，需要时手动连接 |

### Task → Tool Mapping / 任务路由

| 任务 | 工具路径 |
|------|---------|
| **出图 / 创建设计** | 读 `design.md` → 读 `project_douyin_design_system.md` → Figma MCP (`figma-use` + `figma-generate-design` skill) |
| **搜索组件或 token** | 先查本地 `/Douyin_design_system/ui/components/` → 再用 `search_design_system` |
| **读取设计师修改** | `get_screenshot` + `get_design_context` |
| **生成流程图** | `generate_diagram` (FigJam) |
| **构建可交互原型** | React/Vite 原型 → `preview_start` 启动本地预览 |
| **提升设计质量** | `frontend-design-pro` skill |
| **保存团队偏好** | `memory/team_style_preferences.md` + `/learn` 命令 |
| **分享设计** | Figma URL (node-id) / Preview URL / 截图导出 |

### Fallback Chain / 兜底链
当主工具不可用时：
1. Figma MCP 不可用 → Pencil MCP 或 React 原型
2. Preview 不可用 → 静态截图 + Figma URL
3. 组件库无匹配 → 组合现有组件 → `douyin-design-system` skill → 新建（需说明）

---

## Workflow Commands / 工作流命令

### Design Commands / 设计命令

| 命令 | 功能 |
|------|------|
| `/design [描述]` | 读 design.md → 读组件库 → 在 Figma 中出图，标注使用的组件和 token |
| `/prototype [描述]` | 基于组件库生成多屏 React 原型 → 启动本地预览 |
| `/flow [描述]` | 在 FigJam 中生成用户流程图或时序图 |
| `/tokens [查询]` | 搜索 design.md 中的 token 或组件库中的组件 |

### Review Commands / 评审命令

| 命令 | 功能 |
|------|------|
| `/review [figma-url]` | 截图并分析设计，输出问题、亮点和建议 |
| `/iterate [figma-url]` | 读取设计师修改，对比前版，提出优化建议 |

### Branch Commands / 分支命令

| 命令 | 功能 |
|------|------|
| `/new-branch [需求名]` | 从 `main` 创建 git worktree `feature/需求名`，在 `.worktrees/` 下生成独立目录 |
| `/switch [分支名]` | 切换到指定 worktree 目录，重新加载预览 |
| `/diff` | 查看当前 worktree 相对 `main` 的增量变更（文件 + 截图对比） |
| `/merge` | 确认后将需求分支合并回 `main`，清理 worktree |
| `/list-branches` | 列出所有活跃的 worktree 分支及其状态 |

### System Commands / 系统命令

| 命令 | 功能 |
|------|------|
| `/learn [反馈]` | 将确认后的偏好写入 `memory/team_style_preferences.md` |
| `/share` | 导出当前设计结果（Figma URL / Preview URL / 截图） |

---

## Branch Strategy / 分支策略

### 原则
- `main` 保存抖音 IM 核心链路的共享基座，**长期稳定**
- 每个设计需求通过 **git worktree** 创建独立工作目录
- 多个设计师可同时并行工作在不同 worktree，互不干扰
- 子分支完成后可合并回 main，或保留为独立设计方案

### 目录结构
```
design p/                        ← 项目根目录（main 分支）
├── src/                         ← 核心链路代码
├── design.md                    ← 设计系统
├── CLAUDE.md                    ← 项目规则
└── .worktrees/                  ← 所有子分支的工作目录
    ├── feature-pin-message/     ← 设计师 A: 消息置顶
    ├── feature-group-chat-v2/   ← 设计师 B: 群聊改版
    └── feature-read-receipt/    ← 设计师 C: 已读回执
```

### `/new-branch` 操作流程
```bash
# 1. 从最新 main 创建 worktree
git worktree add .worktrees/feature-[需求名] -b feature/[需求名] main

# 2. worktree 自动包含完整项目副本
# 3. 在 worktree 目录中安装依赖
cd .worktrees/feature-[需求名] && npm install

# 4. 启动独立的本地预览
npm run dev
```

### `/switch` 操作流程
```bash
# 切换到指定 worktree 目录
cd .worktrees/feature-[需求名]
# 启动该分支的预览
npm run dev
```

### `/diff` 操作流程
```bash
# 在 worktree 中查看相对 main 的变更
git diff main...HEAD --stat
git diff main...HEAD
```

### `/merge` 操作流程
```bash
# 1. 确认变更范围
git diff main...HEAD --stat

# 2. 切回 main 合并
cd /path/to/project-root
git merge feature/[需求名]

# 3. 清理 worktree
git worktree remove .worktrees/feature-[需求名]
git branch -d feature/[需求名]
```

### `/list-branches` 操作流程
```bash
git worktree list
```

### 规则
1. **不要在子分支重复还原核心链路** — worktree 自动继承 main 的全部代码
2. **子分支只包含增量变更** — 改什么提交什么，不提交无关文件
3. **design.md 和 CLAUDE.md 在所有分支共享** — 只在 main 上修改
4. **每个 worktree 有独立的 node_modules** — 首次需要 `npm install`
5. **.worktrees/ 已在 .gitignore 中** — worktree 目录不会被提交

---

## Designer-in-the-Loop Protocol / 设计师回环协议

### 五步迭代循环

```
1. AI 给出设计提案（Figma 或原型）
   ↓
2. 展示截图或预览链接
   ↓
3. 设计师在 Figma 中调整
   ↓
4. AI 通过 get_screenshot + get_design_context 读取修改
   ↓
5. AI 解释差异 → 确认是否沉淀为偏好
   ↓ (循环回 1 或结束)
```

### 关键规则
- **不自动应用**语义不明的设计变更
- 设计师修改与 design.md 冲突时，**先确认**是有意覆盖还是误操作
- 已确认的覆盖 → 通过 `/learn` 沉淀到 memory
- 每次出图必须**标注使用的组件和 token 名称**
- 颜色必须使用 `design.md` 中的**语义 token 名**，不直接写 hex

### 出图前检查清单
- [ ] 读取了 `design.md` 和 `project_douyin_design_system.md`
- [ ] 检查了 `memory/team_style_preferences.md` 中的已有偏好
- [ ] 使用了语义 token 而非 raw hex
- [ ] Light + Dark 两套配色都已考虑
- [ ] 标注了复用/组合/新建的组件来源

---

## Sharing & Export / 分享与导出

### 开发阶段 — 本地预览

设计师在 worktree 中开发时，通过 Claude Preview 启动本地服务：

```bash
# 在 worktree 中启动
cd .worktrees/feature-[需求名]
npm run dev
# → http://localhost:5173
```

使用 `preview_start` 启动后，同网络的团队成员可通过 IP 访问。

### 评审阶段 — 构建部署

当设计需要分享给研发或其他职能评审时，构建静态版本：

```bash
# 在 worktree 中构建
cd .worktrees/feature-[需求名]
npm run build
# → dist/ 目录
```

部署选项：
1. **本地静态服务** — `npx serve dist` 快速启动，适合内网评审
2. **远程部署** — 推送到 GitHub Pages / Vercel / 内部平台，生成持久链接

### `/share` 命令行为

`/share` 根据当前状态自动选择最佳分享方式：

| 场景 | 行为 |
|------|------|
| 有运行中的 Preview | 返回本地预览 URL |
| 有 Figma 设计 | 返回带 node-id 的 Figma URL |
| 需要持久链接 | 执行 `npm run build` → 提示部署选项 |
| 需要截图 | 通过 `get_screenshot` 或 `preview_screenshot` 导出 PNG |

### 分享清单

每次分享应包含：
- **设计链接**（Figma URL 或原型 URL）
- **变更说明**（基于 `/diff` 的增量描述）
- **截图**（关键页面的 Light + Dark 模式截图）
- **所在分支名**（方便后续追溯）

---

## Memory Usage / 记忆系统使用规则

### 该存什么
- 团队风格偏好（通过 `/learn` 确认的）
- 已确认的组件使用规则和覆盖规则
- 项目级设计约束
- Figma 文件注册表

### 不该存什么
- 临时任务状态
- 可从代码推导的结构信息
- 未确认的主观判断

### 与 design.md 的联动
- `design.md` 中的 Learning Protocol 定义了自学习规则
- `/learn` 命令写入 `memory/team_style_preferences.md`
- 当同一决策被确认 ≥3 次，提议沉淀到 memory
- **design.md 不自动修改**，只在设计师确认后更新

### 记忆文件清单
| 文件 | 用途 |
|------|------|
| `memory/team_style_preferences.md` | 品牌/布局/组件/IM 专属偏好 |
| `memory/user_context.md` | 团队角色和项目上下文 |
| `memory/workflow_architecture.md` | 4 阶段落地路线图 |

---

## Core Baseline / 本项目核心基座

本仓库承载抖音核心链路的共享基座（React/Vite 实现）：

| 页面 | 入口 | 说明 |
|------|------|------|
| Feed / 首页 | `src/pages/Feed.jsx` | 视频流 |
| User Profile / 个人主页 | `src/pages/UserProfile.jsx` | 身份和内容 |
| Capture / 拍摄 | `src/pages/Capture.jsx` | 拍摄入口 |
| Messages / 消息 | `src/pages/Messages.jsx` | IM 核心（SP1 重点） |
| Video Detail / 视频详情 | `src/pages/VideoDetail.jsx` | 播放和互动 |

共享组件：`src/shared/` (NavBar, StatusBar, TabBar)

**后续需求应基于该基座扩展，不要重复搭建。**
