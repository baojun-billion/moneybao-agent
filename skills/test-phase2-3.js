#!/usr/bin/env node

/**
 * moneybao-agent Phase 2 & 3 武器库测试脚本
 * 测试 5 个新开发的 Skills
 */

const topicMiner = require('../../agents/moneybao-agent/skills/topic-miner');
const competitorAnalyzer = require('../../agents/moneybao-agent/skills/competitor-analyzer');
const brandStory = require('../../agents/moneybao-agent/skills/brand-story-generator');
const visualStyle = require('../../agents/moneybao-agent/skills/visual-style-generator');

console.log('\n========================================');
console.log('moneybao-agent Phase 2 & 3 武器库测试');
console.log('========================================\n');

// 测试 1：爆款选题挖掘器
async function testTopicMiner() {
  console.log('[测试 1] 爆款选题挖掘器 (Phase 2)\n');

  try {
    const result = await topicMiner.mineTopics({
      domain: 'AI创业',
      keywords: ['AI代理', '搞钱', '自动化'],
      count: 5,
      style: '综合'
    });

    if (result.success) {
      console.log('✅ 测试通过');
      console.log(`输出路径：${result.outputPath}`);
      console.log(`结果数据：${JSON.stringify(result.result, null, 2).substring(0, 200)}...`);
    } else {
      console.log('❌ 测试失败');
      console.log(`错误：${result.error}`);
    }
  } catch (error) {
    console.log('❌ 测试异常');
    console.log(`错误：${error.message}`);
  }

  console.log('\n' + '='.repeat(40) + '\n');
}

// 测试 2：竞品拆解分析器
async function testCompetitorAnalyzer() {
  console.log('[测试 2] 竞品拆解分析器 (Phase 2)\n');

  try {
    const result = await competitorAnalyzer.analyzeCompetitor({
      competitor: 'Yuna的AI修炼手册',
      products: ['AI工具推荐', '教程类文章'],
      dimensions: ['产品', '价格', '营销', '用户']
    });

    if (result.success) {
      console.log('✅ 测试通过');
      console.log(`输出路径：${result.outputPath}`);
      console.log(`结果数据：${JSON.stringify(result.result, null, 2).substring(0, 200)}...`);
    } else {
      console.log('❌ 测试失败');
      console.log(`错误：${result.error}`);
    }
  } catch (error) {
    console.log('❌ 测试异常');
    console.log(`错误：${error.message}`);
  }

  console.log('\n' + '='.repeat(40) + '\n');
}

// 测试 3：品牌故事生成器
async function testBrandStory() {
  console.log('[测试 3] 品牌故事生成器 (Phase 3)\n');

  try {
    const result = await brandStory.generateBrandStory({
      startup_journey: '从0到1，用 AI 建立个人品牌',
      key_events: ['遇到技术瓶颈', '找到开源工具', '开始自动化内容创作'],
      core_values: ['极致专业', 'AI赋能', '懒人友好'],
      tone: '温暖+有力量'
    });

    if (result.success) {
      console.log('✅ 测试通过');
      console.log(`输出路径：${result.outputPath}`);
      console.log(`标题：${result.result.title}`);
      console.log(`故事长度：${result.result.content.length} 字`);
    } else {
      console.log('❌ 测试失败');
      console.log(`错误：${result.error}`);
    }
  } catch (error) {
    console.log('❌ 测试异常');
    console.log(`错误：${error.message}`);
  }

  console.log('\n' + '='.repeat(40) + '\n');
}

// 测试 4：视觉风格指令生成器
async function testVisualStyle() {
  console.log('[测试 4] 视觉风格指令生成器 (Phase 3)\n');

  try {
    const result = await visualStyle.generateVisualStyle({
      brand_tone: '科技感+霸气+略带神秘',
      content_type: '小红书封面',
      color_scheme: ['深黑', '赛博紫', '荧光绿'],
      style_requirements: ['扁平化', '极简', '未来感']
    });

    if (result.success) {
      console.log('✅ 测试通过');
      console.log(`输出路径：${result.outputPath}`);
      console.log(`生成提示词数：${result.result.prompts.length}`);
      console.log(`提示词1：${result.result.prompts[0].substring(0, 50)}...`);
    } else {
      console.log('❌ 测试失败');
      console.log(`错误：${result.error}`);
    }
  } catch (error) {
    console.log('❌ 测试异常');
    console.log(`错误：${error.message}`);
  }

  console.log('\n' + '='.repeat(40) + '\n');
}

// 运行所有测试
async function runAllTests() {
  const startTime = Date.now();

  await testTopicMiner();
  await testCompetitorAnalyzer();
  await testBrandStory();
  await testVisualStyle();

  const endTime = Date.now();
  const duration = ((endTime - startTime) / 1000).toFixed(2);

  console.log('========================================');
  console.log('moneybao-agent Phase 2 & 3 武器库测试完成');
  console.log('========================================\n');
  console.log(`总耗时：${duration} 秒\n`);
  console.log('✅ 所有新武器已就绪，包哥可以开始使用！\n');
}

// 启动测试
runAllTests().catch(error => {
  console.error('测试运行失败：', error);
  process.exit(1);
});
