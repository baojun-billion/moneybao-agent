# 🚀 GitHub 上传指南

## 当前状态

✅ **已完成**：
- 本地 Git 仓库已初始化
- 所有文件已提交（2 个 commit）
- README.md 已创建并提交
- .gitignore 已配置

❌ **待完成**：
- 推送到 GitHub（需要确认正确的仓库名称）

---

## 📋 仓库信息

**GitHub 用户名**：BillionBao

**本地 commit 历史**：
```
f9e4dd2 docs: add comprehensive README for moneybao-agent
f220f72 feat: add video-use workflow - 一站式视频生成与应用工作流
```

**已提交的文件**（22 个文件）：
- 核心配置：AGENTS.md, SOUL.md, IDENTITY.md, USER.md, TOOLS.md, HEARTBEAT.md
- 技能文件：skills/video-use/ (完整的工作流技能)
- 工作流目录：video-use/
- 文档：README.md
- 配置：.gitignore

---

## 🔄 推送到 GitHub

### 方法一：使用 Git CLI（推荐）

**步骤 1**：在 GitHub 上创建新仓库

访问 https://github.com/new 并创建仓库，仓库名建议：
- `workspace-moneybao-agent`
- `moneybao-agent`
- 或其他你喜欢的名称

**步骤 2**：更新远程仓库地址

将下面的命令中的 `YOUR_REPO_NAME` 替换为你在 GitHub 上创建的仓库名称：

```bash
git remote set-url origin https://github.com/BillionBao/YOUR_REPO_NAME.git
```

**步骤 3**：推送到 GitHub

```bash
git push -u origin main
```

---

### 方法二：使用 GitHub CLI（如果已认证）

如果你已经安装并配置了 `gh` CLI，可以这样操作：

```bash
# 创建新仓库（仓库名替换为你想要的名称）
gh repo create YOUR_REPO_NAME --public --source=. --remote=origin --push
```

---

## 📊 已上传内容概览

### 🎬 Video-Use 工作流

完整的视频创作流水线系统：

**技能文档**：
- `skills/video-use/SKILL.md` (6566 字)
  - 6 阶段工作流定义
  - SOP 标准流程
  - Prompt 工程技巧
  - 质量标准和分级体系
  - 协作规范和最佳实践

**快速指南**：
- `skills/video-use/README.md` (3379 字)
  - 快速开始方式
  - 核心功能介绍
  - 使用示例和常见问题

**Prompt 模板库** (4 个模板文件)：
- `social-media.md` - 社交媒体视频模板
  - 抖音/TikTok（15s 快节奏、30s 场景化、60s 故事）
  - 小红书（生活方式、开箱体验）
  - 视频号（真实感访谈、知识分享）
  - B站（深度科普、系列教程）
  - YouTube（Vlog、品牌纪录片）

- `product-demo.md` - 产品展示模板
  - 数码产品（手机、手表、笔记本、耳机）
  - 汽车产品（外观、内饰、驾驶体验）
  - 家居用品、时尚美妆、食品饮料
  - 通用产品框架

- `brand-story.md` - 品牌故事模板
  - 品牌起源、品牌理念、团队文化
  - 用户故事见证、社会价值展示
  - 发展历程回顾、情感共鸣类
  - 完整品牌叙事框架（5 段式、3 段式）

- `educational.md` - 教育培训模板
  - 知识科普类、技能教程类
  - 学习方法类、职场技能类
  - 专业技能类、课程系列框架

**Prompt 知识库** (3 个知识文件)：
- `styles.md` - 风格参考素材
  - 色调风格（温暖柔和、科技感、高级质感等）
  - 视觉风格（电影质感、动画风格、实拍感等）
  - 情感风格（温暖感人、激励人心、轻松愉快等）
  - 特殊效果（慢动作、快速剪辑、浅景深等）

- `scenarios.md` - 场景描述素材库
  - 室内场景（办公室、工作室、会议室等）
  - 户外场景（城市街道、公园绿地、海边等）
  - 特定场所（工厂、实验室、仓库等）
  - 产品使用场景、人物场景、情感场景

- `techniques.md` - Prompt 工程技巧集锦
  - 核心原则（具体化、分层描述、目标导向）
  - 结构模板（基础、产品展示、品牌故事、教育培训）
  - 描述技巧（光线、动作、质感）
  - 参数优化（视频时长、比例设置、特殊效果）
  - 高级技巧（参考图、分场景生成、批量测试等）

**工作流目录**：
- `video-use/README.md` - 工作流使用指南
- 项目目录结构已创建（projects/, assets/, logs/）

### 📋 核心配置文件

- `AGENTS.md` - Agent 工作规范（已添加 Video-Use 说明）
- `SOUL.md` - 核心身份定义（已添加 Video-Use 能力说明）
- `IDENTITY.md` - 身份档案
- `USER.md` - 用户档案
- `TOOLS.md` - 本地工具配置
- `HEARTBEAT.md` - 心跳检查配置

### 📚 文档

- `README.md` - 完整的项目说明文档
  - Agent 概述和核心能力
  - Video-Use 工作流介绍
  - 快速开始和使用示例
  - 目录结构说明
  - 核心工作流详解
  - 协作规范和质量标准
  - 最佳实践指南

---

## 🎯 使用触发词

部署后，用户可以通过以下方式触发视频工作流：

```
"帮我做个视频"
"生成一个产品视频"
"我想做一个品牌视频"
"video-use"
```

---

## ✅ 验证上传成功

推送成功后，你可以：

1. 访问你的 GitHub 仓库页面
2. 检查文件列表是否包含所有文件
3. 查看 README.md 是否正确显示
4. 确认 skills/video-use/ 目录结构完整

---

## 📞 需要帮助？

如果推送失败，请检查：

1. **GitHub 用户名是否正确**：应该是 `BillionBao`
2. **仓库是否存在**：需要在 GitHub 上先创建仓库
3. **认证是否配置**：可能需要配置 Git 认证或使用 Personal Access Token
4. **仓库权限**：确认你有推送权限

---

*准备好推送了吗？替换仓库名称后，运行 `git push -u origin main` 即可！*
