#!/bin/bash

set -u
set -o pipefail

# ─── 颜色输出 ──────────────────────────────────────────────────
COLOR_RESET=""
COLOR_INFO=""
COLOR_WARN=""
COLOR_ERROR=""
COLOR_OK=""

if [ -t 1 ] && command -v tput >/dev/null 2>&1; then
  COLOR_RESET="$(tput sgr0)"
  COLOR_INFO="$(tput setaf 6)"
  COLOR_WARN="$(tput setaf 3)"
  COLOR_ERROR="$(tput setaf 1)"
  COLOR_OK="$(tput setaf 2)"
fi

log()       { printf '%b[%s] [INFO] %s%b\n' "$COLOR_INFO"  "$(date '+%Y-%m-%d %H:%M:%S')" "$1" "$COLOR_RESET"; }
log_ok()    { printf '%b[%s] [ OK ] %s%b\n' "$COLOR_OK"    "$(date '+%Y-%m-%d %H:%M:%S')" "$1" "$COLOR_RESET"; }
log_warn()  { printf '%b[%s] [WARN] %s%b\n' "$COLOR_WARN"  "$(date '+%Y-%m-%d %H:%M:%S')" "$1" "$COLOR_RESET"; }
log_error() { printf '%b[%s] [ERR ] %s%b\n' "$COLOR_ERROR" "$(date '+%Y-%m-%d %H:%M:%S')" "$1" "$COLOR_RESET"; }

# ─── 路径配置（阶段 C 只需改 SKILL_SOURCE 为 git URL）─────────
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
SKILL_SOURCE="$SCRIPT_DIR/douyin-im-design-system"
DEMO_SOURCE="$SCRIPT_DIR/douyin-im-demo"

# ─── 状态标志 ─────────────────────────────────────────────────
SKILL_PERMISSION_ISSUE=0
DEMO_INSTALL_FAILED=0
TRAE_CONFIGURED=0
demo_dest=""

# ─── 弹窗工具函数 ─────────────────────────────────────────────
show_error_dialog() {
  /usr/bin/osascript -e "display dialog \"$1\" with title \"抖音 Design Skill 安装\" buttons {\"知道了\"} default button \"知道了\" with icon stop" 2>/dev/null || true
}

show_final_dialog() {
  /usr/bin/osascript -e "display dialog \"$1\" with title \"抖音 Design Skill\" buttons {\"知道了\"} default button \"知道了\"" 2>/dev/null || true
}

choose_directory() {
  /usr/bin/osascript -e "POSIX path of (choose folder with prompt \"请选择 Demo 项目存放目录：\")" 2>/dev/null
}

# ─── ① 环境检查 ───────────────────────────────────────────────
log "检查运行环境..."

MISSING=""
command -v node >/dev/null 2>&1 || MISSING="${MISSING}• Node.js (https://nodejs.org)\n"
command -v npx  >/dev/null 2>&1 || MISSING="${MISSING}• npx（随 Node.js 安装）\n"
command -v git  >/dev/null 2>&1 || MISSING="${MISSING}• Git (https://git-scm.com)\n"

if [ -n "$MISSING" ]; then
  log_error "缺少以下依赖，请先安装后重试："
  printf '%b' "$MISSING"
  show_error_dialog "缺少以下依赖，请先安装后重试：\n\n${MISSING}\n安装完成后再运行此脚本。"
  exit 1
fi

log_ok "环境检查通过：node / npx / git 均已安装。"

# 验证 skill 目录存在
if [ ! -d "$SKILL_SOURCE" ]; then
  log_error "未找到 skill 目录：$SKILL_SOURCE"
  show_error_dialog "未找到 douyin-im-design-system 目录。\n\n请确认脚本和 skill 目录在同一文件夹中。"
  exit 1
fi

# ─── ② 安装 Skill ─────────────────────────────────────────────
log "开始安装 douyin-im-design-system skill..."

is_permission_issue() {
  echo "$1" | grep -Eqi "permission denied|EACCES|EPERM|Operation not permitted|not writable|requires elevated|sudo:|not in the sudoers|authentication failed"
}

install_skill() {
  local output_file
  local output_text
  local admin_password

  output_file="$(mktemp -t skill_install_log)"

  log "尝试 sudo 全局安装..."
  admin_password="$(/usr/bin/osascript -e 'text returned of (display dialog "请输入本机管理员密码，用于全局安装 douyin-im-design-system skill：" with title "抖音 Design Skill 安装" default answer "" with hidden answer buttons {"取消", "继续"} default button "继续")' 2>/dev/null || echo "")"

  if [ -z "$admin_password" ]; then
    log_warn "未输入管理员密码，跳过 sudo 安装，尝试用户目录安装。"
    SKILL_PERMISSION_ISSUE=1
  else
    if printf '%s\n' "$admin_password" | sudo -S -k -p "" npx skills add "$SKILL_SOURCE" --skill douyin-im-design-system -y -g 2>&1 | tee "$output_file"; then
      rm -f "$output_file" 2>/dev/null || true
      log_ok "Skill 全局安装成功。"
      return 0
    fi
    output_text="$(cat "$output_file")"
    if is_permission_issue "$output_text"; then
      SKILL_PERMISSION_ISSUE=1
    fi
    log_warn "sudo 安装失败，尝试用户目录安装..."
  fi

  # 回退：用户目录安装
  mkdir -p "$HOME/.npm-global/bin"
  if env npm_config_prefix="$HOME/.npm-global" npx skills add "$SKILL_SOURCE" --skill douyin-im-design-system -y -g 2>&1 | tee "$output_file"; then
    log_ok "Skill 已安装到用户目录：$HOME/.npm-global"
    log_warn "如需长期使用，请将 $HOME/.npm-global/bin 加入 PATH。"
    rm -f "$output_file" 2>/dev/null || true
    return 0
  fi

  output_text="$(cat "$output_file")"
  if is_permission_issue "$output_text"; then
    SKILL_PERMISSION_ISSUE=1
  fi

  rm -f "$output_file" 2>/dev/null || true
  return 1
}

if ! install_skill; then
  log_warn "Skill 自动安装失败，将继续准备手动安装包。"
  SKILL_PERMISSION_ISSUE=1
fi

# ─── ③ Demo 项目安装 ───────────────────────────────────────────
if [ ! -d "$DEMO_SOURCE" ]; then
  log_warn "未找到 demo 目录：$DEMO_SOURCE，跳过 Demo 安装。"
  DEMO_INSTALL_FAILED=1
else
  log "准备安装 Demo 项目..."
  dest_dir="$(choose_directory)"

  if [ -z "$dest_dir" ]; then
    log_warn "未选择目录，跳过 Demo 安装。"
    DEMO_INSTALL_FAILED=1
  else
    dest_dir="${dest_dir%/}"
    demo_dest="$dest_dir/douyin-im-demo"

    log "复制 Demo 项目到：$demo_dest"
    if cp -r "$DEMO_SOURCE" "$demo_dest"; then
      log_ok "Demo 项目复制完成。"
      log "执行 npm install..."
      if (cd "$demo_dest" && npm install); then
        log_ok "npm install 完成。Demo 项目已就绪：$demo_dest"
      else
        log_warn "npm install 失败，请手动执行：cd \"$demo_dest\" && npm install"
        DEMO_INSTALL_FAILED=1
      fi
    else
      log_error "Demo 项目复制失败。"
      DEMO_INSTALL_FAILED=1
    fi
  fi
fi

# ─── ④ Trae Rules 处理 ────────────────────────────────────────
TRAE_RULES_SRC="$SKILL_SOURCE/.trae/rules/douyin-im-ds.md"

if [ -d "$HOME/.trae" ] && [ -f "$TRAE_RULES_SRC" ] && [ "$DEMO_INSTALL_FAILED" -eq 0 ] && [ -n "$demo_dest" ]; then
  log "检测到 Trae 安装，复制 rules 文件到 Demo 项目..."
  trae_rules_dest="$demo_dest/.trae/rules"
  mkdir -p "$trae_rules_dest"
  if cp "$TRAE_RULES_SRC" "$trae_rules_dest/douyin-im-ds.md"; then
    log_ok "Trae rules 文件已复制到 Demo 项目根目录。"
    TRAE_CONFIGURED=1
  else
    log_warn "Trae rules 复制失败，请手动复制 douyin-im-design-system/.trae/rules/douyin-im-ds.md 到项目根 .trae/rules/ 目录。"
  fi
fi

# ─── ⑤ 结果弹窗 ───────────────────────────────────────────────
log_ok "安装流程完成，生成结果报告..."

if [ "$SKILL_PERMISSION_ISSUE" -eq 0 ] && [ "$DEMO_INSTALL_FAILED" -eq 0 ]; then
  trae_tip=""
  if [ "$TRAE_CONFIGURED" -eq 1 ]; then
    trae_tip="\n✅ Trae rules 已自动配置"
  else
    trae_tip="\n⚠️ Trae 用户：请手动将 douyin-im-design-system/.trae/rules/douyin-im-ds.md 放到项目根 .trae/rules/ 目录"
  fi
  show_final_dialog "✅ 安装完成！\n\n下一步：\n1. 重启 AI 工具（Claude Code / Codex / Trae）\n2. 输入 /douyin-im-design-system 确认 skill 可用\n3. 说「用抖音设计系统做一个...」开始 vibe coding${trae_tip}\n\nDemo 项目已就绪，运行：\ncd douyin-im-demo && npm run dev"
elif [ "$SKILL_PERMISSION_ISSUE" -eq 1 ]; then
  show_final_dialog "⚠️ Skill 自动安装遇到权限问题。\n\n请手动导入 skill：\n1. 打开 AI 工具的 Skill 管理界面\n2. 导入解压目录中的 douyin-im-design-system/ 文件夹\n\n如使用 Claude Code，可运行：\nnpx skills add ./douyin-im-design-system --skill douyin-im-design-system -y"
else
  show_final_dialog "⚠️ Skill 安装成功，但 Demo 项目未能自动安装。\n\n请手动安装 Demo：\n1. 将 douyin-im-demo/ 复制到你的工作目录\n2. 运行：cd douyin-im-demo && npm install && npm run dev"
fi

exit 0
