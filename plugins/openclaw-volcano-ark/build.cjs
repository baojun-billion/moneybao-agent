// 构建脚本 - 构建 TypeScript 代码 (CommonJS 版本)

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔨 开始构建 @openclaw/volcano-ark...');

try {
  // 确保输出目录存在
  const distDir = path.join(__dirname, 'dist');
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
    console.log('✅ 创建输出目录:', distDir);
  }

  // 编译 TypeScript
  console.log('📝 编译 TypeScript...');
  execSync('npx tsc', {
    stdio: 'inherit',
    cwd: __dirname
  });

  // 检查编译结果
  const jsPath = path.join(distDir, 'index.js');
  const dtsPath = path.join(distDir, 'index.d.ts');
  
  if (fs.existsSync(jsPath) && fs.existsSync(dtsPath)) {
    console.log('✅ JavaScript 文件:', jsPath);
    console.log('✅ 类型定义文件:', dtsPath);
    
    // 复制 openclaw.plugin.json 到 dist 目录
    const pluginJsonSrc = path.join(__dirname, 'openclaw.plugin.json');
    const pluginJsonDist = path.join(distDir, 'openclaw.plugin.json');
    
    if (fs.existsSync(pluginJsonSrc)) {
      fs.copyFileSync(pluginJsonSrc, pluginJsonDist);
      console.log('✅ 插件清单:', pluginJsonDist);
    }
    
    console.log('🎉 构建完成！');
    console.log('📦 输出目录:', distDir);
    console.log('');
    console.log('下一步：');
    console.log('1. 本地安装: openclaw plugins install file:' + __dirname);
    console.log('2. 或发布到 ClawHub: clawhub package publish openclaw-volcano-ark');
  } else {
    console.error('❌ 构建失败：缺少输出文件');
    console.error('   JavaScript:', jsPath, fs.existsSync(jsPath) ? '✅' : '❌');
    console.error('   TypeScript:', dtsPath, fs.existsSync(dtsPath) ? '✅' : '❌');
    process.exit(1);
  }
} catch (error) {
  console.error('❌ 构建失败:', error.message);
  process.exit(1);
}
