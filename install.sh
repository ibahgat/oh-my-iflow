#!/bin/bash

# iFlow CLI 安装脚本
# 支持全局安装（~/.iflow）和本地安装（./.iflow）

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 获取脚本所在目录
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# 需要复制的目录
DIRS=("agents" "commands" "context" "skills" "mcp")

# 检查目录是否存在
check_dirs() {
    for dir in "${DIRS[@]}"; do
        if [ ! -d "$SCRIPT_DIR/$dir" ]; then
            echo -e "${RED}错误: 目录 $dir 不存在${NC}"
            exit 1
        fi
    done
}

# 复制目录函数
copy_dir() {
    local src_dir=$1
    local dest_dir=$2
    local dir_name=$3

    if [ ! -d "$dest_dir" ]; then
        echo -e "${YELLOW}创建目录: $dest_dir${NC}"
        mkdir -p "$dest_dir"
    fi

    echo -e "${GREEN}复制 $dir_name 到 $dest_dir${NC}"
    cp -r "$src_dir"/* "$dest_dir/" 2>/dev/null || true
}

# 更新 settings.json 函数
update_settings() {
    local settings_file=$1
    local mcp_path=$2

    # 如果 settings.json 不存在，创建一个空的
    if [ ! -f "$settings_file" ]; then
        echo "{}" > "$settings_file"
    fi

    # 检查是否已经包含 mcpServers 配置
    if grep -q '"mcpServers"' "$settings_file" 2>/dev/null; then
        echo -e "${YELLOW}settings.json 已包含 mcpServers 配置，跳过更新${NC}"
        return
    fi

    # 读取现有内容并添加 mcpServers 配置
    local temp_file=$(mktemp)
    local mcp_config='{
  "mcpServers": {
    "lsp": {
      "command": "node",
      "args": [
        "'"$mcp_path"'/dist/index.js",
        "--config",
        "'"$mcp_path"'/lsp-config.json"
      ]
    }
  }
}'

    # 使用 jq 合并 JSON，如果没有 jq 则使用简单的字符串处理
    if command -v jq &> /dev/null; then
        jq --argjson mcp "$mcp_config" '. * $mcp' "$settings_file" > "$temp_file"
        mv "$temp_file" "$settings_file"
    else
        # 简单处理：将 mcp_config 追加到现有 JSON
        echo "$mcp_config" > "$temp_file"
        # 这里简化处理，实际应该合并 JSON 对象
        echo -e "${YELLOW}警告: 未安装 jq，settings.json 可能需要手动合并${NC}"
        echo -e "${GREEN}请将以下内容添加到 $settings_file:${NC}"
        echo "$mcp_config"
    fi

    echo -e "${GREEN}✓ 已更新 settings.json${NC}"
}

# 显示帮助信息
show_help() {
    cat << EOF
iFlow CLI 安装脚本

用法:
    bash install.sh [选项]

选项:
    -g, --global     全局安装到 ~/.iflow
    -l, --local      本地安装到当前目录下的 .iflow
    -h, --help       显示此帮助信息

示例:
    bash install.sh --global   # 全局安装
    bash install.sh --local    # 本地安装
EOF
}

# 主安装函数
install() {
    local install_type=$1
    local base_dir
    local mcp_path

    if [ "$install_type" = "global" ]; then
        base_dir="$HOME/.iflow"
        mcp_path="$HOME/.iflow/mcp/lsp-mcp"
        echo -e "${GREEN}开始全局安装到 $base_dir${NC}"
    else
        base_dir="$SCRIPT_DIR/.iflow"
        mcp_path=".iflow/mcp/lsp-mcp"
        echo -e "${GREEN}开始本地安装到 $base_dir${NC}"
    fi

    # 检查源目录
    check_dirs

    # 复制各个目录
    for dir in "${DIRS[@]}"; do
        copy_dir "$SCRIPT_DIR/$dir" "$base_dir/$dir" "$dir"
    done

    # 更新 settings.json
    update_settings "$base_dir/settings.json" "$mcp_path"

    echo -e "${GREEN}✓ 安装完成！${NC}"
    echo -e "安装位置: $base_dir"
}

# 解析命令行参数
if [ $# -eq 0 ]; then
    show_help
    exit 0
fi

case "$1" in
    -g|--global)
        install "global"
        ;;
    -l|--local)
        install "local"
        ;;
    -h|--help)
        show_help
        ;;
    *)
        echo -e "${RED}错误: 未知选项 '$1'${NC}"
        show_help
        exit 1
        ;;
esac