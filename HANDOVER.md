# 项目交接文档

## 项目概述

**项目名称**：抖音 IM 设计工作流（Douyin Design Workflow）

**仓库地址**：https://github.com/traviszhao0513-ai/douyin-design-workflow

**目标**：为抖音 IM 设计团队搭建一套 AI 辅助的设计工作流系统，让设计师能通过自然语言指令完成出图、原型、评审、分享等全流程工作。

**核心理念**：AI 提议 → 设计师调整 → AI 优化（人机协作，设计师始终拥有决策权）

---

## 项目背景

### 为什么做这个项目

传统设计工作流中，设计师需要在多个工具间切换（Figma、原型工具、版本管理、文档），且团队成员之间的设计规范难以统一。本项目通过以下方式解决这些问题：

1. **统一设计语言** — 120+ 语义化 Design Token，确保团队出图一致
2. **AI 辅助出图** — 通过 `/design` 命令，Claude 自动读取设计规范和组件库生成设计
3. **并行协作** — 基于 git worktree 的分支策略，多人互不干扰
4. **知识沉淀** — `/learn` 命令将团队偏好持久化，避免重复沟通

### 技术选型

| 项 | 选择 | 原因 |
|---|------|------|
| AI 工具 | Claude Code | 支持 MCP 工具链、可读写文件和 Figma |
| 设计工具 | Figma（通过 MCP） | 团队主力工具，MCP 可编程操作 |
| 原型预览 | React + Vite + Claude Preview | 可交互原型，支持本地和远程分享 |
| 版本管理 | Git worktree | 多分支并行，main 保持稳定 |
| 设计规范 | Markdown（design.md） | 纯文本，AI 可直接读取，受 Google Stitch 启发 |

---

## 四大支柱（SP1 - SP4）

本项目分四个子项目渐进落地：

### SP1：自学习设计系统（design.md）

**文件**：`design.md`（521 行）

包含：
- **品牌标识** — 抖音红 #FE2C55，克制/简洁/偏 iOS 风格
- **120+ 颜色 Token** — 全部支持 Light/Dark 双模式，从 Figma 文件提取
  - System 系统色（Primary / Success / Warning / Danger 等）
  - Text 文字色（8 级层次）
  - Background 背景色（68 个语义 token）
  - Line / Overlay / Link / Assist 等
- **字体系统** — PingFang SC + SF Pro Display，6 级字号
- **间距/圆角/阴影/动效/层级** — 完整 token 定义
- **组件映射** — 22 个组件族的场景推荐
- **页面构成模式** — Feed / Profile / Messages / Capture / VideoDetail
- **自学习协议** — `/learn` 显式沉淀 + 自动检测（≥3 次确认后提议沉淀）

### SP2：项目工作流（CLAUDE.md）

**文件**：`CLAUDE.md`（347 行）

包含：
- **角色定义** — Claude 作为高级产品设计师和设计系统搭档
- **工具路由** — Figma MCP（主力）→ Claude Preview（可用）→ Pencil / Chrome（备用）
- **命令系统** — `/design`、`/prototype`、`/flow`、`/review`、`/iterate` 等
- **设计师回环协议** — 5 步迭代循环，出图前检查清单
- **文档读取顺序** — CLAUDE.md → design.md → project_douyin_design_system.md → 组件库

### SP3：分支策略（Git Worktree）

- `main` 分支保存核心链路基座，长期稳定
- 每个设计需求通过 `/new-branch` 创建独立 worktree
- 多人并行工作，互不干扰
- 完成后通过 `/merge` 合并回 main
- `.worktrees/` 目录本地独立，不提交到仓库

### SP4：分享与导出

- **开发阶段** — Claude Preview 启动本地服务，同网可访问
- **评审阶段** — `npm run build` 生成静态版本，部署到 GitHub Pages / Vercel / 内部平台
- `/share` 命令自动选择最佳分享方式（Preview URL / Figma URL / 截图）

---

## 仓库结构

```
douyin-design-workflow/
├── CLAUDE.md                        ← 项目规则 & 工作流（AI 读取入口）
├── design.md                        ← 设计系统规范（120+ token）
├── project_douyin_design_system.md  ← 组件库入口和复用规则
├── ONBOARDING.md                    ← 团队成员快速上手指南
├── HANDOVER.md                      ← 本文件
├── .claude/settings.json            ← 共享权限配置（clone 即生效）
├── package.json                     ← React + Vite 依赖
├── vite.config.js                   ← Vite 配置
├── index.html                       ← 入口 HTML
│
├── Douyin_design_system/            ← 抖音组件库（内置，无需额外配置）
│   ├── tokens.json                  ← Design Token 定义
│   ├── tailwind.config.ts           ← Tailwind 配置
│   └── ui/
│       ├── components/              ← 22 个组件族
│       │   ├── ActionBar/
│       │   ├── Actionsheets/
│       │   ├── Avatar/
│       │   ├── Badge/
│       │   ├── BottomNav/
│       │   ├── Button/
│       │   ├── Card/
│       │   ├── Checkbox/
│       │   ├── Divider/
│       │   ├── Form/
│       │   ├── Input/
│       │   ├── List/
│       │   ├── Modal/
│       │   ├── PushNotification/
│       │   ├── Radio/
│       │   ├── Select/
│       │   ├── Skeleton/
│       │   ├── Tabs/
│       │   ├── Toast/
│       │   ├── Toggle/
│       │   ├── Tooltip/
│       │   └── VideoCard/
│       ├── tokens.css               ← CSS Token 变量
│       ├── index.ts                 ← 组件导出入口
│       └── figma.connect.ts         ← Figma Code Connect
│
└── src/                             ← 核心链路代码（React/Vite）
    ├── App.jsx                      ← 路由和布局
    ├── main.jsx                     ← 入口
    ├── styles.css                   ← 全局样式
    ├── pages/                       ← 5 个核心页面
    │   ├── Feed.jsx                 ← 首页/视频流
    │   ├── Messages.jsx             ← IM 消息（重点扩展）
    │   ├── UserProfile.jsx          ← 个人主页
    │   ├── Capture.jsx              ← 拍摄入口
    │   └── VideoDetail.jsx          ← 视频详情
    └── shared/                      ← 共享组件
        ├── NavBar.jsx
        ├── StatusBar.jsx
        └── TabBar.jsx
```

---

## 如何使用

### 首次安装（3 步）

```bash
# 1. Clone
git clone https://github.com/traviszhao0513-ai/douyin-design-workflow.git
cd douyin-design-workflow
npm install

# 2. 在 Claude Code 中连接 Figma MCP

# 3. 开始工作
# /new-branch 你的需求名
# /design 你的设计描述
```

### 日常工作流

```
/new-branch 消息置顶          ← 创建需求分支
/design 消息置顶的交互设计     ← AI 出图
                              ← 设计师在 Figma 中调整
/iterate [figma-url]          ← AI 读取修改，提出优化
/diff                         ← 查看变更
/share                        ← 分享给团队
/merge                        ← 合并回 main
```

### 全部命令

| 类别 | 命令 | 功能 |
|------|------|------|
| 设计 | `/design [描述]` | 读取设计系统 → Figma 出图 |
| 设计 | `/prototype [描述]` | 生成可交互 React 原型 |
| 设计 | `/flow [描述]` | 生成流程图（FigJam） |
| 设计 | `/tokens [查询]` | 搜索 token 或组件 |
| 评审 | `/review [url]` | 截图分析，输出问题和建议 |
| 评审 | `/iterate [url]` | 读取修改，对比优化 |
| 分支 | `/new-branch [名称]` | 创建 worktree 需求分支 |
| 分支 | `/switch [名称]` | 切换分支 |
| 分支 | `/diff` | 查看增量变更 |
| 分支 | `/merge` | 合并回 main |
| 分支 | `/list-branches` | 列出活跃分支 |
| 系统 | `/learn [反馈]` | 沉淀团队偏好 |
| 系统 | `/share` | 导出设计结果 |

---

## 关键文档读取顺序

Claude 在每次设计任务前按以下顺序读取：

```
1. CLAUDE.md          ← 规则和命令
2. design.md          ← Token 和设计规范
3. project_douyin_design_system.md  ← 组件复用规则
4. ./Douyin_design_system/ui/components/  ← 实际组件代码
5. memory/team_style_preferences.md      ← 团队偏好（跨会话）
```

---

## 设计原则

| 优先级 | 原则 | 说明 |
|--------|------|------|
| 1 | 清晰度 | 信息层级清晰，一屏一焦点 |
| 2 | 信息密度 | 高密度但可读，关键信息一眼可扫 |
| 3 | 无障碍 | 深浅色适配，触控目标 ≥ 44pt |
| 4 | 愉悦感 | 克制的动效反馈，不做炫技 |
| 5 | 新颖度 | 复用优先，创新有理由 |

---

## 待后续补充

- [ ] IM 详细模式（对话列表、聊天详情、群聊、系统通知）的页面模式
- [ ] 更多 IM 场景的组件映射
- [ ] 迁移到内部 Git 平台
- [ ] Figma 团队库与 design.md 的双向同步

---

## 联系人

如有疑问，请联系项目创建者或查看 `ONBOARDING.md` 快速上手指南。
