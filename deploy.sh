#!/bin/bash

echo "🚀 开心消消乐 - 一键发布到 GitHub"
echo "================================"

cd "$(dirname "$0")"

GITHUB_USER="chen198808"
REPO_NAME="happy-match-game"

# 获取或保存 GitHub Token
if [ -f .github_token ]; then
    GITHUB_TOKEN=$(cat .github_token)
else
    echo ""
    echo "📝 请输入 GitHub 个人访问令牌 (PAT)："
    echo "   （获取方式：GitHub Settings -> Developer settings -> Personal access tokens）"
    echo "   （权限需要勾选 repo）"
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

echo "✅ 构建成功！"

echo ""
echo "📝 提交更改..."
git add .
git commit -m "更新: $(date '+%Y-%m-%d %H:%M:%S')" --allow-empty

echo ""
echo "⬆️  推送到 GitHub..."
git remote set-url origin "https://${GITHUB_TOKEN}@github.com/${GITHUB_USER}/${REPO_NAME}.git"
git push -u origin main 2>&1

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 推送成功！"
    echo ""
    echo "📂 仓库地址: https://github.com/${GITHUB_USER}/${REPO_NAME}"
    echo ""
    echo "⏳ 等待 GitHub Pages 部署（约1-2分钟）..."
    echo "🌐 部署后访问: https://${GITHUB_USER}.github.io/${REPO_NAME}/"
    echo ""
    echo "💡 提示：首次部署需要在 GitHub 仓库设置中开启 Pages"
    echo "   Settings -> Pages -> Source: GitHub Actions"
else
    echo ""
    echo "❌ 推送失败！"
    echo ""
    echo "📌 可能的原因："
    echo "   1. 还没有在 GitHub 创建仓库 ${REPO_NAME}"
    echo "   2. 个人访问令牌不正确或没有 repo 权限"
    echo "   3. 网络连接问题"
    echo ""
    echo "🔧 解决方法："
    echo "   1. 访问 https://github.com/new 创建仓库"
    echo "   2. 仓库名填: ${REPO_NAME}"
    echo "   3. 不要勾选 Initialize with README"
    echo "   4. 创建后重新运行此脚本"
    rm -f .github_token
    exit 1
fi
