#!/bin/bash
# build_skill_zip.sh — 打包 douyin-im-design-system 安装包
# 用法：bash scripts/build_skill_zip.sh
# 输出：douyin-im-skill-YYYYMMDD.zip（在项目根目录）

set -u
set -o pipefail

PROJECT_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SCRIPTS_DIR="$PROJECT_ROOT/scripts"
SKILLS_DIR="$PROJECT_ROOT/skills"
STAMP="$(date '+%Y%m%d')"
OUTPUT_ZIP="$PROJECT_ROOT/douyin-im-skill-${STAMP}.zip"
BUILD_TMP="$(mktemp -d -t douyin_skill_build)"

log()     { echo "[INFO] $1"; }
log_ok()  { echo "[ OK ] $1"; }
log_err() { echo "[ERR ] $1" >&2; }

cleanup() { rm -rf "$BUILD_TMP"; }
trap cleanup EXIT

log "开始打包 douyin-im-skill-${STAMP}.zip ..."
log "临时目录：$BUILD_TMP"

# ─── 组织打包目录 ─────────────────────────────────────────────
mkdir -p "$BUILD_TMP"

cp "$SCRIPTS_DIR/setup_douyin_design_skill.sh"     "$BUILD_TMP/"
cp "$SCRIPTS_DIR/setup_douyin_design_skill.command" "$BUILD_TMP/"
chmod +x "$BUILD_TMP/setup_douyin_design_skill.sh"
chmod +x "$BUILD_TMP/setup_douyin_design_skill.command"

cp -r "$SKILLS_DIR/douyin-im-design-system" "$BUILD_TMP/"
cp -r "$SCRIPTS_DIR/douyin-im-demo"         "$BUILD_TMP/"

# ─── 验证关键文件 ─────────────────────────────────────────────
REQUIRED_FILES=(
  "$BUILD_TMP/setup_douyin_design_skill.sh"
  "$BUILD_TMP/setup_douyin_design_skill.command"
  "$BUILD_TMP/douyin-im-design-system/SKILL.md"
  "$BUILD_TMP/douyin-im-design-system/design-tokens.md"
  "$BUILD_TMP/douyin-im-design-system/components.md"
  "$BUILD_TMP/douyin-im-design-system/im-patterns.md"
  "$BUILD_TMP/douyin-im-design-system/.trae/rules/douyin-im-ds.md"
  "$BUILD_TMP/douyin-im-demo/src/App.jsx"
  "$BUILD_TMP/douyin-im-demo/package.json"
  "$BUILD_TMP/douyin-im-demo/README.md"
)

log "验证关键文件..."
MISSING_COUNT=0
for f in "${REQUIRED_FILES[@]}"; do
  if [ ! -e "$f" ]; then
    log_err "缺少：$f"
    MISSING_COUNT=$((MISSING_COUNT + 1))
  fi
done

if [ "$MISSING_COUNT" -gt 0 ]; then
  log_err "有 $MISSING_COUNT 个文件缺失，打包中止。"
  exit 1
fi
log_ok "所有关键文件验证通过。"

# ─── 打包 ─────────────────────────────────────────────────────
log "打包中..."
rm -f "$OUTPUT_ZIP"

(cd "$BUILD_TMP" && zip -qry "$OUTPUT_ZIP" \
  setup_douyin_design_skill.sh \
  setup_douyin_design_skill.command \
  douyin-im-design-system/ \
  douyin-im-demo/)

log_ok "打包完成：$OUTPUT_ZIP"

echo ""
echo "======== 包内容清单 ========"
(cd "$BUILD_TMP" && find . -type f | sort | sed 's|^\./||')
echo "============================"
echo ""
echo "文件大小：$(du -sh "$OUTPUT_ZIP" | cut -f1)"
echo "输出路径：$OUTPUT_ZIP"
echo ""
echo "分发说明："
echo "  设计师/PM：解压 zip，将 .sh 拖入 Terminal 回车运行"
echo "  RD 直接安装：npx skills add ./douyin-im-design-system --skill douyin-im-design-system -y -g"
