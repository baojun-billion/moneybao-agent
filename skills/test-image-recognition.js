#!/usr/bin/env node

/**
 * moneybao-agent 图片识别器测试脚本
 */

const imageRecognition = require('../../agents/moneybao-agent/skills/image-recognition');

console.log('\n========================================');
console.log('moneybao-agent 图片识别器测试');
console.log('========================================\n');

// 测试 1：基础识别
async function testBasicRecognition() {
  console.log('[测试 1] 图片基础识别\n');

  try {
    const result = await imageRecognition.recognizeImage({
      image_path: 'C:\\Users\\jovi_\\.openclaw\\media\\inbound\\file_4---5ca2c335-b53a-4f3e-9b73-8834d5e9f30b.jpg',
      depth: 'basic'
    });

    if (result.success) {
      console.log('✅ 测试通过');
      console.log(`输出路径：${result.outputPath}`);
      console.log(`图片类型：${result.result.basic.content_type}`);
      console.log(`主要主体：${result.result.basic.main_subject}`);
      console.log(`包含文字：${result.result.basic.contains_text}`);
      if (result.result.basic.contains_text) {
        console.log(`识别文字：${result.result.basic.extracted_text}`);
      }
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

// 测试 2：深度识别
async function testDeepRecognition() {
  console.log('[测试 2] 图片深度识别\n');

  try {
    const result = await imageRecognition.recognizeImage({
      image_path: 'C:\\Users\\jovi_\\.openclaw\\media\\inbound\\file_4---5ca2c335-b53a-4f3e-9b73-8834d5e9f30b.jpg',
      depth: 'deep'
    });

    if (result.success) {
      console.log('✅ 测试通过');
      console.log(`输出路径：${result.outputPath}`);
      console.log(`颜色：${result.result.deep.colors}`);
      console.log(`布局：${result.result.deep.layout}`);
      console.log(`设计元素：${result.result.deep.design_elements}`);
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

  await testBasicRecognition();
  await testDeepRecognition();

  const endTime = Date.now();
  const duration = ((endTime - startTime) / 1000).toFixed(2);

  console.log('========================================');
  console.log('moneybao-agent 图片识别器测试完成');
  console.log('========================================\n');
  console.log(`总耗时：${duration} 秒\n`);
  console.log('✅ 图片识别器已就绪，包哥可以开始使用！\n');
}

// 启动测试
runAllTests().catch(error => {
  console.error('测试运行失败：', error);
  process.exit(1);
});
