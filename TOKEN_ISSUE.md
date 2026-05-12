# GitHub Token 权限检查

## 问题描述

尝试使用 GitHub API 创建仓库时，遇到 403 错误：
```
"Resource not accessible by personal access token"
```

## 可能原因

1. **Token 权限不足**
   - Token 可能缺少 `repo` 或 `public_repo` 权限
   - Token 可能是只读权限

2. **Token 过期或失效**
   - Token 可能已过期
   - Token 可能被撤销

3. **Token 格式问题**
   - Token 部分被截断（`github...T5T9`）
   - 需要完整的 Token

## 解决方案

### 方案一：使用 GitHub CLI（推荐）

如果 `gh` CLI 可用：

```bash
# 登录 GitHub
gh auth login

# 创建仓库并推送
gh repo create moneybao-agent --public --source=. --remote=origin --push
```

### 方案二：手动创建仓库

1. 访问 https://github.com/new
2. 创建新仓库：
   - **仓库名称**：`moneybao-agent`
   - **描述**：`moneybao_agent - OpenClaw Creative Expert Agent with Video-Use Workflow`
   - **可见性**：Public
   - **不要初始化** README、.gitignore 或 license（我们已有这些文件）
3. 点击 "Create repository"
4. 运行推送命令：
   ```bash
   git remote set-url origin https://github.com/BillionBao/moneybao-agent.git
   git push -u origin main
   ```

### 方案三：重新生成 Token

1. 访问 https://github.com/settings/tokens
2. 点击 "Generate new token (classic)"
3. 设置 Token 权限：
   - ✅ `repo` (Full control of private repositories)
   - ✅ `public_repo` (Access public repositories)
4. 复制新的 Token
5. 使用新 Token 尝试创建仓库

## 当前状态

✅ 本地仓库已准备就绪
- 3 个 commits
- 所有文件已提交
- README.md 已创建

❌ GitHub 仓库尚未创建
- API 创建失败（权限问题）

## 下一步

请选择一个方案：
1. 使用 GitHub CLI（如果已配置）
2. 手动创建仓库（最简单）
3. 重新生成 Token 并重试
