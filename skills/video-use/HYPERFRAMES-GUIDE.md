# HyperFrames 快速入门指南

## 什么是 HyperFrames？

HyperFrames 是一个基于 HTML/CSS/JS 的视频渲染引擎。简单说：
- 你写 HTML 搭画面
- 用 Tailwind CSS 控制样式
- 用 GSAP/Lottie/Three.js 做动画
- 一行命令渲染成 MP4

**核心优势**：
- 🎯 **完全可控**：每一帧都是代码，精确控制
- 🤖 **AI 友好**：专为智能体设计，Claude/Cursor/Gemini 都能用
- 🔄 **可复用**：代码可以批量生成变体，降低成本
- 📦 **成熟技术栈**：HTML + Tailwind + GSAP，都是前端熟悉的工具

---

## 适用场景

✅ **强烈推荐使用**：
- 产品功能演示
- 数据可视化动画
- 品牌 Logo 动画
- 文字特效视频
- UI/UX 演示
- 系列化内容（同一模板批量生成）

❌ **不适合**：
- 复杂自然场景（风景、人物、动物）
- 需要真实摄影质感的内容
- 创意探索阶段（建议先用 AI 直接生成验证）

---

## 快速上手

### 第一步：安装 Skill

让 AI 智能体学会写 HyperFrames 视频：

```bash
npx skills add heygen-com/hyperframes
```

安装后，AI 会自动掌握：
- HyperFrames 代码规范
- Tailwind CSS 浏览器运行时写法
- GSAP 时间线结构
- 各个动画库的适配器

### 第二步：初始化项目

```bash
npx hyperframes init my-video
```

这会创建一个标准项目结构：
```
my-video/
├── src/
│   ├── index.html    # 主 HTML 文件
│   └── style.css     # 样式文件
├── package.json
└── hyperframes.config.js
```

### 第三步：编写代码

在 `src/index.html` 中写你的视频代码：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Video</title>
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
        // 使用 GSAP 创建动画时间线
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

### 第四步：预览

```bash
npx hyperframes dev
```

浏览器会自动打开，实时预览效果。

### 第五步：渲染视频

```bash
npx hyperframes render
```

等待几秒，MP4 视频就生成了！

---

## AI 辅助开发

### 让 Claude Code 帮你写

安装 skill 后，在 Claude Code 对话中：

```bash
/hyperframes 创建一个 30 秒的产品演示视频
```

Claude 会自动：
1. 生成 HTML 结构
2. 添加 Tailwind CSS 样式
3. 用 GSAP 编写动画
4. 确保代码符合 HyperFrames 规范

### 示例对话

**你**：
```
创建一个 20 秒的产品视频，展示我们的智能手表。
要求：
1. 手表从左侧滑入
2. 屏幕显示心率数据
3. 数字从 0 滚动到 75
4. 背景使用科技蓝渐变
```

**Claude**：
```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
</head>
<body class="bg-gradient-to-br from-slate-900 to-blue-900">
    <div class="flex items-center justify-center h-screen overflow-hidden">
        <!-- 手表容器 -->
        <div id="watch" class="relative w-64 h-80 bg-black rounded-3xl -translate-x-96">
            <!-- 表带 -->
            <div class="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-32 bg-gray-800"></div>
            <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-32 bg-gray-800"></div>

            <!-- 屏幕 -->
            <div class="absolute inset-4 bg-gradient-to-b from-slate-800 to-slate-900 rounded-2xl flex flex-col items-center justify-center">
                <!-- 心率图标 -->
                <div id="heart-icon" class="text-6xl opacity-0">❤️</div>

                <!-- 心率数字 -->
                <div id="heart-rate" class="text-8xl font-bold text-white mt-4 opacity-0">
                    0
                </div>

                <!-- 单位 -->
                <div id="unit" class="text-gray-400 mt-2 opacity-0">BPM</div>
            </div>
        </div>
    </div>

    <script>
        // 创建时间线
        const tl = gsap.timeline();

        // 1. 手表滑入
        tl.to('#watch', {
            x: 0,
            duration: 1,
            ease: 'power2.out'
        });

        // 2. 心率图标淡入
        tl.to('#heart-icon', {
            opacity: 1,
            duration: 0.5
        }, '-=0.3');

        // 3. 数字滚动动画
        tl.to('#heart-rate', {
            opacity: 1,
            duration: 0.5
        }, '-=0.3');

        tl.to('#heart-rate', {
            innerText: 75,
            duration: 2,
            snap: { innerText: 1 },
            ease: 'power1.out'
        }, '-=0.2');

        // 4. 单位淡入
        tl.to('#unit', {
            opacity: 1,
            duration: 0.5
        }, '-=0.3');

        // 5. 心跳动画
        gsap.to('#heart-icon', {
            scale: 1.1,
            duration: 0.1,
            repeat: 3,
            yoyo: true,
            ease: 'power1.inOut'
        });
    </script>
</body>
</html>
```

---

## 常用动画库

### GSAP（推荐）
最适合做时间轴动画：

```javascript
// 简单动画
gsap.to('#element', {
    opacity: 1,
    duration: 1,
    ease: 'power2.out'
});

// 复杂时间线
const tl = gsap.timeline();
tl.to('#a', { x: 100, duration: 1 })
  .to('#b', { y: 100, duration: 1 }, '-=0.5')  // 提前0.5秒开始
  .to('#c', { scale: 1.5, duration: 1 });
```

### Lottie
用于复杂矢量动画：

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.12.2/lottie.min.js"></script>
<div id="lottie-container"></div>

<script>
    lottie.loadAnimation({
        container: document.getElementById('lottie-container'),
        path: 'animation.json',
        renderer: 'svg'
    });
</script>
```

### Three.js
3D 场景和特效：

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
<div id="three-container"></div>

<script>
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('three-container').appendChild(renderer.domElement);

    // 添加 3D 对象、灯光等...
</script>
```

---

## 实用技巧

### 1. 性能优化

```javascript
// 使用 will-change 提示浏览器优化
gsap.to('#element', {
    willChange: 'transform',
    x: 100,
    duration: 1
});

// 批量操作时使用 gsap.context()
gsap.context(() => {
    // 所有动画在这里自动清理
});
```

### 2. 响应式设计

```html
<!-- 使用 Tailwind 响应式类 -->
<div class="w-full md:w-1/2 lg:w-1/3">
```

```javascript
// 根据屏幕尺寸调整动画
const isMobile = window.innerWidth < 768;
gsap.to('#element', {
    x: isMobile ? 50 : 100,
    duration: isMobile ? 0.5 : 1
});
```

### 3. 音频同步

```html
<audio id="bgm" src="background.mp3"></audio>

<script>
    const audio = document.getElementById('bgm');
    const tl = gsap.timeline();

    // 动画开始时播放音乐
    tl.call(() => audio.play())
      .to('#element', { x: 100, duration: 5 });

    // 动画结束时停止音乐
    tl.call(() => audio.pause());
</script>
```

### 4. 批量生成变体

```javascript
// 创建一个函数，接受参数生成不同版本
function createVideo(brandColor, productName) {
    // 使用 brandColor 和 productName 生成代码
    return {
        html: `<!-- 生成的 HTML -->`,
        css: `<!-- 生成的 CSS -->`,
        js: `<!-- 生成的 JS -->`
    };
}

// 批量生成
const videos = [
    { color: '#FF0000', product: 'Pro 版' },
    { color: '#00FF00', product: 'Lite 版' },
    { color: '#0000FF', product: 'Max 版' }
];

videos.forEach(v => {
    const video = createVideo(v.color, v.product);
    // 渲染视频
});
```

---

## 常见问题

### Q: 渲染很慢怎么办？
A:
1. 减少复杂 3D 效果
2. 使用 CSS 动画替代 JS 动画
3. 降低渲染分辨率
4. 使用 `gsap.to()` 替代 `gsap.from()`

### Q: 如何添加背景音乐？
A:
```html
<!-- 在 HTML 中添加音频 -->
<audio id="bgm" src="your-music.mp3"></audio>

<script>
    // 在动画时间线中控制
    gsap.timeline()
        .call(() => document.getElementById('bgm').play())
        .to('#element', { x: 100, duration: 5 })
        .call(() => document.getElementById('bgm').pause());
</script>
```

### Q: 如何导出不同分辨率？
A:
在 `hyperframes.config.js` 中配置：
```javascript
module.exports = {
    output: {
        width: 1920,  // 或 1080, 720 等
        height: 1080,
        fps: 60
    }
};
```

### Q: 生成的视频太大怎么办？
A:
1. 降低 fps（30fps 足够）
2. 减小分辨率
3. 使用外部视频压缩工具（如 FFmpeg）

---

## 与 video-use 工作流整合

HyperFrames 是 video-use 技能的重要组成部分：

**工作流集成**：
```
创意构思 → 技术选型 →
├─ AI 直接生成（复杂场景）
└─ HyperFrames（产品/数据/品牌动画）
→ 质量审核 → 内容优化 → 渠道发布 → 效果追踪
```

**协作场景**：
- **快速原型**：先用 AI 生成验证创意
- **精确定位**：确认方向后用 HyperFrames 精确实现
- **批量生产**：用 HyperFrames 模板批量生成变体
- **混合使用**：部分镜头用 AI 生成，部分用 HyperFrames

---

## 资源链接

- **GitHub**: https://github.com/heygen-com/hyperframes
- **官方文档**: （参考 GitHub README）
- **GSAP 文档**: https://greensock.com/docs/
- **Tailwind CSS**: https://tailwindcss.com/docs

---

## 下一步

1. **安装 skill**: `npx skills add heygen-com/hyperframes`
2. **初始化项目**: `npx hyperframes init my-video`
3. **让 AI 帮你写**: 在 Claude Code 中输入 `/hyperframes` 命令
4. **迭代优化**: 根据预览效果调整代码
5. **渲染视频**: `npx hyperframes render`

**记住**：你不需要成为前端专家。让 AI 帮你写代码，你只需要提供创意和反馈！

---

*持续更新中...*