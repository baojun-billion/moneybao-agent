# moneybao-agent Phase 2 & 3 武器库修复任务

> 任务优先级：P0（立即修复）
> 预计修复时间：30 分钟

---

## 🎯 修复目标

修复 Phase 2 & 3 的 4 个武器，确保全部可用。

---

## 📋 修复清单

### 🔧 修复 1：topic-miner.js（爆款选题挖掘器）

**问题**：域名匹配逻辑不支持组合域名

**测试用例**：
```json
{
  "domain": "AI创业",
  "keywords": ["AI代理", "搞钱", "自动化"],
  "count": 5,
  "style": "综合"
}
```

**问题分析**：
- Skill 内置模板只包含标准域名（`AI`、`电商`、`职场`、`理财`）
- 测试输入 `domain: "AI创业"` 无法匹配到 `AI` 模板
- 关键词过滤可能过于严格

**修复方案**：

#### 方案 A：模糊域名匹配（推荐）
```javascript
// 修改 mineTrendingTopics 函数
function matchDomain(inputDomain, availableDomains) {
  // 支持模糊匹配
  for (const domain of availableDomains) {
    if (inputDomain.includes(domain) || domain.includes(inputDomain.split(' ')[0])) {
      return domain;
    }
  }
  // 如果都没匹配，返回第一个（兜底）
  return availableDomains[0];
}

// 使用示例
const targetDomain = matchDomain(domain, Object.keys(topicTemplates));
const topics = topicTemplates[targetDomain] || topicTemplates['AI']; // 兜底
```

#### 方案 B：扩展域名模板
```javascript
// 添加更多组合域名
const topicTemplates = {
  'AI': [...],
  'AI创业': [...], // 新增
  'AI副业': [...], // 新增
  '电商': [...],
  '职场': [...],
  '理财': [...]
};
```

**验收标准**：
- 输入 `domain: "AI创业"` 能匹配到选题
- 返回的选题数量 > 0
- 关键词过滤不丢失所有选题

---

### 🔧 修复 2：brand-story-generator.js（品牌故事生成器）

**问题**：字符串处理错误（`Cannot read properties of undefined (reading 'replace')`）

**测试用例**：
```json
{
  "startup_journey": "从0到1，用 AI 建立个人品牌",
  "key_events": ["遇到技术瓶颈", "找到开源工具", "开始自动化内容创作"],
  "core_values": ["极致专业", "AI赋能", "懒人友好"],
  "tone": "温暖+有力量"
}
```

**问题分析**：
- Skill 内部某个字符串变量为 `undefined`
- 调用 `.replace()` 时出错
- 可能是 `key_events` 或 `startup_journey` 的处理逻辑问题

**修复方案**：

#### 修复字符串处理边界
```javascript
// 在所有字符串操作前检查
function safeReplace(str, pattern, replacement) {
  if (typeof str !== 'string' || !str) {
    return '';
  }
  return str.replace(pattern, replacement);
}

// 使用示例
const journey = safeReplace(startupJourney, /\s+/g, ' ');
const content = safeReplace(draftContent, /undefined/g, '');
```

#### 添加参数默认值
```javascript
async function generateBrandStory(params) {
  const {
    startup_journey = '',
    key_events = [],
    core_values = [],
    tone = '温暖'
  } = params;

  // 确保所有参数都有值
  const journey = startup_journey || '';
  const events = Array.isArray(key_events) ? key_events : [];
  const values = Array.isArray(core_values) ? core_values : [];

  // ...
}
```

**验收标准**：
- 输入任意字符串都能正常处理
- 不抛出 `undefined.replace` 错误
- 生成完整的故事内容

---

### 🔧 修复 3：visual-style-generator.js（视觉风格指令生成器）

**问题**：字符串处理错误（`Cannot read properties of undefined (reading 'replace')`）

**测试用例**：
```json
{
  "brand_tone": "科技感+霸气+略带神秘",
  "content_type": "小红书封面",
  "color_scheme": ["深黑", "赛博紫", "荧光绿"],
  "style_requirements": ["扁平化", "极简", "未来感"]
}
```

**问题分析**：
- 与 brand-story-generator 类似
- 提示词模板生成逻辑中存在 `undefined` 变量

**修复方案**：

#### 修复提示词生成逻辑
```javascript
// 在生成提示词前检查
function buildPrompt(params) {
  const {
    brand_tone = '科技感',
    content_type = '封面',
    color_scheme = [],
    style_requirements = []
  } = params;

  // 确保数组类型
  const colors = Array.isArray(color_scheme) ? color_scheme : [];
  const styles = Array.isArray(style_requirements) ? style_requirements : [];

  // 构建提示词
  let prompt = `A ${content_type} image with ${brand_tone} style.\n`;

  if (colors.length > 0) {
    prompt += `Colors: ${colors.join(', ')}.\n`;
  }

  if (styles.length > 0) {
    prompt += `Style: ${styles.join(', ')}.\n`;
  }

  return prompt;
}
```

**验收标准**：
- 输入任意参数都能正常处理
- 不抛出 `undefined.replace` 错误
- 生成完整的提示词列表

---

### 🔧 修复 4：competitor-analyzer.js（竞品拆解分析器）

**问题**：返回空对象 `{}`

**测试用例**：
```json
{
  "competitor": "Yuna的AI修炼手册",
  "products": ["AI工具推荐", "教程类文章"],
  "dimensions": ["产品", "价格", "营销", "用户"]
}
```

**问题分析**：
- 模拟数据生成逻辑可能有问题
- 或者是输出格式定义问题

**修复方案**：

#### 检查数据生成逻辑
```javascript
// 确保 analyze() 函数返回完整数据
async function analyze(competitor, products, dimensions) {
  // 模拟分析数据
  const analysis = {
    profile: {
      persona: '技术学习搭子',
      tone: '专业+亲切',
      content_types: ['工具推荐', '行业分析']
    },
    title_formulas: [
      '数字+痛点+结果（如：5分钟搞定...）',
      '反常识+验证（如：别再...了，实测发现...）'
    ],
    visual_style: {
      color_scheme: '科技蓝+活力橙',
      image_types: ['实景图+数据图表'],
      layout: '模块化，每段独立'
    }
  };

  // 确保返回完整对象
  return analysis || {
    profile: {},
    title_formulas: [],
    visual_style: {}
  };
}
```

**验收标准**：
- 返回完整的分析对象
- 包含 `profile`、`title_formulas`、`visual_style` 三个字段
- 每个字段都有数据

---

## 🚀 修复流程

### Step 1：逐个修复
1. 修复 `topic-miner.js`（优先级 P0）
2. 修复 `brand-story-generator.js`（优先级 P0）
3. 修复 `visual-style-generator.js`（优先级 P0）
4. 修复 `competitor-analyzer.js`（优先级 P1）

### Step 2：重新测试
修复完成后，运行测试脚本验证：
```bash
cd C:\Users\jovi_\.openclaw\workspace-moneybao-agent\skills
node test-phase2-3.js
```

### Step 3：生成最终报告
输出完整的测试报告，包含：
- 修复前后的对比
- 每个武器的最终评分
- 使用建议

---

## 📋 验收标准

### 必达标准（所有武器）

| Weapon | 验收标准 |
|--------|---------|
| 爆款选题挖掘器 | 输入 "AI创业" 能返回 >0 个选题 |
| 竞品拆解分析器 | 返回完整分析对象，包含 3 个字段 |
| 品牌故事生成器 | 不抛出字符串错误，生成完整故事 |
| 视觉风格指令生成器 | 不抛出字符串错误，生成完整提示词 |

### 期望评分

| Weapon | 当前评分 | 期望评分 |
|--------|---------|---------|
| 爆款选题挖掘器 | 70/100 | 90+/100 |
| 竞品拆解分析器 | 75/100 | 90+/100 |
| 品牌故事生成器 | 0/100 | 90+/100 |
| 视觉风格指令生成器 | 0/100 | 90+/100 |

**期望总体评分：90+/100**

---

## ⏱️ 时间估算

| 修复任务 | 预计时间 |
|---------|---------|
| topic-miner.js 域名匹配修复 | 10 分钟 |
| brand-story-generator.js 字符串处理修复 | 10 分钟 |
| visual-style-generator.js 字符串处理修复 | 10 分钟 |
| competitor-analyzer.js 数据生成检查 | 5 分钟 |
| 重新测试所有武器 | 10 分钟 |
| 生成最终报告 | 5 分钟 |
| **总计** | **50 分钟** |

---

## 📞 完成后通知

修复完成后，请通知 moneybao（有钱）：
> "修复完成！所有武器已正常，可以开始使用。"

moneybao 会：
1. 重新运行测试
2. 生成最终报告
3. 通知包哥（billionBao）

---

*任务生成者：moneybao (有钱)*
*任务时间：2026-04-04 12:21*
*优先级：P0（立即修复）*
