@echo off
chcp 65001 > nul
echo ========================================
echo   沃橙信息智能前台 - 环境诊断
echo ========================================
echo.

echo [诊断 1/5] 检查 Node.js...
node --version > nul 2>&1
if errorlevel 1 (
    echo [失败] Node.js 未安装
    echo 请访问: https://nodejs.org 下载安装
) else (
    echo [成功] Node.js 版本:
    node --version
)
echo.

echo [诊断 2/5] 检查 npm...
npm --version > nul 2>&1
if errorlevel 1 (
    echo [失败] npm 未安装
) else (
    echo [成功] npm 版本:
    npm --version
)
echo.

echo [诊断 3/5] 检查项目文件...
if exist "package.json" (
    echo [成功] package.json 存在
) else (
    echo [失败] package.json 不存在
)
if exist ".env" (
    echo [成功] .env 存在
) else (
    echo [失败] .env 不存在
)
if exist "vite.config.js" (
    echo [成功] vite.config.js 存在
) else (
    echo [失败] vite.config.js 不存在
)
echo.

echo [诊断 4/5] 检查依赖...
if exist "node_modules\" (
    echo [成功] 依赖已安装
) else (
    echo [警告] 依赖未安装
)
echo.

echo [诊断 5/5] 检查端口占用...
netstat -ano | findstr :5173 > nul 2>&1
if errorlevel 1 (
    echo [成功] 端口 5173 未被占用
) else (
    echo [警告] 端口 5173 被占用
    echo 占用进程:
    netstat -ano | findstr :5173
)
echo.

echo ========================================
echo   诊断完成
echo ========================================
echo.

echo 如果所有检查都显示 [成功]，请运行 start.bat 启动
echo 如果有 [失败] 或 [警告]，请查看 故障排查.md
echo.

pause
