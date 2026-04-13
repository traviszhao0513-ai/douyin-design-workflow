/**
 * export-icons.mjs
 *
 * 从 Figma「Douyin Delight Icons」批量导出 SVG 到 src/icons/svg/
 *
 * 用法：
 *   FIGMA_TOKEN=your_token node scripts/export-icons.mjs
 *
 * 获取 token：Figma → Settings → Security → Personal access tokens
 * （免费账号即可，不需要付费席位）
 *
 * 导出结果：src/icons/svg/{name}_{size}_{variant}.svg
 * 示例：ic_s_s_home_24_filled.svg
 */

import { mkdir, writeFile } from 'fs/promises'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const OUT_DIR = join(ROOT, 'src/icons/svg')

const FILE_KEY = 'ARvYQu8qBDaMF3312hSym3'
const TOKEN = process.env.FIGMA_TOKEN

if (!TOKEN) {
  console.error('❌ 缺少 FIGMA_TOKEN 环境变量')
  console.error('   用法: FIGMA_TOKEN=your_token node scripts/export-icons.mjs')
  process.exit(1)
}

const FIGMA_API = 'https://api.figma.com/v1'
const HEADERS = { 'X-Figma-Token': TOKEN }

// ─── 工具函数 ─────────────────────────────────────────────────────────────────

async function figmaGet(path) {
  const res = await fetch(`${FIGMA_API}${path}`, { headers: HEADERS })
  if (!res.ok) throw new Error(`Figma API ${res.status}: ${await res.text()}`)
  return res.json()
}

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms))
}

function chunk(arr, size) {
  const chunks = []
  for (let i = 0; i < arr.length; i += size) chunks.push(arr.slice(i, i + size))
  return chunks
}

// ─── 1. 遍历图标页面，收集所有 COMPONENT 节点 ─────────────────────────────────

// 需要导出的页面（只导出已完成的页面）
const ICON_PAGES = [
  { id: '0:1',   name: '通用图标' },
  { id: '461:2', name: '搜索图标' },
]

const icons = [] // { id, name, size, variant, filename }

for (const page of ICON_PAGES) {
  console.log(`📥 读取页面「${page.name}」...`)

  // 用 /nodes API 只拉对应页面，depth=2 足够（COMPONENT_SET → COMPONENT）
  const data = await figmaGet(`/files/${FILE_KEY}/nodes?ids=${encodeURIComponent(page.id)}&depth=2`)
  const pageNode = data.nodes[page.id]?.document

  if (!pageNode) {
    console.warn(`  ⚠️  页面 ${page.id} 不存在，跳过`)
    continue
  }

  let pageCount = 0
  for (const child of pageNode.children ?? []) {
    // 只处理 COMPONENT_SET（每个 set = 一个图标的多个变体）
    if (child.type !== 'COMPONENT_SET') continue

    const iconName = child.name // e.g. ic_s_s_home

    for (const component of child.children ?? []) {
      if (component.type !== 'COMPONENT') continue

      // 名称格式: "尺寸=24, 形状=filled"
      const sizeMatch   = component.name.match(/尺寸=(\d+)/)
      const variantMatch = component.name.match(/形状=(\w+)/)
      if (!sizeMatch || !variantMatch) continue

      const size    = sizeMatch[1]    // "24"
      const variant = variantMatch[1] // "filled" | "outlined" | "light"

      icons.push({
        id: component.id,
        name: iconName,
        size,
        variant,
        filename: `${iconName}_${size}_${variant}.svg`,
      })
      pageCount++
    }
  }

  console.log(`  ✅ 找到 ${pageCount} 个图标变体`)
  await sleep(200) // 避免限速
}

const uniqueIconCount = new Set(icons.map(i => i.name)).size
console.log(`\n📊 共 ${icons.length} 个图标变体（${uniqueIconCount} 个图标）`)

if (icons.length === 0) {
  console.error('❌ 未找到任何图标，请检查 Figma 文件权限或页面 ID')
  process.exit(1)
}

// ─── 2. 批量请求 SVG 导出 URL ─────────────────────────────────────────────────

await mkdir(OUT_DIR, { recursive: true })

const BATCH_SIZE = 100
const batches = chunk(icons, BATCH_SIZE)

let exported = 0
let failed   = 0

for (let i = 0; i < batches.length; i++) {
  const batch = batches[i]
  const ids   = batch.map(ic => ic.id).join(',')

  console.log(`🔄 批次 ${i + 1}/${batches.length}：请求 ${batch.length} 个 SVG URL...`)

  let imagesData
  try {
    imagesData = await figmaGet(
      `/images/${FILE_KEY}?ids=${encodeURIComponent(ids)}&format=svg&svg_include_id=false&svg_simplify_stroke=true`
    )
  } catch (err) {
    console.error(`  ❌ 批次 ${i + 1} URL 请求失败：${err.message}`)
    failed += batch.length
    await sleep(2000)
    continue
  }

  const urlMap = imagesData.images ?? {}

  // 并发下载 SVG 内容（每批内并发）
  await Promise.all(
    batch.map(async (icon) => {
      const url = urlMap[icon.id]
      if (!url) {
        console.warn(`  ⚠️  无 URL：${icon.filename}`)
        failed++
        return
      }

      try {
        const svgRes = await fetch(url)
        if (!svgRes.ok) throw new Error(`HTTP ${svgRes.status}`)
        const svg = await svgRes.text()
        await writeFile(join(OUT_DIR, icon.filename), svg, 'utf8')
        exported++
      } catch (err) {
        console.warn(`  ⚠️  下载失败：${icon.filename} — ${err.message}`)
        failed++
      }
    })
  )

  // 批次间稍作等待，避免触发 Figma 限速
  if (i < batches.length - 1) await sleep(600)
}

// ─── 3. 生成 manifest.json（图标索引） ───────────────────────────────────────

const manifest = {}
for (const icon of icons) {
  if (!manifest[icon.name]) manifest[icon.name] = {}
  if (!manifest[icon.name][icon.size]) manifest[icon.name][icon.size] = {}
  manifest[icon.name][icon.size][icon.variant] = icon.filename
}

await writeFile(
  join(ROOT, 'src/icons/manifest.json'),
  JSON.stringify(manifest, null, 2),
  'utf8'
)

// ─── 完成 ─────────────────────────────────────────────────────────────────────

console.log('')
console.log('═══════════════════════════════════════')
console.log(`✅ 导出完成：${exported} 个成功，${failed} 个失败`)
console.log(`📁 SVG 路径：src/icons/svg/`)
console.log(`📋 索引文件：src/icons/manifest.json`)
console.log('═══════════════════════════════════════')
