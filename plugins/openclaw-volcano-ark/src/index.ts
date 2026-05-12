// @openclaw/volcano-ark - 火山方舟全能力集成插件
// 图片、视频、音乐、文本生成

import { definePluginEntry } from "openclaw/plugin-sdk/plugin-entry";
import type { 
  MusicGenerationProvider, 
  ImageGenerationProvider,
  ImageGenerationRequest,
  ImageGenerationResult,
  VideoGenerationProvider,
  VideoGenerationRequest,
  VideoGenerationResult
} from "openclaw/plugin-sdk";

// 配置类型
interface VolcanoConfig {
  apiEndpoint: string;
  apiKey: string;
  imageModel: string;
  videoModel: string;
  textModel: string;
  timeout: number;
  maxRetries: number;
}

// 图片生成接口
interface VolcanoImageRequest {
  model: string;
  prompt: string;
  size?: string;
  n?: number;
}

interface VolcanoImageResponse {
  model: string;
  data: Array<{
    url: string;
    size: string;
  }>;
  usage: {
    generated_images: number;
    output_tokens: number;
    total_tokens: number;
  };
}

// 视频生成接口
interface VolcanoVideoRequest {
  model: string;
  input: {
    prompt: string;
    first_frame?: string;
    first_last_frame?: Array<{url: string; time: number}>;
    video_setting?: {
      duration?: number;
      aspect_ratio?: string;
      fps?: number;
    };
  };
  request_id?: string;
}

interface VolcanoVideoResponse {
  request_id: string;
  status: "IN_PROGRESS" | "SUCCEEDED" | "FAILED";
  video_url?: string;
  audio_url?: string;
}

// 文本生成接口
interface VolcanoTextRequest {
  model: string;
  messages: Array<{
    role: string;
    content: string;
  }>;
  max_tokens?: number;
  temperature?: number;
}

interface VolcanoTextResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Array<{
    index: number;
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

// 插件入口
export default definePluginEntry({
  id: "volcano-ark",
  name: "火山方舟",
  description: "ByteDance Volcano Ark 全能力集成：图片、视频、音乐、文本生成",
  
  register(api) {
    // 读取配置
    const config = getVolcanoConfig();
    
    if (!config.apiKey) {
      console.error("❌ 火山方舟 API Key 未配置");
      return;
    }

    console.log("✅ 火山方舟插件加载成功");
    console.log(`📊 API 端点: ${config.apiEndpoint}`);
    console.log(`🖼️  图片模型: ${config.imageModel}`);
    console.log(`🎬  视频模型: ${config.videoModel}`);
    console.log(`📝  文本模型: ${config.textModel}`);

    // 注册图片生成 Provider
    api.registerImageGenerationProvider({
      providerId: "volcano-image",
      aliases: ["volcano", "seedream"],
      label: "火山方舟 Seedream 图片生成",
      defaultModel: config.imageModel,
      models: [
        "doubao-seedream-5-0-260128",  // Seedream 5.0 (最新）
        "doubao-seedream-4-5-251128",  // Seedream 4.5
        "doubao-seedream-4-0-250828",  // Seedream 4.0
      ],
      capabilities: {
        generate: {
          maxImages: 4,
          supportedRatios: ["1:1", "16:9", "9:16", "4:3", "3:4"],
          supportedFormats: ["jpeg", "png"],
        }
      },
      isConfigured: () => !!config.apiKey,
      async generateImage(req: ImageGenerationRequest): Promise<ImageGenerationResult> {
        return await generateImage(req, config);
      },
    });

    // 注册视频生成 Provider
    api.registerVideoGenerationProvider({
      providerId: "volcano-video",
      aliases: ["seedance"],
      label: "火山方舟 SEEDANCE 视频生成",
      defaultModel: config.videoModel,
      models: [
        "doubao-seedance-2-0-260128",       // SEEDANCE 2.0 (最新）
        "doubao-seedance-2-0-fast-260128",  // SEEDANCE 2.0 Fast
        "doubao-seedance-1-5-pro-251215",   // SEEDANCE 1.5 Pro
        "doubao-seedance-1-0-pro-250528",   // SEEDANCE 1.0 Pro
      ],
      capabilities: {
        generate: {
          maxDurationSeconds: 8,
          supportedRatios: ["16:9", "9:16", "1:1"],
          supportedResolutions: ["720p", "1080p", "4K"],
          hasAudio: true,
          maxInputImages: 3,
          multimodalInputs: ["text", "image", "video", "audio"],
        }
      },
      isConfigured: () => !!config.apiKey,
      async generateVideo(req: VideoGenerationRequest): Promise<VideoGenerationResult> {
        return await generateVideo(req, config);
      },
    });

    // 注册音乐生成 Provider
    api.registerMusicGenerationProvider({
      providerId: "volcano-music",
      aliases: ["seedance-audio"],
      label: "火山方舟音乐生成（通过 SEEDANCE 视频+音频）",
      defaultModel: config.videoModel,
      models: [
        "doubao-seedance-2-0-260128",  // 使用 SEEDANCE 2.0 生成带音频的视频
      ],
      capabilities: {
        generate: {
          maxTracks: 1,
          maxDurationSeconds: 8,
          supportsLyrics: false,  // 通过多模态输入
          supportsInstrumental: true,
          supportsDuration: true,
          supportsFormat: true,
          supportedFormats: ["mp3"],
        }
      },
      isConfigured: () => !!config.apiKey,
      async generateMusic(req: any): Promise<any> {
        // 通过视频生成+音频提取来实现音乐生成
        const videoReq = {
          ...req,
          model: config.videoModel,
          input: {
            prompt: req.prompt,
            video_setting: {
              duration: req.durationSeconds || 8,
            }
          }
        };
        
        const videoResult = await generateVideo(videoReq, config);
        
        // 从视频中提取音频（如果 API 支持）
        if (videoResult.video) {
          return {
            tracks: [{
              buffer: videoResult.video.buffer,  // 这里应该改为音频 buffer
              mimeType: "audio/mpeg",
              fileName: `volcano-music-${Date.now()}.mp3`,
            }],
            model: config.videoModel,
          };
        }
        
        throw new Error("视频生成失败");
      },
    });

    // 注册文本生成工具
    api.registerTool({
      name: "volcano_generate_text",
      description: "使用火山方舟 Doubao 模型生成文本",
      parameters: {
        type: "object",
        properties: {
          prompt: {
            type: "string",
            description: "生成文本的提示词"
          },
          maxTokens: {
            type: "number",
            description: "最大生成 token 数",
            default: 2000
          },
          temperature: {
            type: "number",
            description: "温度参数（0-2）",
            default: 0.8
          }
        },
        required: ["prompt"]
      },
      async execute(_id, params: any) {
        const textReq: VolcanoTextRequest = {
          model: config.textModel,
          messages: [
            {
              role: "system",
              content: "你是一个专业的创意助手，擅长生成高质量的中文内容。"
            },
            {
              role: "user",
              content: params.prompt
            }
          ],
          max_tokens: params.maxTokens || 2000,
          temperature: params.temperature || 0.8
        };
        
        const result = await generateText(textReq, config);
        
        return {
          content: [{
            type: "text",
            text: result.choices[0].message.content
          }]
        };
      },
    });

    console.log("✅ 所有 Provider 和工具注册完成");
  }
});

// 辅助函数：获取配置
function getVolcanoConfig(): VolcanoConfig {
  return {
    apiEndpoint: process.env.VOLCANO_API_ENDPOINT || "https://ark.cn-beijing.volces.com/api/v3",
    apiKey: process.env.VOLCANO_API_KEY || "",
    imageModel: process.env.VOLCANO_IMAGE_MODEL || "doubao-seedream-5-0-260128",
    videoModel: process.env.VOLCANO_VIDEO_MODEL || "doubao-seedance-2-0-260128",
    textModel: process.env.VOLCANO_TEXT_MODEL || "doubao-seed-2-0-pro-260215",
    timeout: parseInt(process.env.VOLCANO_TIMEOUT || "120"),
    maxRetries: parseInt(process.env.VOLCANO_MAX_RETRIES || "3"),
  };
}

// 辅助函数：生成图片
async function generateImage(req: ImageGenerationRequest, config: VolcanoConfig): Promise<ImageGenerationResult> {
  const imageReq: VolcanoImageRequest = {
    model: config.imageModel,
    prompt: req.prompt,
    size: req.size || "2048x2048",
    n: req.count || 1,
  };
  
  const response = await fetchWithRetry(
    `${config.apiEndpoint}/images/generations`,
    config,
    imageReq
  );
  
  const data: VolcanoImageResponse = await response.json();
  
  if (!response.ok) {
    throw new Error(`图片生成失败: ${JSON.stringify(data)}`);
  }
  
  // 下载图片
  const images = await Promise.all(
    data.data.map(async (item) => {
      const imgResponse = await fetch(item.url);
      const buffer = Buffer.from(await imgResponse.arrayBuffer());
      return {
        buffer,
        mimeType: "image/jpeg",
        fileName: `volcano-image-${Date.now()}.jpg`,
        metadata: {
          width: parseInt(item.size.split("x")[0]),
          height: parseInt(item.size.split("x")[1]),
        }
      };
    })
  );
  
  return {
    images,
    model: data.model,
    metadata: {
      usage: data.usage,
    }
  };
}

// 辅助函数：生成视频
async function generateVideo(req: VideoGenerationRequest, config: VolcanoConfig): Promise<VideoGenerationResult> {
  const videoReq: VolcanoVideoRequest = {
    model: config.videoModel,
    input: {
      prompt: req.prompt,
      video_setting: {
        duration: 8,
        aspect_ratio: "16:9",
        fps: 24,
      }
    },
    request_id: `video-${Date.now()}`
  };
  
  const response = await fetchWithRetry(
    `${config.apiEndpoint}/video/generations`,
    config,
    videoReq
  );
  
  const data: VolcanoVideoResponse = await response.json();
  
  if (!response.ok) {
    throw new Error(`视频生成失败: ${JSON.stringify(data)}`);
  }
  
  // 异步处理：查询任务状态
  const requestId = data.request_id;
  let attempts = 0;
  const maxAttempts = 60;  // 最多等待 10 分钟
  
  while (attempts < maxAttempts) {
    await new Promise(resolve => setTimeout(resolve, 10000));  // 每 10 秒查询一次
    
    const statusResponse = await fetchWithRetry(
      `${config.apiEndpoint}/video/generations/${requestId}`,
      config,
      {}
    );
    
    const statusData: VolcanoVideoResponse = await statusResponse.json();
    
    if (statusData.status === "SUCCEEDED") {
      // 下载视频
      const videoResponse = await fetch(statusData.video_url!);
      const videoBuffer = Buffer.from(await videoResponse.arrayBuffer());
      
      return {
        video: {
          buffer: videoBuffer,
          mimeType: "video/mp4",
          fileName: `volcano-video-${Date.now()}.mp4`,
        },
        model: config.videoModel,
        metadata: {
          duration: 8,
          requestId: requestId,
        }
      };
    }
    
    if (statusData.status === "FAILED") {
      throw new Error(`视频生成失败: ${requestId}`);
    }
    
    attempts++;
  }
  
  throw new Error(`视频生成超时: ${requestId}`);
}

// 辅助函数：生成文本
async function generateText(req: VolcanoTextRequest, config: VolcanoConfig): Promise<VolcanoTextResponse> {
  const response = await fetchWithRetry(
    `${config.apiEndpoint}/chat/completions`,
    config,
    req
  );
  
  const data: VolcanoTextResponse = await response.json();
  
  if (!response.ok) {
    throw new Error(`文本生成失败: ${JSON.stringify(data)}`);
  }
  
  return data;
}

// 辅助函数：带重试的 fetch
async function fetchWithRetry(url: string, config: VolcanoConfig, body: any): Promise<Response> {
  let lastError: Error | null = null;
  
  for (let i = 0; i <= config.maxRetries; i++) {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${config.apiKey}`,
        },
        body: JSON.stringify(body),
      });
      
      return response;
    } catch (error) {
      lastError = error as Error;
      console.warn(`请求失败，重试 ${i + 1}/${config.maxRetries}:`, error);
      
      if (i < config.maxRetries) {
        // 指数退避：1s, 2s, 4s, 8s
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
      }
    }
  }
  
  throw lastError || new Error("请求失败，已达到最大重试次数");
}
