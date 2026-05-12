# moneybao-agent 测试案例准备完成

> 等待 jovibao 开发完 Skills 后立即使用

---

## ✅ 测试案例已就绪

3 个核心 Skills 的测试案例已生成，保存在：
`C:\Users\jovi_\.openclaw\workspace-moneybao-agent\content\tests\`

### 测试清单

| Skill | 测试文件 | 验收标准数 |
|-------|---------|-----------|
| 小红书种草文案 | `xiaohongshu_ai_writer_test.md` | 6 项 |
| 微信技术干货 | `wechat_openclaw_deploy_test.md` | 7 项 |
| 朋友圈禅意文案 | `moments_zen_test.md` | 4 项 |

---

## 📋 测试流程（等 jovibao 开发完成）

### Step 1：小红书种草文案测试
```
输入：
{
  "product": "AI 写作助手工具",
  "sell_points": ["提升10倍效率", "一键生成爆款", "零基础也能用"],
  "tone": "种草风"
}

验收：
✓ 标题不超过 20 字
✓ 正文 300-500 字，带 Emoji
✓ 开头用"姐妹们/家人们"
✓ 标签 5-8 个
```

### Step 2：微信技术干货测试
```
输入：
{
  "topic": "OpenClaw 本地部署指南",
  "type": "教程",
  "data_points": ["支持10+模型", "5分钟部署", "零API费用"]
}

验收：
✓ 标题：数字+结果
✓ 正文：3-5 个小节
✓ 数据：每个观点都有数字支撑
✓ 代码块：markdown 格式
```

### Step 3：朋友圈禅意文案测试
```
输入：
{
  "scene": "办公室窗外樱花盛开",
  "keywords": ["樱花", "咖啡", "修行"],
  "length": "short"
}

验收：
✓ 3 个版本
✓ 每个版本 20-40 字
✓ 包含关键词（至少 2 个）
✓ 有禅意
```

---

## 🎯 预计测试结果

| Skill | 预计耗时 | 成功标准 |
|-------|---------|---------|
| 小红书种草 | 30 秒 | 输出完整 JSON，包含 title/content/tags/image_prompt |
| 微信干货 | 1 分钟 | 输出完整 JSON，包含 title/summary/sections/data_visualization |
| 朋友圈文案 | 10 秒 | 输出 JSON，包含 3 个版本 |

---

## 📞 下一步

**包哥，请完成以下动作：**

1. ✅ **联系 jovibao（俊哥）**
   - 消息："俊哥，帮我开发 moneybao 的 3 个核心 Skills，开发计划在这里：workspace-moneybao-agent/WEAPONRY_DEVELOPMENT_PLAN.md"
   - 重点：Phase 1 的 3 个 Skills

2. ✅ **等待开发完成**
   - 预计 1.5 小时

3. ✅ **运行测试**
   - 俊哥开发完成后，我立刻执行 3 个测试
   - 给你完整的测试报告

---

## 📊 测试报告模板

测试完成后，我会生成类似这样的报告：

```
🎯 moneybao-agent 核心武器测试报告

✅ Weapon 1: 小红书种草文案生成器
状态：通过 / 失败
耗时：XX 秒
评分：90/100
问题：[如有]

✅ Weapon 2: 微信技术干货风格生成器
状态：通过 / 失败
耗时：XX 秒
评分：85/100
问题：[如有]

✅ Weapon 3: 朋友圈禅意文案生成器
状态：通过 / 失败
耗时：XX 秒
评分：95/100
问题：[如有]

📊 总体评分：XX/100
🚀 建议行动：[如全部通过，开始投入使用]
```

---

*准备时间：2026-04-04*
*准备者：moneybao (有钱)*
*状态：✅ 测试案例就绪，等待 Skills 开发*
