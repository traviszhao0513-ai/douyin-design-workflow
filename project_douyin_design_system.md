# Project Douyin Design System

## Role / 角色

This file is the Douyin design-system entrypoint and compatibility alias for this repository.

这个文件是当前仓库的抖音设计系统入口文档，同时也是兼容别名。

It is not the primary design-input document.

它不是默认出图的主文档。

For visual work in this repository, the default reading order is:
1. `design.md`
2. `project_douyin_design_system.md`
3. `<DOUYIN_COMPONENTS>/ui/components/`（路径在 CLAUDE.md 的 Component Library Path 中定义）

---

## Source of Truth / 真实来源

Default local component source directory:
`<DOUYIN_COMPONENTS>/ui/components/`（路径在 CLAUDE.md 的 Component Library Path 中定义）

This directory is the authoritative source for what components actually exist.

这个目录才是当前可用组件的真实来源。

---

## Available Component Families / 当前可用组件族

- `ActionBar`
- `Actionsheets`
- `Avatar`
- `Badge`
- `BottomNav`
- `Button`
- `Card`
- `Checkbox`
- `Divider`
- `Form`
- `Input`
- `List`
- `Modal`
- `PushNotification`
- `Radio`
- `Select`
- `Skeleton`
- `Tabs`
- `Toast`
- `Toggle`
- `Tooltip`
- `VideoCard`

---

## Reuse Rule / 复用规则

- Reuse existing local components first
- Compose existing components second
- Create new structures only as fallback

默认原则：
- 先复用
- 再组合
- 最后才新建

---

## Recommended Mapping / 推荐映射

- `BottomNav` → bottom tab navigation
- `VideoCard` → feed/video content blocks
- `Button` → CTA hierarchy and actions
- `Card` / `List` → structured content sections
- `Avatar` / `Badge` → identity and status presentation
- `Actionsheets` / `Modal` / `Toast` → mobile feedback and action flows

---

## Fallback Policy / 兜底策略

If no existing component directly matches a requested UI:
1. first combine multiple local components
2. then use the `douyin-design-system` skill as a fallback
3. then use Figma/design generation tools if needed
4. clearly state when the output extends beyond the current local component library

---

## Relationship to `design.md`

- `design.md` defines the default visual generation contract
- `project_douyin_design_system.md` defines the local Douyin design-system source and reuse policy
- the component directory provides the real component inventory

换句话说：
- `design.md` 负责“应该怎么出图”
- `project_douyin_design_system.md` 负责“默认用哪套设计系统”
- 本地组件目录负责“实际上有什么组件可用”
