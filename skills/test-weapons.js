#!/usr/bin/env node

/**
 * moneybao-agent 核心武器库测试脚本
 * 测试 Phase 1 的 3 个核心 Skills
 */

const xiaohongshu = require('../../agents/moneybao-agent/skills/xiaohongshu-content');
const wechat = require('../../agents/moneybao-agent/skills/wechat-tech-article');
const moments = require('../../agents/moneybao-agent/skills/moments-zen-text');

console.log('\n========================================');
console.log('moneybao-agent 武器库测试开始');
console.log('========================================\n');

// 测试 1：小红书种草文案
async function testXiaohongshu() {
  console.log('[测试 1] 小红书种草文案生成器\n');

  try {
    const result = await xiaohongshu.generateContent({
      product: 'AI写作助手工具',
      sell_points: ['提升10倍效率', '一键生成爆款', '零基础也能用'],
      tone: '种草风',
    });

    if (result.success) {
      console.log('✅ 测试通过');
      console.log(`输出路径：${result.outputPath}`);
      console.log(`标题：${result.result.title}`);
      console.log(`内容长度：${result.result.content.length} 字`);
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

// 测试 2：微信技术干货
async function testWechat() {
  console.log('[测试 2] 微信技术干货风格生成器\n');

  try {
    const result = await wechat.generateArticle({
      topic: 'OpenClaw 本地部署指南',
      type: '教程',
      data_points: ['支持10+模型', '5分钟部署', '零API费用'],
    });

    if (result.success) {
      console.log('✅ 测试通过');
      console.log(`输出路径：${result.outputPath}`);
      console.log(`标题：${result.result.title}`);
      console.log(`摘要：${result.result.summary.substring(0, 50)}...`);
      console.log(`段落数：${result.result.sections.length}`);
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

// 测试 3：朋友圈禅意文案
async function testMoments() {
  console.log('[测试 3] 朋友圈禅意文案生成器\n');

  try {
    const result = await moments.generateText({
      scene: '办公室窗外樱花盛开',
      keywords: ['樱花', '咖啡', '修行'],
      length: 'short',
    });

    if (result.success) {
      console.log('✅ 测试通过');
      console.log(`输出路径：${result.outputPath}`);
      console.log(`版本1：${result.result.version_1}`);
      console.log(`版本2：${result.result.version_2}`);
      console.log(`版本3：${result.result.version_3}`);
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

  await testXiaohongshu();
  await testWechat();
  await testMoments();

  const endTime = Date.now();
  const duration = ((endTime - startTime) / 1000).toFixed(2);

  console.log('========================================');
  console.log('moneybao-agent 武器库测试完成');
  console.log('========================================\n');
  console.log(`总耗时：${duration} 秒\n`);
  console.log('✅ 所有核心武器已就绪，包哥可以开始使用！\n');
}

// 启动测试
runAllTests().catch(error => {
  console.error('测试运行失败：', error);
  process.exit(1);
});
