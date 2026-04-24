/**
 * IM 装饰 SVG 组件入口
 *
 * 所有 SVG 通过 vite-plugin-svgr 的 `?react` 后缀转成 React 组件。
 * 单色 icon 的 fill / stroke 已统一替换为 currentColor，
 * 组件挂载到哪里就从父级 CSS 的 `color:` 属性继承颜色，自动跟随 light / dark 主题。
 *
 * 彩色 icon（ring-active 渐变、story-add-bg / story-add-icon 绿色、online 绿盘等）
 * 保留原色；其中 stroke = white 的外圈被改成 currentColor，
 * 以便外圈在深浅色下与页面背景保持一致（父级 color 给 var(--BGPage)）。
 */
import MenuIcon         from './menu.svg?react'
import SearchIcon       from './search.svg?react'
import AddIcon          from './add.svg?react'
import RingActiveIcon   from './ring-active.svg?react'
import RingMutedIcon    from './ring-muted.svg?react'
import StoryAddBgIcon   from './story-add-bg.svg?react'
import StoryAddPlusIcon from './story-add-icon.svg?react'
import OnlineStoryIcon  from './online-story.svg?react'
import OnlineCellIcon   from './online-cell.svg?react'
import MuteIcon         from './mute.svg?react'
import CaptureTabIcon   from './capture-tab.svg?react'

export {
  MenuIcon,
  SearchIcon,
  AddIcon,
  RingActiveIcon,
  RingMutedIcon,
  StoryAddBgIcon,
  StoryAddPlusIcon,
  OnlineStoryIcon,
  OnlineCellIcon,
  MuteIcon,
  CaptureTabIcon,
}
