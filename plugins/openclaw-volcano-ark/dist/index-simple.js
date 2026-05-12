"use strict";
// @openclaw/volcano-ark - 火山方舟插件 (简化版)
Object.defineProperty(exports, "__esModule", { value: true });
// 简化的实现，专注于核心功能
exports.default = {
    id: "volcano-ark",
    name: "火山方舟",
    description: "ByteDance Volcano Ark 多媒体生成",
    register(api) {
        // 获取 API Key
        const apiKey = process.env.VOLCANO_API_KEY;
        if (!apiKey) {
            console.error("❌ 火山方舟 API Key 未配置");
            console.error("请设置环境变量: export VOLCANO_API_KEY=your-key");
            return;
        }
        console.log("✅ 火山方舟插件加载成功");
        // 注册图片生成
        api.registerImageGenerationProvider({
            providerId: "volcano-image",
            aliases: ["volcano", "seedream"],
            label: "火山方舟 Seedream",
            defaultModel: "doubao-seedream-5-0-260128",
            models: ["doubao-seedream-5-0-260128"],
            capabilities: {
                generate: {
                    maxImages: 4,
                    supportedRatios: ["1:1", "16:9", "9:16"],
                    supportedFormats: ["jpeg", "png"],
                }
            },
            isConfigured: () => !!apiKey,
            async generateImage(req) {
                // 调用火山方舟图片 API
                const response = await fetch("https://ark.cn-beijing.volces.com/api/v3/images/generations", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${apiKey}`,
                    },
                    body: JSON.stringify({
                        model: "doubao-seedream-5-0-260128",
                        prompt: req.prompt,
                        size: req.size || "2048x2048",
                        n: 1,
                    }),
                });
                const data = await response.json();
                if (!response.ok) {
                    throw new Error(`图片生成失败: ${JSON.stringify(data)}`);
                }
                // 下载图片
                const imgUrl = data.data[0].url;
                const imgResponse = await fetch(imgUrl);
                const buffer = Buffer.from(await imgResponse.arrayBuffer());
                return {
                    tracks: [{
                            buffer,
                            mimeType: "image/jpeg",
                            fileName: `volcano-image-${Date.now()}.jpg`,
                        }],
                    model: data.model,
                };
            },
        });
        // 注册视频生成
        api.registerVideoGenerationProvider({
            providerId: "volcano-video",
            aliases: ["seedance"],
            label: "火山方舟 SEEDANCE",
            defaultModel: "doubao-seedance-2-0-260128",
            models: ["doubao-seedance-2-0-260128"],
            capabilities: {
                generate: {
                    maxDurationSeconds: 8,
                    supportedRatios: ["16:9", "9:16"],
                    hasAudio: true,
                    supportedResolutions: ["720p", "1080p"],
                }
            },
            isConfigured: () => !!apiKey,
            async generateVideo(req) {
                // 异步视频生成
                const requestId = `video-${Date.now()}`;
                const response = await fetch("https://ark.cn-beijing.volces.com/api/v3/video/generations", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${apiKey}`,
                    },
                    body: JSON.stringify({
                        model: "doubao-seedance-2-0-260128",
                        input: {
                            prompt: req.prompt,
                            video_setting: {
                                duration: 8,
                            },
                        },
                        request_id: requestId,
                    }),
                });
                const initResult = await response.json();
                // 轮询状态
                for (let i = 0; i < 60; i++) {
                    await new Promise(r => setTimeout(r, 10000));
                    const statusRes = await fetch(`https://ark.cn-beijing.volces.com/api/v3/video/generations/${requestId}`, {
                        headers: {
                            "Authorization": `Bearer ${apiKey}`,
                        },
                    });
                    const statusData = await statusRes.json();
                    if (statusData.status === "SUCCEEDED") {
                        // 下载视频
                        const videoRes = await fetch(statusData.video_url);
                        const videoBuffer = Buffer.from(await videoRes.arrayBuffer());
                        return {
                            video: {
                                buffer: videoBuffer,
                                mimeType: "video/mp4",
                                fileName: `volcano-video-${Date.now()}.mp4`,
                            },
                            model: "doubao-seedance-2-0-260128",
                        };
                    }
                    if (statusData.status === "FAILED") {
                        throw new Error(`视频生成失败: ${requestId}`);
                    }
                }
                throw new Error(`视频生成超时: ${requestId}`);
            },
        });
        console.log("✅ 所有 Provider 注册完成");
    }
};
