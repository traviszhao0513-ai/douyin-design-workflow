# Onboarding / 快速上手指南

本指南帮助新成员在 10 分钟内完成设计工作流的配置。

---

## 1. Clone & Install

```bash
git clone <repo-url> design-p
cd design-p
npm install
```

Clone 后你将自动获得：
- `CLAUDE.md` — 项目规则和工作流命令
- `design.md` — 设计系统规范（120+ token，Light/Dark）
- `project_douyin_design_system.md` — 组件库入口
- `Douyin_design_system/` — 组件库（已内置，无需额外配置）
- `.claude/settings.json` — 共享权限配置

---

## 2. 连接 MCP 工具

### Figma MCP（必须）
1. 在 Claude Code 中连接 Figma MCP
2. 验证连接：在对话中输入"搜索 Button 组件"，应返回搜索结果

### Claude Preview（可选）
- 用于启动本地 React 原型预览
- 连接方式见 Claude Code 文档

---

## 3. 开始工作

### 创建需求分支
```
/new-branch 消息置顶
```
这会从 main 创建 `feature/消息置顶` 的 git worktree，在 `.worktrees/` 下生成独立工作目录。

### 开始设计
```
/design 消息置顶功能的交互设计
```
Claude 会自动读取 design.md → 组件库 → 在 Figma 中出图。

### 查看变更
```
/diff
```

### 分享设计
```
/share
```

### 完成后合并
```
/merge
```

---

## 可用命令速查

| 命令 | 功能 |
|------|------|
| `/design [描述]` | 读取设计系统 → 在 Figma 中出图 |
| `/prototype [描述]` | 生成可交互 React 原型 |
| `/flow [描述]` | 生成流程图 |
| `/tokens [查询]` | 搜索 token 或组件 |
| `/review [url]` | 分析设计并给出建议 |
| `/iterate [url]` | 读取修改，对比优化 |
| `/new-branch [名称]` | 创建需求分支 |
| `/switch [名称]` | 切换分支 |
| `/diff` | 查看增量变更 |
| `/merge` | 合并回 main |
| `/share` | 导出分享链接 |
| `/learn [反馈]` | 沉淀团队偏好 |

---

## 目录结构

```
design-p/
├── CLAUDE.md                       ← 项目规则 & 工作流
├── design.md                       ← 设计系统规范
├── project_douyin_design_system.md ← 组件库入口
├── ONBOARDING.md                   ← 本文件
├── .claude/settings.json           ← 共享权限配置
├── package.json                    ← React/Vite 依赖
├── src/                            ← 核心链路代码
│   ├── App.jsx
│   ├── pages/                      ← Feed/Messages/Profile 等
│   └── shared/                     ← NavBar/StatusBar/TabBar
└── .worktrees/                     ← 你的需求分支（本地，不提交）
```

---

## 注意事项

1. **不要直接在 main 上改代码** — 始终用 `/new-branch` 创建分支
2. **design.md 和 CLAUDE.md 只在 main 上修改** — 所有分支共享
3. **每个 worktree 需要独立 `npm install`** — 首次创建后执行一次
4. **.worktrees/ 不会被提交** — 每人本地独立，互不影响
5. **出图前 Claude 会自动检查** — design.md → 组件库 → 团队偏好

---

## 遇到问题？

- MCP 连接失败 → 重启 Claude Code，重新连接 Figma MCP
- 组件找不到 → 检查 CLAUDE.md 中的组件库路径是否正确
- 预览启动失败 → 在 worktree 目录中执行 `npm install`
