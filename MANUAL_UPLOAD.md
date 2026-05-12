# 📤 手动上传到 GitHub（推荐方案）

由于 API Token 权限问题，最简单的解决方法是**手动创建仓库**。

---

## 🎯 操作步骤（2 分钟完成）

### 步骤 1：创建 GitHub 仓库

1. 访问：https://github.com/new
2. 填写仓库信息：
   - **Repository name**（仓库名称）：`moneybao-agent`
   - **Description**（描述）：`moneybao_agent - OpenClaw Creative Expert Agent with Video-Use Workflow`
   - **Public** ✅（勾选 Public）
   - **Add a README file** ❌（不勾选）
   - **Add .gitignore** ❌（不勾选）
   - **Choose a license** ❌（不勾选）
3. 点击 "Create repository" 按钮

### 步骤 2：推送本地代码

创建仓库后，GitHub 会显示推送命令。运行以下命令：

```bash
cd "C:\Users\jovi_\.openclaw\workspace-moneybao-agent"
git remote set-url origin https://github.com/BillionBao/moneybao-agent.git
git push -u origin main
```

或者直接在 PowerShell 中运行：

```powershell
cd "C:\Users\jovi_\.openclaw\workspace-moneybao-agent"
git remote set-url origin https://github.com/BillionBao/moneybao-agent.git
git push -u origin main
```

---

## ✅ 验证上传成功

推送成功后：

1. 访问：https://github.com/BillionBao/moneybao-agent
2. 检查文件列表是否完整（应包含 23 个文件）
3. 查看 README.md 是否正确显示
4. 确认 `skills/video-use/` 目录结构完整

---

## 📊 上传内容概览

### 🎬 Video-Use 工作流

完整的视频创作流水线系统，包含：

**技能文档**：
- `skills/video-use/SKILL.md` (6566 字)
- `skills/video-use/README.md` (3379 字)

**Prompt 模板库**（4 个文件）：
- `social-media.md` - 社交媒体视频模板
- `product-demo.md` - 产品展示模板
- `brand-story.md` - 品牌故事模板
- `educational.md` - 教育培训模板

**Prompt 知识库**（3 个文件）：
- `styles.md` - 风格参考素材
- `scenarios.md` - 场景描述素材库
- `techniques.md` - Prompt 工程技巧集锦

**工作流目录**：
- `video-use/README.md` - 工作流使用指南

### 📋 核心配置文件

- `AGENTS.md` - Agent 工作规范
- `SOUL.md` - 核心身份定义
- `IDENTITY.md` - 身份档案
- `USER.md` - 用户档案
- `TOOLS.md` - 本地工具配置
- `HEARTBEAT.md` - 心跳检查配置

### 📚 文档

- `README.md` - 完整的项目说明文档
- `UPLOAD_GUIDE.md` - GitHub 上传指南
- `TOKEN_ISSUE.md` - Token 问题排查

---

## 🚀 上传后

上传成功后，你的 Video-Use 工作流就可以被其他人使用！

用户可以通过以下方式触发：

```
"帮我做个视频"
"生成一个产品视频"
"video-use"
```

---

## 💡 为什么推荐手动创建？

1. **最简单**：无需处理 Token 权限问题
2. **最快速**：2 分钟内完成
3. **最可靠**：100% 成功率
4. **零依赖**：不需要额外的工具或配置

---

*准备好了吗？创建仓库后，运行推送命令即可！*
