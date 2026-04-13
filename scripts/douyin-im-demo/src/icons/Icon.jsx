/**
 * Icon — Douyin Delight Icons 统一调用组件
 *
 * 用法：
 *   import Icon from '@/icons/Icon'
 *
 *   <Icon name="ic_s_s_home" size={24} variant="filled" color="var(--color-primary)" />
 *   <Icon name="ic_s_s_search" size={24} variant="outlined" />
 *   <Icon name="ic_s_s_close" size={16} variant="outlined" color="var(--text-secondary)" />
 *
 * Props:
 *   name     — 图标名，对应 src/icons/svg/ 文件名前缀，例如 "ic_s_s_home"
 *   size     — 12 | 16 | 20 | 24（默认 24）
 *   variant  — "outlined" | "filled" | "light"（默认 "outlined"）
 *   color    — CSS color 值或 CSS 变量（默认继承 currentColor）
 *   className — 额外 className
 *   style    — 额外 inline style
 */

import { useState, useEffect, useRef } from 'react'

// 动态导入 SVG（vite-plugin-svgr 提供 ?react 后缀）
// 使用 import.meta.glob 预加载所有图标，避免运行时逐个 fetch
const svgModules = import.meta.glob('./svg/*.svg', {
  query: '?react',
  import: 'default',
  eager: false,
})

function buildKey(name, size, variant) {
  return `./svg/${name}_${size}_${variant}.svg`
}

function findFallback(name, size, variant) {
  // 变体降级：filled → outlined → light
  const variantOrder = ['outlined', 'filled', 'light']
  // 尺寸降级：向上找最近的可用尺寸
  const sizeOrder = [size, 24, 20, 16, 12].filter((v, i, a) => a.indexOf(v) === i)

  for (const s of sizeOrder) {
    for (const v of [variant, ...variantOrder.filter(x => x !== variant)]) {
      const key = buildKey(name, s, v)
      if (key in svgModules) return key
    }
  }
  return null
}

export default function Icon({
  name,
  size = 24,
  variant = 'outlined',
  color,
  className,
  style,
  ...rest
}) {
  const [SvgComponent, setSvgComponent] = useState(null)
  const [error, setError] = useState(false)
  const mountedRef = useRef(true)

  useEffect(() => {
    mountedRef.current = true
    setError(false)
    setSvgComponent(null)

    const key = findFallback(name, size, variant)
    if (!key) {
      setError(true)
      return
    }

    svgModules[key]()
      .then((mod) => {
        if (mountedRef.current) setSvgComponent(() => mod)
      })
      .catch(() => {
        if (mountedRef.current) setError(true)
      })

    return () => { mountedRef.current = false }
  }, [name, size, variant])

  if (error) {
    // 占位，防止布局抖动
    return (
      <span
        className={className}
        style={{ display: 'inline-block', width: size, height: size, ...style }}
        aria-hidden="true"
        {...rest}
      />
    )
  }

  if (!SvgComponent) return null

  return (
    <SvgComponent
      width={size}
      height={size}
      className={className}
      style={{
        color: color ?? 'currentColor',
        flexShrink: 0,
        display: 'inline-block',
        verticalAlign: 'middle',
        ...style,
      }}
      aria-hidden="true"
      {...rest}
    />
  )
}
