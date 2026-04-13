#!/bin/bash
# macOS 双击版：.command 文件会在 Terminal 中打开执行
# 自动切换到脚本所在目录，然后运行主安装脚本

cd "$(dirname "$0")" || exit 1
bash ./setup_douyin_design_skill.sh
