// @openclaw/volcano-ark - 火山方舟插件 (JavaScript 版本)

// 基础设置
const apiKey = "244e2a61-4b5b-4e2a-b329-eed0a5ade364";

module.exports = {
  id: "volcano-ark",
  name: "火山方舟",
  description: "ByteDance Volcano Ark 多媒体生成",
  
  register(api) {
    console.log("✅ 火山方舟插件加载");
    console.log("📊 API Key:", apiKey ? "***" : "未设置");
    
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
        console.log("🖼️  生成图片:", req.prompt);
        
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
        
        console.log("✅ 图片生成成功");
        
        return {
          images: [{
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
        }
      },
      isConfigured: () => !!apiKey,
      async generateVideo(req) {
        console.log("🎬  生成视频:", req.prompt);
        
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
        
        await response.json();
        
        // 异步轮询
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
            
            console.log("✅ 视频生成成功");
            
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
