# 图片识别器 OCR 集成开发任务

> 任务优先级：P0（立即开发）
> 预计开发时间：1 小时
> 任务发起者：包哥（billionBao）

---

## 🎯 核心目标

**集成真实的 OCR 功能到 `image-recognition.js` Skill**

**用户需求**：识别图片中的对话内容（中文）

---

## 📋 技术需求

### 1️⃣ OCR 引擎选择

#### 方案 A：Tesseract.js（推荐）
- **优点**：开源免费、支持中英文、本地运行、无需 API Key
- **缺点**：准确率略低于云服务、首次加载较慢
- **适用场景**：中小规模使用、对隐私要求高

**安装依赖**：
```bash
npm install tesseract.js
```

**使用示例**：
```javascript
const Tesseract = require('tesseract.js');

async function extractText(imagePath) {
  const { data: { text } } = await Tesseract.recognize(
    imagePath,
    'chi_sim+eng', // 中文简体 + 英文
    { logger: m => console.log(m) }
  );
  return text;
}
```

#### 方案 B：Google Vision API
- **优点**：准确率高、支持多语言、返回结构化数据
- **缺点**：需要 API Key、有费用、依赖网络
- **适用场景**：大规模使用、对准确率要求高

**使用示例**：
```javascript
const vision = require('@google-cloud/vision');

async function extractText(imagePath) {
  const client = new vision.ImageAnnotatorClient();
  const [result] = await client.textDetection(imagePath);
  return result.fullTextAnnotation.text;
}
```

#### 方案 C：Azure Computer Vision API
- **优点**：准确率高、支持手写识别、多语言
- **缺点**：需要 API Key、有费用
- **适用场景**：企业级应用

---

### 2️⃣ 修改 `image-recognition.js`

#### 当前问题
```javascript
// 当前代码：extracted_text 是模拟数据
"extracted_text": "这是从图片中识别的文字内容..."
```

#### 修改目标
```javascript
// 修改后：extracted_text 是真实的 OCR 结果
const extractedText = await performOCR(imagePath);
```

---

### 3️⃣ 实现步骤

#### Step 1：选择 OCR 引擎
- **推荐**：Tesseract.js（开源免费）
- **备选**：Google Vision API（如果需要更高准确率）

#### Step 2：安装依赖
```bash
cd C:\Users\jovi_\.openclaw\agents\moneybao-agent\skills
npm install tesseract.js
```

#### Step 3：修改 `image-recognition.js`

**在文件顶部添加：**
```javascript
const Tesseract = require('tesseract.js');
```

**修改 `extractText()` 函数：**
```javascript
/**
 * 使用 Tesseract.js 提取图片中的文字
 */
async function extractText(imagePath) {
  try {
    console.log(`[ImageRecognition] 开始 OCR 识别：${imagePath}`);

    const { data: { text } } = await Tesseract.recognize(
      imagePath,
      'chi_sim+eng', // 中文简体 + 英文
      {
        logger: m => {
          if (m.status === 'recognizing text') {
            console.log(`[ImageRecognition] OCR 进度：${(m.progress * 100).toFixed(0)}%`);
          }
        }
      }
    );

    console.log(`[ImageRecognition] OCR 识别完成，提取文字长度：${text.length}`);
    return text.trim();
  } catch (error) {
    console.error(`[ImageRecognition] OCR 识别失败：${error.message}`);
    return ''; // 失败时返回空字符串
  }
}
```

**修改 `analyzeImage()` 函数：**
```javascript
// 在分析逻辑中调用 extractText
const extractedText = await extractText(imagePath);
```

#### Step 4：优化输出格式

**基础识别输出**：
```json
{
  "basic": {
    "content_type": "图片",
    "main_subject": "用户界面",
    "contains_text": true/false,
    "extracted_text": "真实的 OCR 结果...",
    "style": "现代简约",
    "usage": "可能是聊天记录或操作界面"
  }
}
```

**深度识别输出**：
```json
{
  "deep": {
    "text_structure": {
      "dialogue": [
        {
          "speaker": "用户 A",
          "content": "..."
        },
        {
          "speaker": "用户 B",
          "content": "..."
        }
      ],
      "total_messages": 5,
      "languages": ["中文", "英文"]
    },
    "conversation_analysis": {
      "topics": ["..."],
      "sentiment": "积极/消极/中性",
      "key_points": ["..."]
    }
  }
}
```

---

## 🧪 测试用例

### 测试 1：基础 OCR
```javascript
const result = await recognizeImage({
  image_path: 'C:\\Users\\jovi_\\.openclaw\\media\\inbound\\file_4---7a8844ae-54bc-468f-ad3a-d3663dba748c.jpg',
  depth: 'basic'
});

console.log('提取的文字：', result.result.basic.extracted_text);
```

**预期结果**：
- `extracted_text` 不为空
- 能识别出图片中的所有文字

### 测试 2：对话内容分析
```javascript
const result = await recognizeImage({
  image_path: 'C:\\Users\\jovi_\\.openclaw\\media\\inbound\\file_4---7a8844ae-54bc-468f-ad3a-d3663dba748c.jpg',
  depth: 'deep'
});

console.log('对话结构：', result.result.deep.text_structure);
```

**预期结果**：
- `dialogue` 数组包含多个对话
- 每个对话有 `speaker` 和 `content`
- 能识别出对话的上下文

---

## ✅ 验收标准

### 必达标准（P0）
- ✅ 能识别图片中的中文文字
- ✅ 能识别图片中的英文文字
- ✅ 提取的文字准确率 > 80%
- ✅ 不再返回模拟数据

### 期望标准（P1）
- ✅ 能识别对话结构（说话人 + 内容）
- ✅ 能分析对话主题和情感
- ✅ OCR 识别速度 < 10 秒

---

## 📋 注意事项

### 1️⃣ 性能优化
- Tesseract.js 首次加载需要下载语言包（约 20MB）
- 可以预加载语言包，提升首次识别速度
- 对于大图，可以压缩后再识别

### 2️⃣ 错误处理
- OCR 失败时不影响其他识别功能
- 提供清晰的错误日志
- 返回空字符串而非崩溃

### 3️⃣ 隐私保护
- Tesseract.js 在本地运行，不上传图片
- 如果使用云服务，提醒用户隐私风险

---

## 🚀 开发完成后

### 1️⃣ 重新测试
运行测试脚本：
```bash
cd C:\Users\jovi_\.openclaw\workspace-moneybao-agent\skills
node test-image-recognition.js
```

### 2️⃣ 验证功能
- 测试图片：`file_4---7a8844ae-54bc-468f-ad3a-d3663dba748c.jpg`
- 验证：能否提取对话内容

### 3️⃣ 通知 moneybao
完成开发后，发送消息：
> "OCR 功能开发完成！现在可以识别图片中的文字了。"

---

## 📞 反馈问题

### 如果遇到问题

#### 问题 1：Tesseract.js 下载语言包失败
**解决方案**：
- 检查网络连接
- 手动下载语言包：https://github.com/naptha/tesseract.js-data
- 放到项目目录并指定路径

#### 问题 2：OCR 识别速度慢
**解决方案**：
- 压缩图片（降低分辨率）
- 使用 Web Worker（多线程）
- 考虑使用云服务（Google Vision）

#### 问题 3：识别准确率低
**解决方案**：
- 提高图片质量（清晰度、对比度）
- 尝试不同的语言模型
- 使用云服务提高准确率

---

## 🎯 最终目标

**包哥的需求**：
> "我想提取图片中的文字，理解两个人对话的内容"

**交付结果**：
```json
{
  "basic": {
    "contains_text": true,
    "extracted_text": "完整的对话内容..."
  },
  "deep": {
    "text_structure": {
      "dialogue": [
        { "speaker": "用户 A", "content": "..." },
        { "speaker": "用户 B", "content": "..." }
      ],
      "total_messages": 5
    },
    "conversation_analysis": {
      "topics": ["..."],
      "sentiment": "中性",
      "key_points": ["..."]
    }
  }
}
```

---

*任务生成者：moneybao (有钱)*
*任务时间：2026-04-09 16:57*
*优先级：P0（立即开发）*
*预计完成时间：1 小时*
