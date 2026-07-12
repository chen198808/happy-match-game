#!/bin/bash

echo "🚀 开心消消乐 - 一键更新脚本"
echo "============================"

cd "$(dirname "$0")"

GITHUB_USER="chen198808"
REPO_NAME="happy-match-game"

if [ -f .github_token ]; then
    GITHUB_TOKEN=$(cat .github_token)
else
    echo "📝 请输入 GitHub 个人访问令牌 (PAT)："
    read -s GITHUB_TOKEN
    echo "$GITHUB_TOKEN" > .github_token
    echo "✅ 令牌已保存到 .github_token"
fi

echo ""
echo "📦 构建项目..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ 构建失败！"
    exit 1
fi

echo "📝 提交更改..."
git add .
git commit -m "更新: $(date '+%Y-%m-%d %H:%M:%S')" --allow-empty

echo "⬆️  推送到 GitHub..."
git remote set-url origin "https://${GITHUB_TOKEN}@github.com/${GITHUB_USER}/${REPO_NAME}.git"
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ 更新成功！"
    echo "📂 仓库地址: https://github.com/${GITHUB_USER}/${REPO_NAME}"
    echo "🌐 在线预览: https://${GITHUB_USER}.github.io/${REPO_NAME}/"
else
    echo ""
    echo "❌ 推送失败！"
    echo ""
    echo "📌 请检查："
    echo "1. 是否已在 GitHub 上创建仓库 ${REPO_NAME}"
    echo "2. GitHub 个人访问令牌是否正确且有 repo 权限"
    echo ""
    echo "📖 获取令牌步骤："
    echo "   GitHub -> Settings -> Developer settings -> Personal access tokens -> Tokens (classic)"
    echo "   生成新令牌，勾选 repo 权限"
    rm -f .github_token
    exit 1
fi
