# HyperFrames 学习笔记

**日期**: 2026-05-17
**学习内容**: HyperFrames - HTML 视频渲染引擎
**学习目标**: 将 HyperFrames 整合到 video-use 工作流中

---

## 核心概念

### 什么是 HyperFrames？
- 基于 HTML/CSS/JS 的视频渲染引擎
- 项目文件就是一份 HTML
- 用 Tailwind CSS 控制样式
- 用 GSAP/Lottie/Three.js 做动画
- 一行命令渲染成 MP4

### 与传统工具的区别
| 维度 | HyperFrames | After Effects |
|------|-------------|---------------|
| 项目文件 | HTML（文本）| .aep（二进制） |
| 操作方式 | 写代码 | GUI 操作 |
| 自动化 | 完全可编程 | 有限 |
| 学习曲线 | 前端友好 | 专业软件 |
| AI 友好度 | ⭐⭐⭐⭐⭐ | ⭐⭐ |

---

## 核心优势

### 1. AI 友好设计
- 专为智能体设计的 skill（Claude/Cursor/Gemini）
- AI 自动生成符合规范的代码
- 不需要人工编写，只需描述需求

### 2. 可编程视频
- 每一帧都是代码，完全可控
- 可以批量化、自动化、数据驱动生产
- 代码复用，降低成本

### 3. 成熟技术栈
- HTML：前端广泛使用
- Tailwind CSS：现代 CSS 框架
- GSAP：专业动画库
- Lottie/Three.js：成熟 3D/矢量动画

### 4. 无需 GUI
- 纯代码工作流
- 适合 CI/CD 集成
- 适合 AI 智能体操控

---

## 适用场景分析

### ✅ 强烈推荐
- **产品功能演示**: UI、界面交互、功能展示
- **数据可视化动画**: 图表、数据增长、趋势展示
- **品牌 Logo 动画**: Logo 动效、品牌标识
- **文字特效视频**: 标题动画、字幕特效
- **系列化内容**: 同一模板批量生成变体

### ❌ 不适合
- 复杂自然场景（风景、人物、动物）
- 需要真实摄影质感的内容
- 创意探索阶段（先用 AI 直接生成验证）

---

## 技术选型决策树

```
需要视频
├─ 复杂自然场景？
│  ├─ 是 → AI 直接生成（video_generate）
│  └─ 否 → 继续
├─ 需要精确控制每一帧？
│  ├─ 是 → HyperFrames
│  └─ 否 → 继续
├─ 产品/数据/品牌相关？
│  ├─ 是 → HyperFrames
│  └─ 否 → AI 直接生成
├─ 需要批量生成变体？
│  ├─ 是 → HyperFrames
│  └─ 否 → 两者皆可
└─ 创意验证阶段？
   ├─ 是 → AI 直接生成（快速）
   └─ 否 → 根据需求选择
```

---

## 快速上手

### 安装
```bash
# 安装 HyperFrames skill
npx skills add heygen-com/hyperframes
```

### 初始化项目
```bash
npx hyperframes init my-video
```

### 编写代码
```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
</head>
<body class="bg-gradient-to-br from-blue-500 to-purple-600">
    <div class="flex items-center justify-center h-screen">
        <h1 id="title" class="text-6xl font-bold text-white opacity-0">
            Hello HyperFrames!
        </h1>
    </div>

    <script>
        gsap.to('#title', {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power2.out',
            delay: 0.5
        });
    </script>
</body>
</html>
```

### 渲染
```bash
npx hyperframes render
```

---

## AI 辅助开发

### Claude Code 示例

**用户输入**：
```
创建一个 30 秒的产品视频，展示智能手表。
要求：
1. 手表从左侧滑入
2. 屏幕显示心率数据
3. 数字从 0 滚动到 75
4. 背景使用科技蓝渐变
```

**Claude 输出**：
- 自动生成 HTML 结构
- 添加 Tailwind CSS 样式
- 用 GSAP 编写动画时间线
- 代码符合 HyperFrames 规范

### 关键优势
- AI 不用"猜"视频怎么剪
- AI 理解"视频语言"（HTML + 动画）
- 生成的代码基本就是可渲染的

---

## 与 video-use 工作流整合

### 更新内容

**1. SKILL.md 更新**
- 添加 HyperFrames 技术选项
- 提供技术选型决策树
- 添加 HyperFrames 专属 Prompt 模板
- 更新常见问题（Q&A）

**2. README.md 更新**
- 工作流阶段二增加技术选型
- 资源链接添加 HyperFrames 指南
- FAQ 添加 HyperFrames 相关问题

**3. 新增 HYPERFRAMES-GUIDE.md**
- 8000+ 字详细指南
- 包含：概念、快速上手、AI 辅助、实用技巧、常见问题

### 工作流集成

```
创意构思 → 技术选型 →
├─ AI 直接生成（复杂场景、创意验证）
└─ HyperFrames（产品/数据/品牌动画、精确控制）
→ 质量审核 → 内容优化 → 渠道发布 → 效果追踪
```

---

## 实际应用场景

### 场景 1：产品功能演示
**需求**: 展示智能家居 App 的功能
**技术**: HyperFrames
**优势**:
- UI 界面精确控制
- 动画流畅可复现
- 可以批量生成不同语言版本

### 场景 2：数据增长展示
**需求**: 年度数据汇报视频
**技术**: HyperFrames
**优势**:
- Chart.js/D3.js 绑定真实数据
- GSAP 精确控制动画时间线
- 数据更新只需修改代码

### 场景 3：品牌宣传视频
**需求**: 品牌故事短片
**技术**: AI 直接生成 + HyperFrames 混合
**优势**:
- AI 生成复杂场景
- HyperFrames 制作 Logo 动画和文字特效
- 后期剪辑合成

---

## 学习心得

### 1. 设计理念值得学习
HyperFrames 最大的创新不是技术本身，而是"为 AI 智能体量身定制"的设计理念：
- 不是让 AI 去学习复杂的专业软件
- 而是给 AI 一个简单、清晰的"视频语言"
- 让 AI 能用代码能力直接创造视频

### 2. 技术选型很重要
- 没有万能的工具
- 明确每种工具的适用场景
- 根据需求选择最合适的方案
- 可以混合使用，发挥各自优势

### 3. AI 友好度是关键
- 未来的工具会越来越"AI 原生"
- 不仅好用，更要让 AI 能用
- 代码化、可编程是重要趋势

---

## 下一步行动

### 短期（1-2 周）
- [ ] 在本地测试 HyperFrames
- [ ] 尝试用 Claude Code 生成示例视频
- [ ] 熟悉 GSAP 动画库
- [ ] 建立自己的代码模板库

### 中期（1 个月）
- [ ] 实际项目中应用 HyperFrames
- [ ] 积累优质 Prompt 和代码片段
- [ ] 优化 video-use 工作流
- [ ] 与 jovibao_agent 协作解决技术问题

### 长期（持续）
- [ ] 关注 HyperFrames 社区更新
- [ ] 探索更多动画库（Lottie/Three.js）
- [ ] 建立批量生产流水线
- [ ] 分享经验，优化团队协作

---

## 参考资料

- **GitHub**: https://github.com/heygen-com/hyperframes
- **GSAP 文档**: https://greensock.com/docs/
- **Tailwind CSS**: https://tailwindcss.com/docs/
- **完整指南**: `skills/video-use/HYPERFRAMES-GUIDE.md`

---

*持续更新中...*