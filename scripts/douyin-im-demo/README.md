# 抖音 IM Design System — Demo 项目

基于抖音 Delight 设计系统的 React/Vite 演示项目，包含核心页面的完整实现。

## 快速启动

```bash
npm install
npm run dev
# → 打开 http://localhost:5173
```

## 页面列表

| 页面 | 文件 | 说明 |
|------|------|------|
| 首页 Feed | `src/pages/Feed.jsx` | 视频流 |
| 消息列表 | `src/pages/Messages.jsx` | 会话列表（IM 入口） |
| 聊天页 | `src/pages/Chat.jsx` | IM 对话详情 |
| 个人主页 | `src/pages/UserProfile.jsx` | 账号展示与内容网格 |
| 视频详情 | `src/pages/VideoDetail.jsx` | 播放 + 评论 |
| 气泡走查 | `src/pages/BubblePreview.jsx` | 消息气泡组件预览 |
| 拍摄页 | `src/pages/Capture.jsx` | 创作入口 |

## 如何新增页面

1. 在 `src/pages/` 新建 `YourPage.jsx`
2. 在 `src/App.jsx` 的 `screens` 对象中注册：
   ```js
   yourpage: YourPage,
   ```
3. 在 `screenMeta` 中添加标题：
   ```js
   yourpage: { title: '你的页面', subtitle: '说明' },
   ```

## 如何使用组件库

```jsx
import Button from './Douyin_design_system/ui/components/Button'
import Avatar from './Douyin_design_system/ui/components/Avatar'
import Toast  from './Douyin_design_system/ui/components/Toast'
```

组件列表：Avatar / Button / Badge / List / Tabs / BottomNav / Modal / Toast / Actionsheets / Input / Skeleton / Card / Checkbox / Radio / Toggle / Divider / Tooltip / PushNotification / VideoCard / Select / Form / ActionBar

## 触发 Skill

在 AI 工具中输入：

```
/douyin-im-design-system 做一个...
```

或直接说：「用抖音设计系统帮我做一个...」

## 技术栈

- React 18 + Vite
- 抖音 Delight 设计系统（`Douyin_design_system/`）
- CSS Modules + 内联样式（Token 驱动）
