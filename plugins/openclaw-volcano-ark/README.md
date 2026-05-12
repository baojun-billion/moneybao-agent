# @openclaw/volcano-ark - 火山方舟全能力集成插件

## 🌟 简介

这是 OpenClaw 的火山方舟（ByteDance Volcano Ark）全能力集成插件，提供**图片、视频、音乐、文本**生成能力。

### 🎯 核心特性

- ✅ **图片生成** - Seedream 5.0 (最新版）
- ✅ **视频生成** - SEEDANCE 2.0 (多模态输入）
- ✅ **音乐生成** - 通过 SEEDANCE 2.0 (视频+音频)
- ✅ **文本生成** - Doubao-Seed-2.0-Pro (超长上下文）
- ✅ **中文优化** - 原生中文支持
- ✅ **统一 API Key** - 一个密钥管理所有能力
- ✅ **即插即用** - 开箱即用，无需配置

---

## 📦 安装

### 通过 ClawHub 安装（推荐）

```bash
# 安装插件
openclaw plugins install clawhub:@openclaw/volcano-ark

# 或者
clawhub package publish openclaw-volcano-ark
openclaw plugins install @openclaw/volcano-ark
```

### 本地开发安装

```bash
# 克隆或下载插件
cd /path/to/plugins
git clone https://github.com/your-repo/openclaw-volcano-ark.git
cd openclaw-volcano-ark

# 安装依赖
pnpm install

# 构建
pnpm build

# 安装到 OpenClaw
openclaw plugins install file:$(pwd)
```

---

## 🔑 配置

### 环境变量

```bash
# 必须配置：API Key
export VOLCANO_API_KEY="your-api-key-here"

# 可选配置（有默认值）
export VOLCANO_API_ENDPOINT="https://ark.cn-beijing.volces.com/api/v3"
export VOLCANO_IMAGE_MODEL="doubao-seedream-5-0-260128"
export VOLCANO_VIDEO_MODEL="doubao-seedance-2-0-260128"
export VOLCANO_TEXT_MODEL="doubao-seed-2-0-pro-260215"
export VOLCANO_TIMEOUT="120"
export VOLCANO_MAX_RETRIES="3"
```

### OpenClaw 配置文件

在 `~/.openclaw/openclaw.json` 中配置：

```json5
{
  plugins: {
    entries: {
      "volcano-ark": {
        enabled: true,
        config: {
          apiEndpoint: "https://ark.cn-beijing.volces.com/api/v3",
          imageModel: "doubao-seedream-5-0-260128",
          videoModel: "doubao-seedance-2-0-260128",
          textModel: "doubao-seed-2-0-pro-260215",
          timeout: 120,
          maxRetries: 3
        }
      }
    }
  }
}
```

---

## 🎨 使用示例

### 1. 图片生成

```javascript
// 使用 Seedream 5.0 生成图片
await image_generate({
  prompt: "深蓝色的眼睛，瞳孔中有熊熊烈火燃烧，超现实艺术风格，电影感",
  size: "2048x2048",
  count: 2,
  model: "volcano-image"
});
```

**输出：**
- 高质量图片（2048x2048）
- 支持 1:1, 16:9, 9:16, 4:3, 3:4 比例
- JPEG/PNG 格式

---

### 2. 视频生成

```javascript
// 使用 SEEDANCE 2.0 生成视频
await video_generate({
  prompt: "深蓝色海洋，波浪起伏，月光洒在海面上，电影感",
  durationSeconds: 8,
  aspectRatio: "16:9",
  model: "volcano-video"
});
```

**输出：**
- 高质量视频（8秒，16:9，720p/1080p/4K）
- 支持多模态输入（文本、图片、视频、音频）
- 原生音频生成

---

### 3. 音乐生成

```javascript
// 通过 SEEDANCE 2.0 生成音乐（视频+音频）
await music_generate({
  prompt: "深蓝色海洋氛围，慵懒浪漫，迷幻电子",
  durationSeconds: 60,
  instrumental: false,
  model: "volcano-music"
});
```

**输出：**
- 带音频的视频
- 可提取纯音频文件
- MP3 格式
- 支持歌词和器乐模式

---

### 4. 文本生成

```javascript
// 使用 Doubao-Seed-2.0-Pro 生成文本
await sessions_send({
  agentId: "moneybao-agent",
  message: "使用 volcano_generate_text 工具生成歌词"
});

// 或者直接调用
await tool_exec("volcano_generate_text", {
  prompt: "创作一首关于深蓝海洋的歌词",
  maxTokens: 2000,
  temperature: 0.8
});
```

**输出：**
- 高质量中文文本
- 超长上下文（262,144 tokens）
- 最大输出 131,072 tokens

---

## 🎯 完整工作流示例

### 场景：音乐视频创作

```javascript
// 第1步：生成歌词
const lyrics = await tool_exec("volcano_generate_text", {
  prompt: "写一首关于深蓝海洋的歌词，浪漫迷幻风格"
});

// 第2步：生成音乐（通过视频生成）
const musicVideo = await video_generate({
  prompt: lyrics.text,
  durationSeconds: 60,
  model: "volcano-video"
});

// 第3步：提取音频（从视频中）
// 自动完成，返回纯音频文件

// 第4步：生成概念图
const conceptImage = await image_generate({
  prompt: "深蓝色海洋，火焰在眼中燃烧，超现实艺术风格",
  size: "2048x2048",
  model: "volcano-image"
});

// 第5步：生成音乐视频（最终版）
const finalVideo = await video_generate({
  prompt: lyrics.text,
  inputImages: [conceptImage],
  durationSeconds: 60,
  model: "volcano-video"
});

console.log("🎉 音乐视频创作完成！");
```

---

## 📊 模型列表

### 图片生成

| 模型 ID | 名称 | 状态 | 推荐 |
|---------|------|------|------|
| doubao-seedream-5-0-260128 | Seedream 5.0 | ✅ 活跃 | 🌟 最新版，推荐 |
| doubao-seedream-4-5-251128 | Seedream 4.5 | ✅ 活跃 | - |
| doubao-seedream-4-0-250828 | Seedream 4.0 | ✅ 活跃 | - |

### 视频生成

| 模型 ID | 名称 | 状态 | 推荐 |
|---------|------|------|------|
| doubao-seedance-2-0-260128 | SEEDANCE 2.0 | ✅ 活跃 | 🌟 最新版，推荐 |
| doubao-seedance-2-0-fast-260128 | SEEDANCE 2.0 Fast | ✅ 活跃 | 🚀 速度优先 |
| doubao-seedance-1-5-pro-251215 | SEEDANCE 1.5 Pro | ✅ 活跃 | - |
| doubao-seedance-1-0-pro-250528 | SEEDANCE 1.0 Pro | ✅ 活跃 | - |

### 文本生成

| 模型 ID | 名称 | 上下文 | 推荐 |
|---------|------|-------|------|
| doubao-seed-2-0-pro-260215 | Doubao-Seed-2.0-Pro | 262,144 | 🌟 超长上下文，推荐 |
| doubao-seed-1-6-251015 | Doubao-Seed-1.6 | 262,144 | - |

---

## 🔧 高级配置

### 超时设置

```json5
{
  plugins: {
    entries: {
      "volcano-ark": {
        config: {
          timeout: 120  // API 请求超时时间（秒）
        }
      }
    }
  }
}
```

### 重试策略

插件使用**指数退避重试策略**：

- 第1次重试：等待 1 秒
- 第2次重试：等待 2 秒
- 第3次重试：等待 4 秒
- ...

默认最大重试次数：3 次

### 异步处理

视频生成支持异步处理：

1. 提交请求 → 获得 `request_id`
2. 轮询状态（每 10 秒）
3. 状态为 `SUCCEEDED` 时下载
4. 最大等待时间：10 分钟

---

## ⚠️ 注意事项

### 成本控制

- 监控 API 使用量
- 设置合理的超时时间
- 避免重复生成相同内容

### 性能优化

- 使用适当的模型（质量 vs 速度）
- 批量生成降低单位成本
- 缓存生成的结果

### 合规使用

- 遵守国内法律法规
- 内容审核
- 版权和肖像权授权

---

## 🐛 故障排除

### 常见问题

**Q: 插件无法加载？**

A: 检查 API Key 是否正确配置：
```bash
echo $VOLCANO_API_KEY
```

**Q: 图片生成失败？**

A: 检查图片尺寸（最小 3686400 像素）

**Q: 视频生成超时？**

A: 视频生成需要异步处理，请耐心等待（1-5 分钟）

**Q: 如何查看日志？**

A: 查看 OpenClaw 日志：
```bash
openclaw logs
# 或者
tail -f ~/.openclaw/logs/gateway.log
```

---

## 📚 参考资料

### 官方文档

- [火山方舟官网](https://www.volcengine.com/product/ark)
- [火山方舟文档](https://www.volcengine.com/docs/82379)
- [模型列表](https://www.volcengine.com/docs/82379/1330310)
- [模型价格](https://www.volcengine.com/docs/82379/1544106)

### OpenClaw 文档

- [Building Plugins](https://docs.openclaw.ai/plugins/building-plugins)
- [Provider Plugins](https://docs.openclaw.ai/plugins/sdk-provider-plugins)

---

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

### 开发

```bash
# 克隆仓库
git clone https://github.com/your-repo/openclaw-volcano-ark.git

# 安装依赖
pnpm install

# 开发模式（监听文件变化）
pnpm dev

# 运行测试
pnpm test

# 构建
pnpm build
```

---

## 📄 许可证

MIT License

---

## 👥 作者

- **作者**: moneybao-agent
- **版本**: 1.0.0
- **发布日期**: 2026-05-09

---

## 🎉 快速开始

```bash
# 1. 安装插件
openclaw plugins install clawhub:@openclaw/volcano-ark

# 2. 配置 API Key
export VOLCANO_API_KEY="244e2a61-4b5b-4e2a-b329-eed0a5ade364"

# 3. 重启 OpenClaw
openclaw gateway restart

# 4. 开始使用！
await image_generate({
  prompt: "深蓝色的眼睛...",
  model: "volcano-image"
});
```

**🚀 即插即用，开箱即能！**

---

*最后更新: 2026-05-09*
*状态: Phase 2 开发完成*
*版本: 1.0.0*
